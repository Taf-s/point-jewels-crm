# Phase 2 Technical Strategy: Customer-Facing Frontend

## Overview

This document outlines best practices and recommended technologies for building the customer-facing product browsing, search, and filtering experience for Point Jewels CRM.

---

## Architecture Overview

### Current State (Backend - Sanity CMS)

- ✅ Content management via Sanity Studio
- ✅ Product data with variants, collections, inventory
- ✅ Real-time API via GROQ queries
- ✅ Image hosting via Sanity CDN

### What We're Building (Frontend)

- Product catalog/listing page
- Search functionality (fuzzy search)
- Dynamic filtering (category, material, price)
- Collection browsing
- Product detail pages
- Responsive mobile-first design

---

## Recommended Tech Stack

### Option A: Next.js 15 + React 19 (RECOMMENDED ⭐)

**Why Next.js is ideal for this project:**

- Server-side rendering (SSR) for SEO-friendly product pages
- Static generation (SSG) for fast performance
- API routes for backend logic
- Built-in image optimization
- File-based routing is simple and scalable
- Perfect for jewelry e-commerce (visual products)

**Specific Libraries:**

#### Data Fetching & State

- **@sanity/client** - Official Sanity JS client for querying content
- **@sanity/image-url** - Image URL builder with transformations
- **React Query** or **SWR** - Server state management (caching queries)
  - Recommendation: **React Query** for more complex filtering scenarios

#### Search & Filtering

- **fuse.js** - Lightweight fuzzy search library (client-side)
  - Pros: Small bundle, works offline, excellent for small-medium catalogs
  - Best for: Necklaces, rings, bracelets search
- **Algolia** - Enterprise-grade search (optional for future)
  - Pros: Typo tolerance, analytics, faceting
  - When to use: Once catalog grows beyond 1000+ products
  - Cost: Starts free tier, scales with usage

#### UI Components & Styling

- **shadcn/ui** - Headless UI component library
  - Pairs well with Tailwind CSS
  - Copy-paste components (no dependency bloat)
  - Professional, accessible components
- **Tailwind CSS** - Utility-first CSS framework
  - Fast development
  - Consistent design system
  - Mobile-first responsive design
- **Framer Motion** - Smooth animations
  - Product image galleries
  - Filter transitions
  - Micro-interactions

#### Additional Tools

- **zod** - Runtime schema validation (query params, filters)
- **qs** - Query string parsing (for filter URLs)
- **clsx** - Class name utilities

---

## Specific Feature Implementation

### 1. Product Listing Page

**Architecture:**

```
/products
├── page.tsx (main listing)
├── layout.tsx (shared header/footer)
└── components/
    ├── ProductGrid.tsx
    ├── FilterSidebar.tsx
    ├── SearchBar.tsx
    └── Pagination.tsx
```

**Key Implementation Details:**

**GROQ Query Pattern:**

```groq
*[_type == "product"] {
  _id,
  title,
  slug,
  category,
  description,
  "image": images[0],
  "variants": variants[] {
    material,
    price,
    stock
  },
  "collection": collection->title
}
```

**Filtering Approach:**

- **URL-based filtering**: `?category=ring&material=gold&price_max=5000`
- Pros: Sharable URLs, bookmarkable results, SEO-friendly
- Update query params on filter change
- Server-side filtering via GROQ queries for performance

**Pagination:**

- Limit: 12-16 products per page
- Use `offset` and `limit` in GROQ queries
- Preserve filter state across pages

---

### 2. Search Functionality

**Two-Tier Approach (Recommended):**

**Tier 1: Client-side Fuzzy Search (Fuse.js)**

```typescript
// For initial search experience
const fuseOptions = {
  keys: ['title', 'description', 'category'],
  threshold: 0.3, // Allow some typos
  includeScore: true,
}
```

**Benefits:**

- Instant response (no API calls)
- Works without internet momentarily
- Great for small-medium catalogs
- No infrastructure costs

**When Results Are Too Few → Tier 2:**

```
Query Sanity with more flexible GROQ filters
Fallback to server-side full-text search
```

**Implementation Pattern:**

```typescript
const [searchTerm, setSearchTerm] = useState('')
const [results, setResults] = useState([])

// Debounced search (300ms)
const handleSearch = debounce(async (term) => {
  if (term.length < 2) return

  // Try client-side first
  const clientResults = fuse.search(term)
  setResults(clientResults)

  // If few results, fetch server
  if (clientResults.length < 3) {
    const serverResults = await fetch('/api/search?q=' + term)
    setResults([...clientResults, ...serverResults])
  }
}, 300)
```

---

### 3. Advanced Filtering

**Filter Architecture:**

```typescript
interface Filters {
  category?: string // 'necklace' | 'ring' | 'bracelet' | 'pendant' | 'watch'
  material?: string // 'gold' | 'silver' | 'platinum'
  priceMin?: number
  priceMax?: number
  collection?: string
  inStock?: boolean
}
```

**GROQ Query Builder:**

```groq
*[_type == "product"
  && (category == $category || $category == null)
  && (select(
      $material in variants[].material,
      true,
      false
    ) || $material == null)
  && (select(
      count(variants[price >= $priceMin && price <= $priceMax]) > 0,
      true,
      false
    ) || $priceMin == null)
] {
  // Fields
}
```

**Filter UI Patterns:**

- **Checkboxes** for categories (multiple selection)
- **Radio buttons** for single-choice (material, sort)
- **Range slider** for price
- **Checkbox** for "In Stock Only"

**State Management:**

```typescript
const [filters, setFilters] = useState<Filters>({})

// Update URL when filters change
useEffect(() => {
  const query = qs.stringify(filters, {skipNulls: true})
  router.push(`/products?${query}`)
}, [filters])

// Read filters from URL on load
useEffect(() => {
  const filters = qs.parse(router.query)
  setFilters(filters)
}, [router.query])
```

---

### 4. Product Detail Pages

**Dynamic Route:**

```
/products/[slug]
├── page.tsx - Fetch and display individual product
└── generateStaticParams() - Pre-generate pages for SEO
```

**Key Features:**

- Image gallery with Lightbox (Framer Motion)
- All variants displayed with prices
- "Add to Inquiry" button (future cart)
- Related products (same collection)
- Stock status indicator

**GROQ Query:**

```groq
*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  description,
  images[] {
    asset->,
    alt
  },
  variants[] {
    material,
    price,
    stock,
    sku
  },
  "collection": collection-> {
    _id,
    title,
    slug
  }
}
```

---

### 5. Collection Pages

**Dynamic Routes:**

```
/collections/[slug]
├── page.tsx - Display collection + products
└── generateStaticParams() - Pre-generate for SEO
```

**Implementation:**

```groq
*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  description,
  image {
    asset->,
    alt
  }
}

// Then query products in that collection
*[_type == "product" && collection._ref == $collectionId]
```

---

## Performance Optimization

### 1. Image Optimization

```typescript
// Use Sanity's built-in image transformations
import { urlFor } from '@/lib/sanity'

<Image
  src={urlFor(image).width(400).url()}
  alt={title}
  width={400}
  height={500}
  quality={80}
/>
```

**Image Sizes:**

- Thumbnail: 300px width
- Grid: 400px width
- Detail page: 800px width
- Use WebP format for modern browsers

### 2. Data Fetching Strategy

```typescript
// Server-side rendering with ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour

export default async function ProductsPage({ searchParams }) {
  const products = await fetchProducts(searchParams)
  return <ProductListing products={products} />
}
```

### 3. Lazy Loading

- Virtual scrolling for large product lists (if 100+ items)
- Library: `react-window`
- Only render visible items to viewport

### 4. Caching Strategy

```typescript
// Cache GROQ queries with React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})
```

---

## SEO Best Practices

### 1. Metadata

```typescript
export async function generateMetadata({params}): Promise<Metadata> {
  const product = await fetchProduct(params.slug)
  return {
    title: `${product.title} | Point Jewels`,
    description: product.description.substring(0, 160),
    openGraph: {
      images: [urlFor(product.images[0]).url()],
    },
  }
}
```

### 2. Structured Data

```typescript
// JSON-LD for product schema
<script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": productImage,
    "description": product.description,
    "offers": [{
      "@type": "Offer",
      "price": variant.price,
      "priceCurrency": "ZAR"
    }]
  }
</script>
```

### 3. Sitemap & Robots

- Generate sitemap.xml dynamically from Sanity
- Robots.txt allowing crawling of /products

---

## API Routes (Backend Logic)

### `/api/search`

```typescript
// POST /api/search
// Body: { query: string }
// Returns: matching products with fuzzy matching
```

### `/api/products`

```typescript
// GET /api/products?category=ring&material=gold&limit=12&offset=0
// Returns: filtered product list with pagination
```

### `/api/products/[slug]`

```typescript
// GET /api/products/[slug]
// Returns: full product details
```

---

## Deployment Recommendations

### Option 1: Vercel (RECOMMENDED for Next.js)

**Pros:**

- Zero-config Next.js deployment
- Automatic preview deployments
- Global CDN
- Free tier available
- Seamless GitHub integration

**Setup:**

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

**Pros:**

- Good free tier
- Easy GitHub integration
- Good for static sites

### Option 3: Self-hosted (AWS, DigitalOcean)

**Pros:**

- Full control
- Scalable
  **Cons:**
- More complex setup
- Higher maintenance

**Recommendation:** Start with Vercel for ease and cost, migrate if needed later.

---

## Development Workflow

### File Structure

```
point-jewels-frontend/
├── app/
│   ├── page.tsx (home)
│   ├── products/
│   │   ├── page.tsx (listing)
│   │   ├── [slug]/
│   │   │   └── page.tsx (detail)
│   │   └── components/
│   ├── collections/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── components/
│   ├── api/
│   │   ├── search/route.ts
│   │   └── products/route.ts
│   └── layout.tsx
├── lib/
│   ├── sanity.ts (Sanity client & queries)
│   ├── search.ts (fuse.js setup)
│   └── utils.ts
├── components/
│   ├── ProductCard.tsx
│   ├── FilterSidebar.tsx
│   ├── SearchBar.tsx
│   └── ui/ (shadcn/ui components)
├── public/
│   └── images/
├── styles/
│   └── globals.css
└── package.json
```

### Development Commands

```bash
npm run dev        # Local development
npm run build      # Production build
npm run lint       # ESLint check
npm run type-check # TypeScript check
```

---

## Timeline Estimate

| Phase | Task                                         | Duration        | Effort                        |
| ----- | -------------------------------------------- | --------------- | ----------------------------- |
| 1     | Project setup (Next.js, Tailwind, shadcn/ui) | 2-3 hours       | Low                           |
| 2     | Sanity integration & queries                 | 3-4 hours       | Medium                        |
| 3     | Product listing & filtering                  | 4-6 hours       | Medium                        |
| 4     | Search implementation (fuse.js)              | 2-3 hours       | Low                           |
| 5     | Product detail pages                         | 3-4 hours       | Medium                        |
| 6     | Collection pages                             | 2-3 hours       | Low                           |
| 7     | Performance optimization                     | 2-3 hours       | Medium                        |
| 8     | SEO & structured data                        | 2-3 hours       | Low                           |
| 9     | Testing & QA                                 | 4-5 hours       | Medium                        |
| 10    | Deployment & monitoring                      | 2-3 hours       | Low                           |
|       | **TOTAL**                                    | **26-36 hours** | **Comfortable 1-week sprint** |

---

## Risk Mitigation

### Potential Issues & Solutions

| Risk                            | Likelihood | Solution                                         |
| ------------------------------- | ---------- | ------------------------------------------------ |
| Slow search with large catalogs | Medium     | Implement pagination, use Algolia if 1000+ items |
| Complex filtering queries       | Low        | Use GROQ query builder library, cache results    |
| Image load performance          | Low        | Optimize with Sanity transforms, lazy load       |
| SEO concerns                    | Low        | Implement SSG + ISR, structured data             |
| Real-time inventory sync        | Medium     | Implement polling or webhooks from Sanity        |

---

## Future Enhancements

### Phase 2.1 (After MVP)

- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] Customer reviews
- [ ] Email notifications

### Phase 2.2

- [ ] Algolia integration (advanced search)
- [ ] Personalized recommendations
- [ ] Analytics tracking
- [ ] A/B testing setup

### Phase 2.3

- [ ] Order management
- [ ] Payment integration (Stripe/PayFast)
- [ ] Customer accounts
- [ ] Order history

---

## Resource Links

### Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Sanity GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity JS Client](https://www.sanity.io/docs/js-client)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Libraries

- [fuse.js Documentation](https://fusejs.io/)
- [React Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/)

### Tools

- [Vercel](https://vercel.com/)
- [GitHub](https://github.com/)

---

## Next Steps

1. **After your meeting with Jarred & Liza:**
   - Confirm design direction
   - Validate whether to build custom or use template
   - Decide on mobile-first vs desktop-first

2. **Technical Setup Phase:**
   - Initialize Next.js project
   - Configure Sanity client
   - Set up development environment
   - Create component structure

3. **Development Phase:**
   - Follow timeline above
   - Regular testing and reviews with Liza
   - Gather feedback and iterate

---

**This document will be updated after your design meeting with specific design system choices and component specifications.**

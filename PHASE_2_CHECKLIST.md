# Phase 2 Implementation Checklist

Quick reference for building the customer-facing frontend. Use this during development.

## Pre-Development

- [ ] Design approved by Jarred & Liza
- [ ] Design system documented (colors, fonts, spacing)
- [ ] Mobile wireframes reviewed
- [ ] Feature prioritization confirmed
- [ ] Timeline agreed with team

## Project Setup

- [ ] Create new Next.js 15 project
- [ ] Install Tailwind CSS
- [ ] Configure shadcn/ui
- [ ] Set up TypeScript strict mode
- [ ] Create .env.local with Sanity credentials
- [ ] Initialize ESLint & Prettier configuration
- [ ] Create git repository
- [ ] Push initial commit

## Sanity Integration

- [ ] Install @sanity/client and @sanity/image-url
- [ ] Create `/lib/sanity.ts` with client setup
- [ ] Create GROQ query functions:
  - [ ] `fetchProducts(filters)`
  - [ ] `fetchProductBySlug(slug)`
  - [ ] `fetchCollections()`
  - [ ] `fetchCollectionBySlug(slug)`
- [ ] Set up React Query with proper caching
- [ ] Test queries in Sanity Vision tool

## Product Listing Page (/products)

- [ ] Create page layout with sidebar + grid
- [ ] Build ProductCard component
- [ ] Build ProductGrid component with 12-16 items per page
- [ ] Implement pagination controls
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Optimize images with next/image

## Search Functionality

- [ ] Install and configure fuse.js
- [ ] Build SearchBar component
- [ ] Implement debounced search (300ms)
- [ ] Create /api/search endpoint
- [ ] Display search results
- [ ] Handle "no results" state
- [ ] Add search highlighting

## Filtering

- [ ] Build FilterSidebar component
- [ ] Implement category filter (checkboxes)
- [ ] Implement material filter (checkboxes)
- [ ] Implement price range filter (slider)
- [ ] Implement in-stock filter (checkbox)
- [ ] Create URL-based filter state management
- [ ] Add "Clear filters" button
- [ ] Display active filter count

## Product Detail Page (/products/[slug])

- [ ] Create dynamic route
- [ ] Build image gallery with Lightbox
- [ ] Display all variants with prices
- [ ] Show stock status per variant
- [ ] Implement variant selection UI
- [ ] Add "Add to Inquiry" button (placeholder)
- [ ] Display collection link if exists
- [ ] Show related products from same collection
- [ ] Implement generateStaticParams for SSG

## Collection Pages (/collections/[slug])

- [ ] Create dynamic collection routes
- [ ] Display collection hero image
- [ ] Display collection description
- [ ] List products in collection with filters
- [ ] Implement pagination for collection products
- [ ] Implement generateStaticParams for SSG

## Navigation & UI

- [ ] Build Header component with logo
- [ ] Build Navigation menu
- [ ] Build Footer component
- [ ] Implement breadcrumb navigation
- [ ] Add search icon in header
- [ ] Implement mobile hamburger menu
- [ ] Test navigation on all screen sizes

## Performance

- [ ] Optimize all images (WebP, multiple sizes)
- [ ] Implement lazy loading for product grids
- [ ] Add React Query caching strategy
- [ ] Set up incremental static regeneration (ISR)
- [ ] Test page load speed (aim for <3s)
- [ ] Implement service worker (optional)
- [ ] Compress bundle size

## SEO

- [ ] Configure next-seo or useHead
- [ ] Add meta tags to all pages
- [ ] Implement JSON-LD structured data for products
- [ ] Create sitemap.xml (dynamic)
- [ ] Create robots.txt
- [ ] Add canonical tags
- [ ] Test with Google Search Console
- [ ] Test with Rich Results Test

## Mobile Optimization

- [ ] Test on iPhone, Android
- [ ] Ensure touch targets are 44px+ minimum
- [ ] Test portrait and landscape orientations
- [ ] Optimize images for mobile
- [ ] Test slow 3G connection
- [ ] Implement mobile-specific interactions

## Accessibility

- [ ] Add alt text to all images
- [ ] Ensure color contrast ratio >= 4.5:1
- [ ] Test keyboard navigation
- [ ] Add ARIA labels where needed
- [ ] Test with screen reader (NVDA or JAWS)
- [ ] Validate HTML with W3C validator

## Testing

- [ ] Test all filtering combinations
- [ ] Test search with various inputs
- [ ] Test with no results
- [ ] Test with many results (pagination)
- [ ] Test on slow network
- [ ] Test on slow device
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Test all responsive breakpoints

## Documentation

- [ ] Create FRONTEND_SETUP.md for developers
- [ ] Document API routes
- [ ] Document component structure
- [ ] Create environment variables guide
- [ ] Add comments to complex queries
- [ ] Create troubleshooting guide

## Deployment

- [ ] Set up Vercel account
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Vercel
- [ ] Set up preview deployments
- [ ] Configure production domain
- [ ] Set up monitoring/alerts
- [ ] Create CI/CD pipeline
- [ ] Test production build locally

## Post-Launch

- [ ] Monitor performance metrics
- [ ] Collect user feedback
- [ ] Fix any reported bugs
- [ ] Plan Phase 2.1 enhancements
- [ ] Consider A/B testing setup
- [ ] Monitor Sanity query performance

## Optional Enhancements (After MVP)

- [ ] Add product comparison feature
- [ ] Implement wishlist
- [ ] Add customer reviews section
- [ ] Implement newsletter signup
- [ ] Add live chat support
- [ ] Integrate analytics (Google Analytics, Mixpanel)
- [ ] Add image zoom on hover
- [ ] Implement custom 404 page

---

## Key Metrics to Track

Once launched, monitor:

- Page load time (target: <3s)
- Largest Contentful Paint - LCP (target: <2.5s)
- First Input Delay - FID (target: <100ms)
- Cumulative Layout Shift - CLS (target: <0.1)
- Search usage & top queries
- Filter popularity
- Product detail page views
- Bounce rate by page
- Mobile vs desktop traffic

---

## Done When

✅ All filtering combinations work correctly  
✅ Search returns relevant results  
✅ Images load quickly and look good  
✅ Mobile experience is smooth  
✅ SEO best practices implemented  
✅ Liza approves the design and functionality  
✅ No critical bugs found  
✅ Performance metrics meet targets

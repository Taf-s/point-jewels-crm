# GROQ Query Reference for Phase 2

Quick reference for common GROQ queries needed for the frontend.

---

## Basic Queries

### Fetch All Products

```groq
*[_type == "product"] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "minPrice": min(variants[].price),
  "maxPrice": max(variants[].price),
  "variants": variants[] {
    material,
    price,
    stock
  }
}
```

### Fetch Product by Slug

```groq
*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  "images": images[] {
    asset->,
    alt
  },
  "variants": variants[] {
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

### Fetch All Collections

```groq
*[_type == "collection"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  "image": image {
    asset->,
    alt
  }
}
```

### Fetch Collection by Slug

```groq
*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  "image": image {
    asset->,
    alt
  }
}
```

---

## Filtered Queries

### Filter by Category

```groq
*[_type == "product" && category == $category] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[] {
    material,
    price,
    stock
  }
}
```

### Filter by Material (using variants)

```groq
*[_type == "product" && defined(variants[material == $material])] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[material == $material] {
    material,
    price,
    stock
  }
}
```

### Filter by Price Range

```groq
*[_type == "product" && defined(variants[price >= $minPrice && price <= $maxPrice])] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[price >= $minPrice && price <= $maxPrice] {
    material,
    price,
    stock
  }
}
```

### Filter by Collection

```groq
*[_type == "product" && collection._ref == $collectionId] {
  _id,
  title,
  slug,
  "thumbnail": images[0],
  "variants": variants[] {
    material,
    price,
    stock
  }
}
```

### In Stock Only

```groq
*[_type == "product" && defined(variants[stock > 0])] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[stock > 0] {
    material,
    price,
    stock
  }
}
```

---

## Complex Filters

### Category + Material + Price Range

```groq
*[_type == "product" &&
  category == $category &&
  defined(variants[material == $material && price >= $minPrice && price <= $maxPrice])
] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[material == $material && price >= $minPrice && price <= $maxPrice] {
    material,
    price,
    stock
  }
}
```

### Dynamic Filtering (All filters optional)

```groq
*[_type == "product" &&
  (category == $category || $category == null) &&
  (defined(variants[material == $material]) || $material == null) &&
  (defined(variants[price >= $minPrice && price <= $maxPrice]) || $minPrice == null) &&
  (collection._ref == $collectionId || $collectionId == null) &&
  (defined(variants[stock > 0]) || !$inStockOnly)
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  "thumbnail": images[0],
  "minPrice": min(variants[].price),
  "maxPrice": max(variants[].price),
  "variants": variants[] {
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

## Pagination

### With Limit and Offset

```groq
*[_type == "product"] | order(title asc) [$offset...$offset + $limit] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[] {
    material,
    price,
    stock
  }
}
```

### Get Total Count (for pagination)

```groq
{
  "total": count(*[_type == "product"]),
  "products": *[_type == "product"] | order(title asc) [$offset...$offset + $limit] {
    _id,
    title,
    slug,
    category,
    "thumbnail": images[0],
    "variants": variants[] {
      material,
      price,
      stock
    }
  }
}
```

---

## Search Queries

### Full Text Search (for server-side search)

```groq
*[_type == "product" &&
  (title match $searchTerm ||
   description match $searchTerm ||
   category match $searchTerm)
] | order(_score desc) {
  _id,
  title,
  slug,
  category,
  description,
  "thumbnail": images[0],
  "variants": variants[] {
    material,
    price,
    stock
  }
}
```

### Typo-Tolerant Search (Alternative)

```groq
*[_type == "product" &&
  (title[0:3] == $searchPrefix ||
   title match $searchTerm)
] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[] {
    price
  }
}
```

---

## Aggregation Queries

### Get All Distinct Categories

```groq
array(distinct(*[_type == "product"].category))
```

### Get All Available Materials

```groq
array(distinct(*[_type == "product"].variants[].material))
```

### Get Price Range

```groq
{
  "minPrice": min(*[_type == "product"].variants[].price),
  "maxPrice": max(*[_type == "product"].variants[].price)
}
```

### Get Products by Category with Counts

```groq
*[_type == "product"] | group(category) | map({
  category: _key,
  count: length(.[]),
  products: .[]
})
```

---

## Relationship Queries

### Products in a Collection with Collection Details

```groq
*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  "image": image {
    asset->,
    alt
  },
  "products": *[_type == "product" && collection._ref == ^._id] {
    _id,
    title,
    slug,
    category,
    "thumbnail": images[0],
    "variants": variants[] {
      material,
      price,
      stock
    }
  }
}
```

### Related Products (Same Collection)

```groq
*[_type == "product" && collection._ref == ^.collection._ref] | order(_createdAt desc) [0:5] {
  _id,
  title,
  slug,
  category,
  "thumbnail": images[0],
  "variants": variants[] {
    material,
    price
  }
}
```

---

## Performance Tips

### 1. Use Projection Selectively

```groq
// ❌ Bad - fetches unnecessary data
*[_type == "product"]

// ✅ Good - only fetch what you need
*[_type == "product"] {
  _id,
  title,
  slug
}
```

### 2. Filter Early

```groq
// ❌ Inefficient - fetches all, then filters
*[_type == "product"] | select(category == $category)

// ✅ Better - filter in query
*[_type == "product" && category == $category]
```

### 3. Limit Results

```groq
// Always limit for listings
*[_type == "product"] | order(_createdAt desc) [0...12]
```

### 4. Cache-Friendly Queries

```groq
// Use consistent parameter names for better cache hits
// This makes it easier for React Query to cache results
*[_type == "product" && category == $category] | order(title asc)
```

---

## Usage in TypeScript/Next.js

### Setup Client

```typescript
// lib/sanity.ts
import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### Execute Query

```typescript
// lib/sanity.ts
export async function fetchProducts(filters: Filters) {
  const query = buildProductQuery(filters)
  return await sanityClient.fetch(query, {
    category: filters.category,
    material: filters.material,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    offset: filters.offset || 0,
    limit: filters.limit || 12,
  })
}
```

### Query Builder Function

```typescript
function buildProductQuery(filters: Filters): string {
  let query = '*[_type == "product"'

  if (filters.category) {
    query += ' && category == $category'
  }

  if (filters.material) {
    query += ' && defined(variants[material == $material])'
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query += ' && defined(variants[price >= $minPrice && price <= $maxPrice])'
  }

  query += ']'

  // ... projection
  return query
}
```

---

## Common Mistakes to Avoid

❌ **Don't:** Use `["_id"]` for array access  
✅ **Do:** Use `[0]` for first element access

❌ **Don't:** Forget to handle null references  
✅ **Do:** Use `->` for dereferencing

❌ **Don't:** Fetch entire nested arrays if you only need one  
✅ **Do:** Filter nested arrays in the query

❌ **Don't:** Use multiple queries when one with `group()` works  
✅ **Do:** Combine results server-side

---

## Testing Queries

Use **Sanity Vision** to test queries:

1. Go to Studio > Tools > Vision
2. Copy query from this document
3. Click "Execute"
4. Adjust parameters as needed

This is the fastest way to debug query issues!

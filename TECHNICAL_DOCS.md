# Point Jewels CRM - Technical Documentation

## Project Overview
A content management system (CMS) built with Sanity for managing jewelry inventory, collections, and team access.

**Project ID:** `ivgk830x`  
**Dataset:** `production`  
**Framework:** Sanity 3.95.0 with React 19  
**Language:** TypeScript 5

---

## Schema Architecture

### 1. Product Document
**Purpose:** Core jewelry product catalog

**Fields:**
- `title` (string, required) - Product name
- `slug` (slug, required, auto-generated) - URL identifier
- `category` (string, required) - One of: necklace, ring, bracelet, pendant, watch
- `images` (array of images, required, min 1) - Product gallery
- `description` (text) - Marketing copy
- `collection` (reference to Collection, optional) - Collection grouping
- `variants` (array of Variant objects, required, min 1) - Material options with pricing

**Important:** Products are document-level. Each product can have multiple variants.

---

### 2. Variant Object
**Purpose:** Represents a single material/price option for a product

**Fields:**
- `material` (string, required) - One of: 18k_gold, rose_gold, platinum, silver
- `price` (number, required, positive) - Price in ZAR
- `stock` (number, required, min 0) - Quantity available
- `sku` (string, required, unique) - Unique inventory identifier

**Important:** Variants are nested objects within Product documents, NOT separate documents.

**SKU Convention:**
```
[CATEGORY]-[MATERIAL]-[NUMBER]
Examples:
- NECKL-GOLD-001
- RING-SILVER-001
- WATCH-PLAT-001
```

---

### 3. Collection Document
**Purpose:** Group related products (campaigns, seasons, themes)

**Fields:**
- `title` (string, required) - Collection name
- `slug` (slug, required, auto-generated) - URL identifier
- `description` (text) - Collection story
- `image` (image) - Hero image for the collection

**Usage:** Products reference collections (optional). One product can belong to one collection.

---

### 4. Team Member Document
**Purpose:** Access control and team management

**Fields:**
- `name` (string, required) - Full name
- `email` (string, required, validated) - Email address
- `role` (string, required) - One of: owner, product_manager, viewer
  - **owner** - Full system access (Liza)
  - **product_manager** - Can add/edit products
  - **viewer** - Read-only access for previews
- `isActive` (boolean, default true) - Access toggle

**Important:** Deactivating a member (isActive = false) revokes access without deleting the record.

---

## Data Model Relationships

```
Product
├── category (enum)
├── collection (reference) → Collection
├── variants (array)
│   ├── material (enum)
│   ├── price (number)
│   ├── stock (number)
│   └── sku (string, unique)
└── images (array)

Collection
├── title
├── description
└── ← referenced by Product

TeamMember
├── name
├── email
├── role (enum: owner, product_manager, viewer)
└── isActive (boolean)
```

---

## File Structure

```
schemaTypes/
├── index.ts           # Main export for all schema types
├── product.ts         # Product document schema
├── variant.ts         # Variant object schema
├── collection.ts      # Collection document schema
└── teamMember.ts      # Team member document schema
```

---

## Environment & Deployment

**Development:**
```bash
npm run dev
# Starts Sanity Studio at http://localhost:3333
```

**Build:**
```bash
npm run build
```

**Deploy:**
```bash
npm run deploy
```

---

## Validation Rules

### Product
- Title: Required
- Slug: Required, auto-generated, max 96 chars
- Category: Required, must be from list
- Images: Required, minimum 1 image
- Variants: Required, minimum 1 variant

### Variant
- Material: Required, must be from list
- Price: Required, must be positive number
- Stock: Required, minimum 0
- SKU: Required, must be unique

### Collection
- Title: Required
- Slug: Required, auto-generated, max 96 chars

### Team Member
- Name: Required
- Email: Required, must be valid email format
- Role: Required, must be from list
- isActive: Optional, defaults to true

---

## Key Features

### ✅ Implemented
- Multi-variant product support (same design, different materials)
- Inventory tracking per variant
- Collection organization
- Role-based access control (Owner, Product Manager, Viewer)
- Image gallery management
- Auto-generating slugs

### 🔄 Planned (Phase 2)
- Customer-facing product catalog/browsing
- Search & filtering (fuzzy search)
- Collections display
- Order/inquiry system integration
- Inventory analytics

---

## Important Notes for Developers

1. **SKU Uniqueness:** While enforced in Sanity validation at runtime, ensure your application layer also validates SKU uniqueness before mutations.

2. **Variant Pricing:** Prices are per variant. No global product pricing. Design customer-facing UI accordingly.

3. **Collections are Optional:** Products don't require a collection. This is intentional—allows flexibility.

4. **Team Member Deactivation:** Use `isActive` flag instead of deleting records. Preserves data history and audit trails.

5. **Role Permissions:** Role-based access control is documented but not yet enforced at the API level. This should be implemented when building the customer-facing application.

---

## Next Steps

1. **Phase 2 - Customer Experience**
   - Build product browsing interface
   - Implement search & filtering
   - Design collection pages

2. **API Integration**
   - Query products by category
   - Filter by material/price
   - Search functionality
   - Inventory status

3. **Admin Enhancements**
   - Inventory alerts (low stock)
   - Sales analytics
   - Product performance tracking

---

## Support & Questions

For questions about the schema or implementation details, refer to:
- Sanity Documentation: https://www.sanity.io/docs
- Project Config: `sanity.config.ts`
- Schema Definitions: `schemaTypes/`


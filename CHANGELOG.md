# Changelog

All notable changes to Point Jewels CRM are documented in this file.

## [Unreleased]

## [1.0.0] - 2025-12-03

### Added

#### Schema Architecture

- **Product Document Type**
  - Core jewelry product catalog with categories (necklace, ring, bracelet, pendant, watch)
  - Multi-image gallery support with grid layout
  - Reference to Collections for organizational grouping
  - "Romance Copy" text field for poetic product descriptions
  - Auto-generated URL slugs from product titles

- **Variant Object Type** (Nested in Products)
  - Material options: 18k Gold, Rose Gold, Platinum, Sterling Silver
  - Individual pricing per material variant (in ZAR)
  - Stock quantity tracking per variant
  - SKU (Stock Keeping Unit) codes for inventory management
  - Unique SKU validation at form level
  - Smart preview showing material, price, and stock

- **Collection Document Type**
  - Named groups for organizing products
  - Optional collection descriptions
  - Hero image for collection display
  - Auto-generated URL slugs
  - One-to-many relationship with products

- **Team Member Document Type**
  - Role-based access control system
  - Three access levels:
    - **Owner/Master**: Full system control
    - **Product Manager**: Add and edit products
    - **Viewer**: Read-only access for previews
  - Email validation
  - Active/Inactive toggle for access management
  - Preserves member records without deletion

### Documentation

- **LIZA_USER_GUIDE.md**: Beginner-friendly user guide with:
  - Step-by-step instructions for adding products
  - Variant management guide
  - Collection creation walkthrough
  - Team management instructions
  - Photography and copywriting tips
  - Best practices for SKU naming

- **TECHNICAL_DOCS.md**: Developer documentation with:
  - Complete schema architecture explanation
  - Data model relationships and diagrams
  - Validation rules documentation
  - File structure overview
  - Development principles
  - Future feature planning

- **README.md**: Project overview with:
  - Quick project summary
  - Feature highlights
  - Getting started instructions
  - Links to all documentation
  - Tech stack details

### Code Quality

- Comprehensive JSDoc comments on all schema files
- Clear field descriptions in every schema type
- Detailed comments explaining design decisions
- Schema registry documentation in index.ts
- Standardized code formatting and organization

### Development Setup

- Sanity Studio configured and running
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Git repository initialized with meaningful commit history

---

## Development Notes

### Phase 1 Status: ✅ COMPLETE

Core admin functionality is complete and tested. Liza can manage:

- Products with variants
- Collections and organization
- Team access control
- Inventory tracking

### Phase 2 Status: 🚧 PLANNED

Next iteration will focus on customer-facing experience:

- Product browsing interface
- Fuzzy search and filtering (by category, material, price)
- Collection display
- Customer inquiry/order integration

### Design Decisions

1. **Variants as Nested Objects**: Keeps the same product design with multiple material options organized together
2. **Optional Collections**: Allows flexibility without forcing organization on every product
3. **SKU at Variant Level**: Each material option gets its own inventory code
4. **Role-Based Access**: Simple three-tier system suitable for small team growth
5. **Active/Inactive Toggle**: Preserves data history instead of deleting team members

---

## Commit History

- **684f9e2** - docs: add comprehensive comments to all schema types
- **aab4b17** - created read me files for liza, technical team and for the project
- **38a0990** - added more product schemas and team member schema and enhanced product schema
- **2237944** - first commit
- **d3e340b** - Initial commit of project files

---

## Future Roadmap

### Phase 2: Customer Experience

- [ ] Product catalog frontend
- [ ] Category-based filtering
- [ ] Material and price range filters
- [ ] Fuzzy search functionality
- [ ] Collection browsing

### Phase 3: Business Intelligence

- [ ] Inventory alerts (low stock)
- [ ] Sales analytics dashboard
- [ ] Best-seller tracking
- [ ] Product performance reports

### Phase 4: Advanced Features

- [ ] Order management system
- [ ] Customer inquiry forms
- [ ] Email notifications
- [ ] Export to e-commerce platforms
- [ ] Social media integration

---

## Tech Stack

- **CMS**: Sanity 3.95.0
- **Frontend Framework**: React 19
- **Language**: TypeScript 5
- **Styling**: styled-components 6.1.18
- **Developer Tools**: ESLint 9.28, Prettier 3.5

---

## Contributors

- Tafara Sithole (Lead Developer)
- Liza (Client/Business Owner)
- Jarred (Designer)

# Point Jewels CRM

A beautiful, intuitive content management system for managing jewelry inventory, collections, and team access. Built for creators who want to focus on their craft, not complicated software.

---

## 🎯 What This Is

Point Jewels CRM is a modern jewelry management system built on Sanity. It allows you to:
- ✨ Manage your jewelry catalog with categories and variants
- 💰 Set different prices for different materials (gold, silver, platinum)
- 📸 Upload beautiful product photos and tell your story
- 🏷️ Track inventory with SKU codes
- 👥 Control who has access to your business data
- 🎨 Organize products into collections for campaigns or seasons

---

## 📚 Documentation

### For Liza (The Business Owner)
👉 **[Start here: LIZA_USER_GUIDE.md](./LIZA_USER_GUIDE.md)**

A beginner-friendly guide with step-by-step instructions for:
- Adding products
- Managing variants (gold/silver options)
- Creating collections
- Managing team members

### For Developers
👉 **[TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md)**

Technical documentation covering:
- Schema architecture
- Data model relationships
- Validation rules
- Environment setup
- Future planning

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```
Studio will be available at `http://localhost:3333`

### Build
```bash
npm run build
```

### Deploy
```bash
npm run deploy
```

---

## 📦 Core Features

### Products
- **Categories:** Necklace, Ring, Bracelet, Pendant, Watch
- **Variants:** Multiple material options per product with separate pricing & inventory
- **Gallery:** Upload multiple product photos
- **Romance Copy:** Tell the story of each piece
- **Collections:** Optional grouping for campaigns/seasons

### Inventory Management
- **Stock Tracking:** Track quantity per variant
- **SKU System:** Unique codes for inventory management
- **Material Options:** 18k Gold, Rose Gold, Platinum, Sterling Silver

### Team Management
- **Three Roles:**
  - Owner/Master: Full control
  - Product Manager: Can add/edit products
  - Viewer: Read-only access
- **Active Toggle:** Deactivate without deleting

---

## 🏗️ Architecture

**Tech Stack:**
- Sanity 3.95.0 (Headless CMS)
- React 19
- TypeScript 5
- styled-components

**Project Details:**
- Project ID: `ivgk830x`
- Dataset: `production`
- Environment: Real-time editing with Sanity backend

---

## 📋 Schema Overview

### Product
Main document type for jewelry pieces
- Fields: title, slug, category, images, description, collection, variants
- Each product can have multiple variants (different materials/prices)

### Variant
Nested within Product (not a separate document)
- Fields: material, price, stock, sku

### Collection
Groups related products
- Fields: title, slug, description, image

### Team Member
Controls access and roles
- Fields: name, email, role, isActive

See [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md) for full details.

---

## 🎨 Development Principles

This CRM was built with these values:
- **Simplicity First** - No unnecessary complexity
- **Intentional Design** - Every feature has a purpose
- **Beginner-Friendly** - Non-technical users can confidently manage content
- **Scalable** - Room to grow without rebuilding

---

## 📞 Next Steps

**Phase 1 ✅ Complete:**
- Product management system
- Variant management
- Collection organization
- Team access control

**Phase 2 🚧 In Planning:**
- Customer-facing product catalog
- Search & filtering (fuzzy search)
- Collection browsing
- Inquiry/order integration

---

## 📖 Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Documentation](https://www.sanity.io/docs/schema-types)
- [Sanity Query Language (GROQ)](https://www.sanity.io/docs/groq)

---

## 👋 Support

Questions or issues?
1. Check the relevant documentation (LIZA_USER_GUIDE.md or TECHNICAL_DOCS.md)
2. Review Sanity's official documentation
3. Reach out to your development team

---

**Built with ❤️ for Point Jewels**

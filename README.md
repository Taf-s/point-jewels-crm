# Point Jewels CRM

A Sanity-powered CRM for managing jewelry collections, customers, products, and sales.

## Setup

1. Install dependencies: `npm install`
2. Replace `'your-project-id'` in `sanity.config.ts` with your Sanity project ID.
3. For email integrations, update webhook URL and secret in `sanity.config.ts`.
4. Run dev server: `npm run dev`
5. Build for production: `npm run build`

## Features

- **Collections**: Organize products into themed collections (with LIZA tagging).
- **Customers**: General and LIZA-specific customer profiles with segmentation.
- **Products**: Jewelry catalog with variants, pricing, inventory, and categories.
- **Sales Orders**: Track orders, payments, status, and customer links.
- **Marketing Campaigns**: Plan, execute, and measure marketing efforts with targeting.
- **Staff Management**: Internal user roles and permissions for CRM access.
- **Analytics Dashboard**: Real-time KPIs for sales, customers, products, and marketing.
- **Integrations**: Email webhooks, auth providers, and CORS for external services.
- **Testing**: Comprehensive unit tests (40+ tests) for all schemas.
- **Code Quality**: ESLint setup for maintainable code.

## Analytics Examples

- Total revenue: `*[_type == "salesOrder"]{totalAmount}`.sum()
- Top products: `*[_type == "product"] | order(inventory desc)[0...5]{name, inventory}`
- Customer count: `count(*[_type == "customer"])`

## Testing

Run tests: `npm test`

## Deployment

Deploy to Sanity hosting or integrate with your app.

## Performance Notes

- Use GROQ projections to limit data fetching.
- Enable CDN for faster queries.
- Monitor with Sanity's built-in tools.

# DHTX Flower Store API

NestJS API starter for a flower shop with separated public client APIs, guarded admin APIs, and Swagger documentation with demo body/query examples.

## Features

- Global response envelope: `{ data, code, status, paging? }`.
- Global validation pipe with transform and whitelist enabled.
- Global exception filter returning the same envelope shape for errors.
- Swagger UI at `GET /api/docs` with bearer auth and demo examples for every request body/query.
- Admin bearer-token authentication via `AdminAuthMiddleware`, excluding only the admin login route.
- Admin APIs:
  - `POST /api/v1/admin/auth/login`
  - `GET|POST|PUT|DELETE /api/v1/admin/users`
  - `GET|POST /api/v1/admin/categories`
  - `GET|POST|PUT /api/v1/admin/products`
  - `GET /api/v1/admin/inventory`
  - `PATCH /api/v1/admin/inventory/stock`
- Client APIs:
  - `GET /api/v1/products` with `categoryId`, `type`, `color`, `minPrice`, `maxPrice`, `keyword`, `page`, `limit` filters.
  - `GET /api/v1/products/:id`
  - `GET /api/v1/products/:id/similar`
  - `POST /api/v1/orders` for COD checkout only.

## Local development

```bash
npm install
npm run start:dev
# Open http://localhost:3000/api/docs for Swagger UI
```

## Admin login seed

```json
{
  "email": "admin@flower-store.local",
  "password": "admin123"
}
```

Use the returned `accessToken` as `Authorization: Bearer dev-admin-token` for guarded admin endpoints. You can also create more admin users via `POST /api/v1/admin/users`; active users can then log in through the same admin login API.

## Architecture notes

The code intentionally keeps a clean module boundary so the in-memory `FlowerStoreRepository` can later be replaced by a database adapter without changing controllers. Domain data types live in `src/modules/seed/domain.types.ts`, request DTOs live beside each module, and cross-cutting concerns live under `src/common`.

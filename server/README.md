# OpenAQ proxy

The browser calls this Express server instead of OpenAQ directly, so the API key stays on the server.

## Set up

1. Copy `.env.example` to `.env` inside this folder.
2. Set `OPENAQ_API_KEY` to a key from [OpenAQ Explorer](https://explore.openaq.org/account).
3. From the project root, run `npm run dev:server`.

The proxy runs at `http://localhost:8787` by default. It accepts the local Vite origins, plus any comma-separated origins in `CORS_ORIGIN`.

## Routes

- `GET /health`
- `GET /api/locations` — forwards supported OpenAQ location filters, such as `coordinates`, `radius`, `parameters_id`, `limit`, and `page`.
- `GET /api/locations/search?q=delhi` — searches cached Indian PM2.5 monitoring stations for the header type-ahead.
- `GET /api/locations/:locationId/latest` — returns the latest measurements for a location.

The key is sent only in the upstream `X-API-Key` request header; it is never returned to the browser.

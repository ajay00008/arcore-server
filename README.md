# arcore-server

Secure data-proxy backend for the ARCore Geospatial MVP.

## Setup

```bash
cp .env.example .env
npm install
npm start
```

## API

### `GET /health`

Health check and cache stats.

### `POST /api/lookup`

```json
{ "lat": 38.760662, "lng": -77.144333 }
```

Returns zone payload or `{ "status": "not_found", "structural_class_code": "0000" }`.

## Phase 1 test zones

| Zone | Coordinates | Code |
|------|-------------|------|
| Zone 1 | 38.760662, -77.144333 | 8888 |
| Zone 2 | 38.763207, -77.139872 | 1111 |
| Zone 3 | 38.768236, -77.138877 | 9999 |

## Environment variables

See `.env.example`.

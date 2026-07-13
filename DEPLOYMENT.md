# Deployment

## Docker

```bash
docker build -t astro-orbit-frontend .
docker run -p 3000:3000 astro-orbit-frontend
```

## Environment Variables

| Variable | Required | Default |
|----------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:3001/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | No | `Astro Orbit` |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` |

## Production Build

```bash
npm run build
npm start
```

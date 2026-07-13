# Architecture

## Overview

Astro Orbit Frontend follows a layered architecture:

```
Pages (Next.js App Router)
  │
  ├── Layouts (Dashboard, Auth, Settings)
  │
  ├── Features (placeholder for v0.2.0)
  │
  ├── Components (UI primitives + shared components)
  │
  ├── Providers (Theme, Query, Auth)
  │
  ├── Services (API calls via Axios)
  │
  ├── Stores (Zustand for client state)
  │
  └── lib/utils (cn, api-client, constants)
```

## Data Flow

1. Pages render server-side via Next.js App Router
2. Client components hydrate with React 19
3. API calls flow through Axios client (with retry, auth, error handling)
4. Server state managed by TanStack Query (caching, refetching)
5. Client state managed by Zustand (auth, UI preferences)
6. Theme managed by next-themes (persisted to localStorage)

## Design System

All UI components live in `src/components/ui/` and follow shadcn/v4 conventions:
- Built on `@base-ui/react` primitives
- Styled with `class-variance-authority` (cva) for variants
- Class merging via `tailwind-merge` and `clsx`
- CSS variables for theming (light/dark/system)

## Routing

| Route | Layout | Auth Required |
|-------|--------|---------------|
| `/` | None | No |
| `/dashboard` | Dashboard | Yes |
| `/login` | Auth | No |
| `/settings/*` | Settings | Yes |
| `/profile` | Dashboard | Yes |

## Extending

See [ROADMAP.md](./ROADMAP.md) for planned extensions.

# Changelog

## [0.2.0] - 2026-07-14

### Added

- TypeScript types for all domains (Project, Contract, Deployment, Repository, DashboardStats, ActivityItem)
- API endpoint constants for all backend routes (projects, contracts, deployments, repos, analytics)
- Service classes for all domains with CRUD operations
- TanStack Query hooks for all domains with caching and mutations
- Organization pages: list, create, and detail with member overview
- Project pages: list with org scoping, detail with contracts tab
- Contract pages: list with status badges, detail with metadata and source hash
- Deployment pages: list with status colors, detail with logs viewer
- Analytics page with stats cards and activity feed
- Repositories page with provider badges and private repo indicators
- Dashboard wired to real data (analytics summary + activity feed)
- Sidebar and mobile navigation fully enabled with all domain routes
- Route constants for all pages (organizations, projects, contracts, deployments, analytics)

### Changed

- Bumped version to 0.2.0

## [0.1.0] - 2024-07-13

### Added

- Next.js 16 project with App Router
- TypeScript strict mode
- Tailwind CSS v4 with shadcn/ui components
- Design tokens and theme system
- Layout system (Dashboard, Auth, Settings)
- API client with auth interceptors and retry logic
- Auth provider with JWT storage
- Zustand auth store with persistence
- TanStack Query integration
- Protected routes with middleware
- Page placeholders (landing, dashboard, login, settings, profile)
- 404 and error pages
- Testing setup with Vitest
- Docker multi-stage build
- CI/CD with GitHub Actions
- ESLint, Prettier, Husky, Commitlint

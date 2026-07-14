# Astro Orbit — Engineering Issues

> Generated from full-source audit

## Contents

1. [Auth & State Management](#1-frontend-auth--state-management)
2. [Pages & Components](#2-frontend-pages--components)
3. [Hooks, Services & Data Layer](#3-frontend-hooks-services--data-layer)
4. [Testing & Quality](#4-frontend-testing--quality)
5. [Accessibility](#5-frontend-accessibility)
6. [Code Quality & Dead Code](#6-frontend-code-quality--dead-code)
7. [Cross-Cutting Testing](#7-cross-cutting-testing)
8. [Developer Experience](#8-developer-experience)

---

# 1. Frontend: Auth & State Management

---

## Issue #69 — Auth state duplicated between Zustand store and React Context

**Labels:** refactor, frontend

**Summary:**
Two auth systems with different storage keys:

- `stores/auth-store.ts` — persists to localStorage under `ao-auth`, used by `api-client.ts`
- `providers/auth-provider.tsx` — persists to localStorage under `STORAGE_KEYS.AUTH_TOKEN`, used by components via `useAuth()`

Different keys → desync risk. Middleware reads `ao-auth-token` from cookies — a third key.

**Acceptance Criteria:**

- [ ] Single source of truth (Zustand or Context, not both)
- [ ] Unified storage key
- [ ] Middleware reads same token frontend writes
- [ ] Login/logout updates all consumers

**Difficulty:** Intermediate

---

## Issue #70 — Auth provider `isLoading` is hardcoded to `false`

**Labels:** bug, frontend

**Summary:**
`auth-provider.tsx:62` — `useState(false)` — `isLoading` is never set to `true`. The `ProtectedRoute` component can never show its loading skeleton. It renders children or redirects immediately, risking a flash of login page on reload.

**Acceptance Criteria:**

- [ ] `isLoading` is `true` on mount while token is being validated
- [ ] Token expiry checked locally, then optionally verified with server
- [ ] `ProtectedRoute` shows skeleton during loading

**Difficulty:** Intermediate

---

## Issue #71 — Dashboard routes not protected by middleware

**Labels:** bug, frontend, security

**Summary:**
`middleware.ts:4` — `protectedRoutes` only includes `/dashboard`, `/settings`, `/profile`. The matcher at line 28: `['/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/login']`. Routes like `/organizations`, `/projects`, `/contracts`, `/deployments`, `/analytics`, `/repositories` are publicly accessible without auth.

**Acceptance Criteria:**

- [ ] All dashboard routes included in `protectedRoutes` and matcher
- [ ] Test that unauthenticated access to `/organizations` redirects to `/login`

**Difficulty:** Beginner

---

## Issue #72 — Login page has no real wallet connection or SEP-10 flow

**Labels:** feature, frontend

**Summary:**
`login/page.tsx` — "Connect Wallet" and "Email Sign In" buttons both show `toast.info('...coming soon')`. No wallet detection (Freighter, xBull), no SEP-10 challenge-response. Backend auth endpoints are fully implemented but the frontend never calls them.

**Acceptance Criteria:**

- [ ] Detect Freighter/xBull via `window.stellar` or `window.albedo`
- [ ] SEP-10 flow: challenge → sign → login → store tokens
- [ ] Handle wallet-not-installed, user-rejected, network errors
- [ ] Redirect to original `?redirect=` target after login

**Difficulty:** Advanced

---

## Issue #73 — Auth provider's `login()` stores user in localStorage but never calls backend API

**Labels:** bug, frontend

**Summary:**
`auth-provider.tsx:40-46` — `login()` writes user data to localStorage. No API call is made. The `AuthService.login()` method exists in `services/auth.ts` but is never called from any component.

**Acceptance Criteria:**

- [ ] Login flow calls `POST /auth/login` via `AuthService`
- [ ] Server returns JWT + refresh token + user
- [ ] Tokens stored in both Zustand store and middleware cookie

**Difficulty:** Intermediate

---

## Issue #74 — Logout does not invalidate server-side session

**Labels:** bug, frontend

**Summary:**
`auth-provider.tsx:48-54` — `logout()` clears localStorage but never calls `POST /auth/logout`. The server-side session remains active. If the client still has the token, it's still valid.

**Acceptance Criteria:**

- [ ] Logout calls `AuthService.logout()` or `POST /auth/logout`
- [ ] Server revokes the session
- [ ] Client clears cookies and all storage

**Difficulty:** Intermediate

---

## Issue #75 — Token refresh race condition on concurrent 401 responses

**Labels:** bug, frontend

**Summary:**
`api-client.ts:63-78` — if multiple API requests fail with 401 simultaneously, all of them attempt to refresh the token concurrently. Multiple refresh requests race, and the first one to complete may create a new token that invalidates the others.

**Acceptance Criteria:**

- [ ] Debounce/queue refresh attempts (only one refresh in flight at a time)
- [ ] Queue failed requests and replay them after refresh completes
- [ ] If refresh itself fails with 401, redirect to login

**Difficulty:** Advanced

---

## Issue #76 — No token expiry validation on page load

**Labels:** bug, frontend

**Summary:**
`auth-store.ts` — Zustand store hydrates from localStorage on mount but never checks if the stored token is expired. A user with an expired token appears authenticated until their first API call returns 401.

**Acceptance Criteria:**

- [ ] On store hydration, decode JWT and check `exp` claim
- [ ] If expired, attempt refresh or clear auth state
- [ ] If refresh fails, redirect to login

**Difficulty:** Intermediate

---

## Issue #77 — Middleware reads auth cookie that frontend never sets as a cookie

**Labels:** bug, frontend

**Summary:**
`middleware.ts:9` reads `request.cookies.get('ao-auth-token')`. But the frontend stores tokens in localStorage via Zustand, not as cookies. The cookie `ao-auth-token` is never set by client code. The middleware's redirect-on-no-cookie logic will always redirect to login after page refresh.

**Acceptance Criteria:**

- [ ] On login, set the auth token as an HTTP-only cookie (via API response or client-side `document.cookie`)
- [ ] OR use middleware-compatible token passing (e.g., encrypted cookie set by server)

**Difficulty:** Advanced

---

## Issue #78 — `useAuth` user data is never synced with backend

**Labels:** bug, frontend

**Summary:**
`auth-provider.tsx` — the `user` object is whatever was stored in localStorage at login time. It's never refreshed from `GET /users/me`. User display name, avatar URL, or email changes on the backend are never reflected on the frontend without a full logout/login.

**Acceptance Criteria:**

- [ ] On mount, call `GET /users/me` and update `user` state
- [ ] Periodically refresh user data (or on every page navigation)

**Difficulty:** Intermediate

---

# 2. Pages & Components

---

# 2. Frontend: Pages & Components

---

## Issue #79 — Dashboard shows empty state when user has no orgs

**Labels:** bug, frontend, UX

**Summary:**
`dashboard/page.tsx:23` — `const activeOrgId = orgs?.[0]?.id;` — if `orgs` is `[]`, `activeOrgId` is `undefined`, `useAnalyticsSummary` is disabled, and the entire stats/activity section renders nothing. No message tells the user to create an org first.

**Acceptance Criteria:**

- [ ] If no orgs exist, show "Create your first organization" card with CTA
- [ ] Link to `/organizations/new`

**Difficulty:** Beginner

---

## Issue #80 — All detail pages show "Not found" for network errors

**Labels:** bug, frontend, UX

**Summary:**
`contracts/[id]/page.tsx:26`, `deployments/[id]/page.tsx:35`, `organizations/[id]/page.tsx:28`, `projects/[id]/page.tsx:27` — the conditional `if (!data) return <p>Not found</p>` triggers for both "entity doesn't exist" (404) and "network error" (500, timeout). Users see "Not found" when the server is down.

**Acceptance Criteria:**

- [ ] Distinguish between `isError` (network/server failure) and `data === null` (404)
- [ ] Show error UI with retry button for network errors
- [ ] Show "Not found" only for actual 404s

**Difficulty:** Intermediate

---

## Issue #81 — Profile page uses artificial 1-second `setTimeout` loading state

**Labels:** bug, frontend

**Summary:**
`profile/page.tsx:16-19` — `setTimeout(() => setIsLoading(false), 1000)` — artificial delay that adds friction. Data is available from `useAuth()` but page waits 1 second before rendering it.

**Acceptance Criteria:**

- [ ] Remove artificial timer, use actual data loading state

**Difficulty:** Beginner

---

## Issue #82 — Settings profile page Save button never calls API

**Labels:** bug, frontend

**Summary:**
`settings/profile/page.tsx:76` — `onClick={() => toast.success('Profile updated')}` — shows a success toast but never calls `UserService.update()`. Profile changes are lost on page refresh.

**Acceptance Criteria:**

- [ ] Wire Save button to `useUpdateProfile` mutation (or direct API call)
- [ ] Handle loading, success, and error states
- [ ] Validate input before submission

**Difficulty:** Intermediate

---

## Issue #83 — Settings API keys page uses inline mock data in production code

**Labels:** bug, frontend, security

**Summary:**
`settings/api-keys/page.tsx:12-16` — `mockApiKeys` array contains fake API keys with realistic patterns (`ao_prod_8f3a...`). Create and delete buttons show `toast.info('...coming soon')`. Keys displayed in cleartext.

**Acceptance Criteria:**

- [ ] Fetch real API keys from backend
- [ ] Create API key triggers `POST /api-keys`, shows key once
- [ ] Delete API key with confirmation dialog
- [ ] Mask existing keys (`ao_prod_****`)

**Difficulty:** Intermediate

---

## Issue #84 — Repositories page passes `orgId` to hook expecting `projectId`

**Labels:** bug, frontend

**Summary:**
`repositories/page.tsx:13` — `const { data: repos } = useRepos(activeOrg?.id);` — `useRepos` calls `RepoService.list(projectId)` internally. The org ID is passed where a project ID is expected. The API call will fail at runtime.

**Acceptance Criteria:**

- [ ] Fix to use correct project ID from context or route params
- [ ] If page should show repos across all projects, change the hook/service

**Difficulty:** Intermediate

---

## Issue #85 — Project detail page never fetches deployments

**Labels:** bug, frontend

**Summary:**
`projects/[id]/page.tsx:91-96` — "Recent Deployments" section always shows "No deployments yet" because `useDeployments(projectId)` is never called. The data dependency is missing.

**Acceptance Criteria:**

- [ ] Call `useDeployments` with the project ID
- [ ] Render actual deployment list with status badges

**Difficulty:** Beginner

---

## Issue #86 — Mobile navigation active link detection uses exact match

**Labels:** bug, frontend, UX

**Summary:**
`mobile-navigation.tsx:52` and `sidebar.tsx:51` — `pathname === item.href` — sub-pages (e.g., `/organizations/123`) don't highlight the parent nav item "Organizations". Should use `pathname.startsWith(item.href)`.

**Acceptance Criteria:**

- [ ] Active state applies to parent item for all sub-routes
- [ ] Account for root-level matching (`/dashboard` shouldn't match `/dashboard-other`)

**Difficulty:** Beginner

---

## Issue #87 — Top navigation `pathLabels` map is incomplete

**Labels:** bug, frontend, UX

**Summary:**
`top-navigation.tsx:20-26` — maps only 5 paths to display labels. `/organizations`, `/contracts`, `/deployments`, `/projects`, `/repositories`, `/analytics`, and all `/:id` detail pages fall through to a generic fallback.

**Acceptance Criteria:**

- [ ] Complete mapping for all dashboard routes
- [ ] Detail pages show parent entity type (e.g., "Organization / My Org")

**Difficulty:** Beginner

---

## Issue #88 — Search and Bell buttons in top navigation have no functionality

**Labels:** feature, frontend

**Summary:**
`top-navigation.tsx:42-47` — Search and Notification bell buttons render as `<Button>` elements with icons but no `onClick` handlers. They are decorative dead UI.

**Acceptance Criteria:**

- [ ] Search button opens command palette (or search input)
- [ ] Bell button opens notification panel or links to settings
- [ ] Or remove buttons if not needed

**Difficulty:** Beginner

---

## Issue #89 — New Organization form has no error handling on submission failure

**Labels:** bug, frontend, UX

**Summary:**
`organizations/new/page.tsx:20-23` — `handleSubmit` calls `createOrg.mutateAsync` but doesn't `.catch()`. If the API call fails (network, validation, duplicate slug), the error is unhandled and no toast or error message is shown.

**Acceptance Criteria:**

- [ ] Show error toast on mutation failure
- [ ] Display inline error message for field-level validation (e.g., slug taken)
- [ ] Disable submit button during loading

**Difficulty:** Beginner

---

## Issue #90 — No pagination, search, or filter on any list page

**Labels:** feature, frontend

**Summary:**
All 6 list pages (`/organizations`, `/projects`, `/contracts`, `/deployments`, `/repositories`, `/analytics`) load and display the entire dataset with no pagination, search input, or filter controls. As data grows, these pages become unusable.

**Acceptance Criteria:**

- [ ] Pagination component with configurable page size
- [ ] Search input (client-side for small datasets, server-side via API query params)
- [ ] Filter controls for relevant dimensions (status, network, environment)
- [ ] URL query params preserve filter state on reload

**Difficulty:** Advanced

---

## Issue #91 — Mutation success/error feedback is inconsistent across pages

**Labels:** bug, frontend, UX

**Summary:**
Some pages show no feedback on mutation success (create org, create project), some show toast (profile save), some are dead buttons. No standard pattern for user feedback.

**Acceptance Criteria:**

- [ ] Success toast on every create/update/delete
- [ ] Error toast on failure with the error message
- [ ] Confirmation dialog before destructive actions

**Difficulty:** Beginner

---

## Issue #92 — `useEffect` cleanup missing for open async requests on unmount

**Labels:** bug, frontend

**Summary:**
Pages using `useEffect` for data fetching or timers (profile page `setTimeout`) don't cancel on unmount. If the user navigates away before the timer fires, React logs a warning about state updates on unmounted components.

**Acceptance Criteria:**

- [ ] All timers and subscriptions cleaned up in `useEffect` return function
- [ ] No "Can't perform a React state update on an unmounted component" warnings

**Difficulty:** Beginner

---

## Issue #93 — Landing page hardcodes brand name instead of using constant

**Labels:** refactor, frontend

**Summary:**
`page.tsx:36,96` — the string `"Astro Orbit"` appears directly. Should use `APP_NAME` from `@/constants`.

**Acceptance Criteria:**

- [ ] Replace all instances with `APP_NAME` constant
- [ ] Check all other pages for same issue

**Difficulty:** Beginner

---

## Issue #94 — Duplicate `statusColor` maps in deployment pages

**Labels:** refactor, frontend

**Summary:**
`deployments/page.tsx:12-19` and `deployments/[id]/page.tsx:13-20` — identical `const statusColor` record mapping deployment statuses to CSS classes.

**Acceptance Criteria:**

- [ ] Extract to `constants/index.ts` as `DEPLOYMENT_STATUS_COLORS`

**Difficulty:** Beginner

---

## Issue #95 — Duplicate `iconMap` in dashboard and analytics pages

**Labels:** refactor, frontend

**Summary:**
`dashboard/page.tsx:14-18` and `analytics/page.tsx:15-19` — identical `iconMap` for activity type → icon.

**Acceptance Criteria:**

- [ ] Extract to `constants/index.ts` as `ACTIVITY_ICON_MAP`

**Difficulty:** Beginner

---

## Issue #96 — `useEffect` artificial loading in two pages

**Labels:** bug, frontend

**Summary:**
`profile/page.tsx:16-19` and `settings/api-keys/page.tsx:21-24` both use `setTimeout` to create artificial loading delays. This degrades UX for no benefit.

**Acceptance Criteria:**

- [ ] Remove artificial timers
- [ ] Drive loading state from actual data fetching

**Difficulty:** Beginner

---

## Issue #97 — No optimistic updates on mutations

**Labels:** feature, frontend

**Summary:**
All mutation hooks (`useCreateOrganization`, `useDeleteProject`, etc.) are "fire and forget" — UI updates only after server responds and cache invalidates. Creates noticeable latency for user actions.

**Acceptance Criteria:**

- [ ] Optimistic updates for delete operations (immediately remove from list, rollback on failure)
- [ ] Optimistic updates for create (immediately show item, replace ID on server response)

**Difficulty:** Advanced

---

# 3. Hooks, Services & Data Layer

---

# 3. Frontend: Hooks, Services & Data Layer

---

## Issue #98 — `useAnalyticsSummary` is a confusing alias for `useDashboardStats`

**Labels:** refactor, frontend

**Summary:**
`use-analytics.ts:16` — `export const useAnalyticsSummary = useDashboardStats;` — two names for the same function with the same query key `['dashboard-stats', orgId]`. Used in both `dashboard/page.tsx` and `analytics/page.tsx`. The alias adds confusion without purpose.

**Acceptance Criteria:**

- [ ] Remove the alias, use the canonical name everywhere

**Difficulty:** Beginner

---

## Issue #99 — `useRepos` exported before `useRepositories` is defined (fragile hoisting)

**Labels:** bug, frontend

**Summary:**
`use-repos.ts:7` — `export const useRepos = useRepositories;` references `useRepositories` which is defined at line 9. Works due to function hoisting but fragile; would break if implementation changes from function to arrow function.

**Acceptance Criteria:**

- [ ] Define `useRepositories` before the alias, or remove the alias entirely

**Difficulty:** Beginner

---

## Issue #100 — `useDeleteRepository` invalidates ALL queries instead of scoped invalidation

**Labels:** bug, frontend

**Summary:**
`use-repos.ts:54` — `queryClient.invalidateQueries({ queryKey: ['repositories'] })` — invalidates ALL `repositories` queries across all projects. Other hooks use scoped invalidation like `['repositories', projectId]`.

**Acceptance Criteria:**

- [ ] Invalidate scoped to the correct project ID (`['repositories', variables.projectId]`)

**Difficulty:** Beginner

---

## Issue #101 — `orgs.ts` service missing `update` and `delete` methods

**Labels:** feature, frontend

**Summary:**
`services/orgs.ts` — has `create`, `list`, `getById` but no `update` or `remove` methods. Backend has PATCH and DELETE endpoints.

**Acceptance Criteria:**

- [ ] Add `update(id, data)` and `remove(id)` methods following existing patterns

**Difficulty:** Beginner

---

## Issue #102 — `users.ts` service methods are defined but never called anywhere

**Labels:** cleanup, frontend

**Summary:**
`services/users.ts` — `getMe`, `getById`, `update` are all defined but no component or hook imports or calls them. Dead code.

**Acceptance Criteria:**

- [ ] Either add hooks that use these methods (e.g., `useMe`, `useUpdateProfile`)
- [ ] Or document the intended usage with JSDoc and leave for future

**Difficulty:** Beginner

---

## Issue #103 — `auth.ts` service methods are defined but never called

**Labels:** cleanup, frontend

**Summary:**
`services/auth.ts` — `challenge`, `login`, `refresh`, `logout` are all defined but never imported in any component. The API client handles refresh internally, but the other methods are necessary for the login flow that doesn't exist yet.

**Acceptance Criteria:**

- [ ] Wire these methods into the login page and auth provider (see Issue #72, #73)

**Difficulty:** Intermediate

---

## Issue #104 — `ProtectedRoute` component is defined but never imported anywhere

**Labels:** cleanup, frontend

**Summary:**
`components/auth/protected-route.tsx` — full implementation with loading skeleton and redirect logic. Never imported by any layout or page. Only middleware protects routes.

**Acceptance Criteria:**

- [ ] Either integrate into dashboard layout as client-side fallback
- [ ] Or remove the component

**Difficulty:** Beginner

---

## Issue #105 — `CommandPaletteTrigger` is defined but never imported

**Labels:** cleanup, frontend

**Summary:**
`components/command-palette.tsx` — listens for `Cmd+K`, shows `toast.info('Command palette coming soon')`. Never imported anywhere.

**Acceptance Criteria:**

- [ ] Wire into dashboard layout to replace search button
- [ ] Or remove

**Difficulty:** Beginner

---

## Issue #106 — `services/base.ts` missing `AbortSignal` support

**Labels:** feature, frontend

**Summary:**
None of the 5 CRUD methods in `base.ts` accept `AbortSignal`. Long-running requests cannot be cancelled when user navigates away.

**Acceptance Criteria:**

- [ ] Add optional `AbortSignal` parameter to all methods
- [ ] Pass to Axios `config.signal`

**Difficulty:** Intermediate

---

## Issue #107 — `services/base.ts` always unwraps `response.data.data` — no error check

**Labels:** bug, frontend

**Summary:**
All methods in `base.ts` return `response.data.data`. The `ApiResponse` type has a `success` boolean field, but it's never checked. If `success` is `false`, the code still tries to access `.data` which may be `undefined`.

**Acceptance Criteria:**

- [ ] Check `response.data.success` before returning `response.data.data`
- [ ] Throw or return error if success is false

**Difficulty:** Intermediate

---

## Issue #108 — `api-client.ts` mutates `config._retry` on the original Axios config object

**Labels:** bug, frontend

**Summary:**
`api-client.ts:52` — sets `config._retry = true` on the original request config. This mutates the config object and could cause issues if the same config is reused (e.g., in retry scenarios).

**Acceptance Criteria:**

- [ ] Use a separate tracking Set or non-enumerable property

**Difficulty:** Beginner

---

## Issue #109 — `api-client.ts` hardcodes `/auth/refresh` URL instead of using constant

**Labels:** refactor, frontend

**Summary:**
`api-client.ts:67` — `axios.post('/auth/refresh', ...)` should use `API_ENDPOINTS.AUTH.REFRESH` from `@/constants`.

**Acceptance Criteria:**

- [ ] Replace hardcoded string with constant

**Difficulty:** Beginner

---

## Issue #110 — Activity feed hook fetches without org context but dashboard stats require it

**Labels:** refactor, frontend

**Summary:**
`use-analytics.ts` — `useActivityFeed()` fetches `GET /dashboard/activity` globally (no org filter). `useDashboardStats(orgId)` requires orgId. Inconsistent — the activity feed may show events from orgs the user doesn't have access to.

**Acceptance Criteria:**

- [ ] Scope activity feed to a specific org, or document the global scope design

**Difficulty:** Intermediate

---

# 4. Testing & Quality

---

# 4. Frontend: Testing & Quality

---

## Issue #111 — No unit tests for any service (9 services, 0 test files)

**Labels:** testing, frontend

**Summary:**
Zero test files exist for `services/auth.ts`, `base.ts`, `contracts.ts`, `deployments.ts`, `index.ts`, `orgs.ts`, `projects.ts`, `repos.ts`, `users.ts`. All business logic in the service layer is untested.

**Acceptance Criteria:**

- [ ] Each service method tested with mock API client
- [ ] Test successful and error paths
- [ ] CI runs these tests

**Difficulty:** Intermediate

---

## Issue #112 — No unit tests for any hook (6 hooks, 0 test files)

**Labels:** testing, frontend

**Summary:**
`hooks/use-analytics.ts`, `use-contracts.ts`, `use-deployments.ts`, `use-orgs.ts`, `use-projects.ts`, `use-repos.ts` — zero tests for query keys, enabled conditions, mutation invalidation.

**Acceptance Criteria:**

- [ ] Each hook tested with `renderHook` from `@testing-library/react`
- [ ] Test query key structure, enabled/disabled conditions, cache invalidation

**Difficulty:** Intermediate

---

## Issue #113 — Test wrapper in `test-utils.tsx` provides no providers

**Labels:** bug, testing

**Summary:**
`test/test-utils.tsx:5-7` — `<Wrapper>` only renders `{children}`. No `QueryClientProvider`, `ThemeProvider`, or `AuthProvider`. All component tests that depend on hooks, query, or auth will fail.

**Acceptance Criteria:**

- [ ] Wrapper includes all necessary providers
- [ ] Query client configured with `defaultOptions: { queries: { retry: false } }`

**Difficulty:** Intermediate

---

## Issue #114 — No mock for `next/navigation` in test setup

**Labels:** bug, testing

**Summary:**
`test/setup.ts` only imports `@testing-library/jest-dom/vitest`. No mocks for `next/navigation` (`useRouter`, `usePathname`, `useParams`), `next-themes`, or `sonner`. Any component using these will fail in tests.

**Acceptance Criteria:**

- [ ] Add global mocks in `setup.ts` or `vitest.config.ts`
- [ ] Mock `useRouter`, `usePathname`, `useParams` from `next/navigation`

**Difficulty:** Intermediate

---

## Issue #115 — Only 3 UI components have tests (20 tests total)

**Labels:** testing, frontend

**Summary:**

- `badge.test.tsx` — 4 tests
- `button.test.tsx` — 6 tests
- `card.test.tsx` — 1 test

The remaining 17 UI components, all 6 layout components, all 14 pages, and all feature components have zero tests.

**Acceptance Criteria:**

- [ ] All UI components have at least render + interaction tests
- [ ] Layout components test navigation rendering and active state
- [ ] Page-level smoke tests

**Difficulty:** Intermediate

---

## Issue #116 — E2E tests only cover landing page (1 test)

**Labels:** testing, frontend

**Summary:**
`e2e/home.spec.ts` — one test that checks "Astro Orbit" and "Get Started" text is visible. No authenticated flow, no navigation, no form interaction.

**Acceptance Criteria:**

- [ ] E2E test for authenticated dashboard rendering (with cookie injection)
- [ ] E2E test for navigation between pages
- [ ] E2E test for 404 page

**Difficulty:** Advanced

---

## Issue #117 — Empty `vitest.shims.d.ts` file

**Labels:** cleanup, frontend

**Summary:**
`vitest.shims.d.ts` contains zero characters. It serves no purpose.

**Acceptance Criteria:**

- [ ] Remove the empty file

**Difficulty:** Beginner

---

## Issue #118 — `src/data/mock/dashboard.ts` is never imported anywhere

**Labels:** cleanup, frontend

**Summary:**
`data/mock/dashboard.ts` exports `mockStats` and `mockActivity`. No file imports from `@/data/mock/`. Dead code.

**Acceptance Criteria:**

- [ ] Delete the file

**Difficulty:** Beginner

---

# 5. Accessibility

---

# 5. Frontend: Accessibility

---

## Issue #119 — Icon-only buttons lack `aria-label`

**Labels:** accessibility, frontend

**Summary:**
`top-navigation.tsx` — Search and Notification bell buttons render `<Search />` and `<Bell />` icons inside `<Button>` with no `aria-label`. Screen readers announce them as "button" with no context.

**Acceptance Criteria:**

- [ ] `aria-label="Search"` on search button
- [ ] `aria-label="Notifications"` on bell button
- [ ] `aria-label` on sidebar collapse button (dynamic based on state)

**Difficulty:** Beginner

---

## Issue #120 — No skip-to-content link for keyboard navigation

**Labels:** accessibility, frontend

**Summary:**
Dashboard layout has no skip-to-content link. Keyboard users must tab through sidebar (7 items), top navigation (4+ items), and user menu before reaching main content.

**Acceptance Criteria:**

- [ ] Add `<a href="#main-content">Skip to content</a>` as first focusable element
- [ ] `id="main-content"` on main content area
- [ ] Visually hidden until focused

**Difficulty:** Beginner

---

## Issue #121 — No `aria-current` on active navigation links

**Labels:** accessibility, frontend

**Summary:**
`sidebar.tsx` and `mobile-navigation.tsx` — active nav items have a visual indicator (different color/background) but no `aria-current="page"` attribute for screen readers.

**Acceptance Criteria:**

- [ ] Add `aria-current={isActive ? 'page' : undefined}` to active nav links

**Difficulty:** Beginner

---

## Issue #122 — Login page "or" divider missing `role="separator"`

**Labels:** accessibility, frontend

**Summary:**
`login/page.tsx` — the `<div>` separator between "Connect Wallet" and "Email Sign In" has no `role="separator"` or `aria-orientation`.

**Acceptance Criteria:**

- [ ] Add `role="separator"` and `aria-orientation="horizontal"` or `vertical`

**Difficulty:** Beginner

---

## Issue #123 — Root `<html>` missing `dir` attribute

**Labels:** accessibility, frontend

**Summary:**
`layout.tsx` — `<html lang="en" suppressHydrationWarning>` has no `dir` attribute. For left-to-right languages, `dir="ltr"` should be explicit.

**Acceptance Criteria:**

- [ ] Add `dir="ltr"` to root `<html>`

**Difficulty:** Beginner

---

## Issue #124 — Error page may expose sensitive information

**Labels:** accessibility, frontend, security

**Summary:**
`error.tsx:18` — renders `{error.message}` directly. In production, error messages could contain stack traces or SQL queries. Should show a generic message in production and detailed error in development.

**Acceptance Criteria:**

- [ ] Show generic "Something went wrong" in production
- [ ] Log full error details to console/analytics
- [ ] Include `error.digest` for error tracking correlation

**Difficulty:** Intermediate

---

# 6. Code Quality & Dead Code

---

# 6. Frontend: Code Quality & Dead Code

---

## Issue #125 — Landing page uses same icon for two different features

**Labels:** bug, frontend

**Summary:**
`page.tsx` — "Smart Contract Management" and "Enterprise-Grade Security" both use the `Shield` icon. Users may think these represent the same feature.

**Acceptance Criteria:**

- [ ] Use distinct icons for each feature card
- [ ] `FileCode` for contracts, `Shield` for security

**Difficulty:** Beginner

---

## Issue #126 — `Deployment` type fields are plain strings instead of union types

**Labels:** refactor, frontend

**Summary:**
`types/index.ts:73-74` — `Deployment.environment` and `status` are typed as `string`. Should be union types matching known values.

**Acceptance Criteria:**

- [ ] `type DeploymentStatus = 'pending' | 'building' | 'scanning' | 'deploying' | 'deployed' | 'failed' | 'rolled_back' | 'cancelled'`
- [ ] `type Environment = 'development' | 'staging' | 'production'`

**Difficulty:** Beginner

---

## Issue #127 — `ApiResponse` `success` field never checked

**Labels:** refactor, frontend

**Summary:**
`types/index.ts` — `ApiResponse<T>` has `success: boolean` field but no handler or service method ever checks it. If the API returns `{ success: false, error: {...} }`, the frontend treats it as successful.

**Acceptance Criteria:**

- [ ] Check `success` field before returning data
- [ ] Throw error with details on `success === false`

**Difficulty:** Intermediate

---

## Issue #128 — Design tokens defined but never used

**Labels:** cleanup, frontend

**Summary:**
`src/tokens/` exports `colors`, `spacing`, `radius`, `shadows`, `typography`. No component or page imports from `@/tokens`. All styling uses Tailwind utility classes directly. The tokens are vestigial.

**Acceptance Criteria:**

- [ ] Either remove the `tokens/` directory
- [ ] Or refactor components to use token imports for design system consistency

**Difficulty:** Beginner

---

## Issue #129 — `radius` field included in `colors.ts` — semantically incorrect

**Labels:** cleanup, frontend

**Summary:**
`tokens/colors.ts:31` — `colors.radius` is a border radius value in a file named `colors.ts`. Should be in `radius.ts`.

**Acceptance Criteria:**

- [ ] Move `radius` to `tokens/radius.ts`

**Difficulty:** Beginner

---

## Issue #130 — `API_ENDPOINTS.ANALYTICS.OVERVIEW` uses `/orgs` but most constants use `/organizations`

**Labels:** bug, frontend

**Summary:**
`constants/index.ts:70` — `OVERVIEW: (orgId) => /orgs/${orgId}/analytics/overview` uses `/orgs` while other constants use `/organizations`. Inconsistent path naming.

**Acceptance Criteria:**

- [ ] Use canonical `/organizations` for all constants

**Difficulty:** Beginner

---

## Issue #131 — `env.ts` lacks production-critical env vars

**Labels:** feature, frontend

**Summary:**
`env.ts:4-7` — only 3 variables defined: `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`. Missing `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY`, analytics/observability config.

**Acceptance Criteria:**

- [ ] Add observability env vars with optional Zod validation

**Difficulty:** Beginner

---

# 13. Contracts: Architecture & Design

---

# 7. Cross-Cutting Testing

---

## Issue #171 — Backend has zero integration or API tests

**Labels:** testing, backend

**Summary:**
`tests/integration/mod.rs`, `tests/api/mod.rs`, `tests/unit/mod.rs` are all doc-only. No integration test functions exist. The only tests are 22 inline unit tests in `auth/challenge.rs`, `auth/wallet.rs`, `permissions/role.rs`, `permissions/policy.rs`, and `config/tests.rs`.

**Acceptance Criteria:**

- [ ] Integration test for auth flow (challenge → login → refresh → logout)
- [ ] Integration test for org CRUD
- [ ] API contract tests for all implemented endpoints
- [ ] Repository tests with test database

**Difficulty:** Advanced

---

## Issue #172 — `tests/common/test_app.rs` won't compile due to wrong function signature

**Labels:** bug, backend, testing

**Summary:**
`test_app.rs:19-24` — `TestAppBuilder::build()` calls `router::build_router(config)` with one argument, but `build_router` requires TWO arguments (`config`, `state`). This will not compile. The test suite is completely non-functional.

**Acceptance Criteria:**

- [ ] Fix function signature to match `router::build_router`
- [ ] Verify `cargo test` compiles and runs

**Difficulty:** Intermediate

---

## Issue #173 — No E2E tests for authenticated flows in frontend

**Labels:** testing, frontend

**Summary:**
Single E2E test only covers landing page. No test verifies: middleware redirect, login flow, dashboard rendering, navigation between pages.

**Acceptance Criteria:**

- [ ] E2E test for authenticated dashboard (inject cookie)
- [ ] E2E test for middleware redirect when unauthenticated

**Difficulty:** Advanced

---

## Issue #174 — No property-based or fuzz tests for any component

**Labels:** testing

**Summary:**
`proptest` is in backend's dev-dependencies but never used. Contracts deal with numeric IDs, timestamps, and hash values that would benefit from property-based invariants. No fuzz testing exists.

**Acceptance Criteria:**

- [ ] Property-based test for deployment version monotonicity
- [ ] Property-based test for permission hierarchy consistency
- [ ] Property-based test for pagination param bounds

**Difficulty:** Advanced

---

## Issue #175 — No a11y tests or automated accessibility audit

**Labels:** testing, accessibility

**Summary:**
`@storybook/addon-a11y` is installed but no a11y stories exist. No `axe-core` integration in Playwright or Vitest.

**Acceptance Criteria:**

- [ ] Add `axe-playwright` as dev-dependency
- [ ] Add a11y test for landing page and dashboard page

**Difficulty:** Intermediate

---

## Issue #176 — No load or stress tests for backend or contracts

**Labels:** testing

**Summary:**
No benchmarks, load tests, or stress tests exist. No data on how the API performs under concurrent load, how the job queue handles backpressure, or how contracts handle high-throughput scenarios.

**Acceptance Criteria:**

- [ ] `k6` or `locust` test for top 5 API endpoints
- [ ] Contract stress test (max storage size, max event count)

**Difficulty:** Advanced

---

# 20. Developer Experience

---

# 8. Developer Experience

---

## Issue #177 — Frontend CI workflows may be empty or missing

**Labels:** devops, frontend

**Summary:**
`.github/workflows/` — CI/CD workflow files may exist but appear empty based on audit. No automated quality checks run on push/PR.

**Acceptance Criteria:**

- [ ] Verify `ci.yml` contains `typecheck`, `lint`, `test`, `build` jobs
- [ ] Verify `cd.yml` contains Docker build and push
- [ ] README badges reflect actual CI status

**Difficulty:** Beginner

---

## Issue #178 — No Rust/cargo caching in any CI workflow

**Labels:** devops

**Summary:**
Backend CI, contracts CI, and all CD/release workflows build from scratch with no cargo caching. Full build takes 15-30 minutes.

**Acceptance Criteria:**

- [ ] Add `Swatinem/rust-cache` action to all Rust CI workflows
- [ ] Verify cache hit reduces build time to under 5 minutes

**Difficulty:** Beginner

---

## Issue #179 — No Makefile, Justfile, or task runner for common commands

**Labels:** devops

**Summary:**
Backend and contracts have no task runner. Developers must remember exact commands: `cargo build --features default`, `cargo test --workspace`, `cargo clippy --all-targets --all-features`. The `scripts/` directory in contracts is empty.

**Acceptance Criteria:**

- [ ] Create Makefile with targets: `build`, `test`, `lint`, `check`, `clean`, `docker-build`
- [ ] Include WASM build shortcut for contracts

**Difficulty:** Beginner

---

## Issue #180 — `commitlint.config.mjs` uses `sentence-case` — incompatible with conventional commits

**Labels:** bug, devops

**Summary:**
`commitlint.config.mjs:5` — `'subject-case': [2, 'always', 'sentence-case']` — conventional commits typically use lowercase subjects (e.g., `feat: add user login`). This rule will cause CI failures for standard-format commits.

**Acceptance Criteria:**

- [ ] Change to `'lower-case'` or remove the rule

**Difficulty:** Beginner

---

## Issue #181 — Frontend ESLint missing React Hooks plugin rules

**Labels:** devops, frontend

**Summary:**
`eslint.config.mjs` — no `react-hooks/exhaustive-deps` rule. Missing dependency warnings in `useEffect`/`useMemo`/`useCallback` won't be caught. Combined with `--max-warnings 0`, this means code with missing deps can pass lint.

**Acceptance Criteria:**

- [ ] Add `eslint-plugin-react-hooks` rules
- [ ] Address any new warnings

**Difficulty:** Beginner

---

## Issue #182 — Frontend `tsconfig.json` doesn't catch unused variables

**Labels:** devops, frontend

**Summary:**
`tsconfig.json` — `strict: true` but no `noUnusedLocals` or `noUnusedParameters`. Dead code and unused params are not caught by `tsc --noEmit`.

**Acceptance Criteria:**

- [ ] Enable `noUnusedLocals` and `noUnusedParameters`
- [ ] Address any new errors

**Difficulty:** Intermediate

---

## Issue #183 — Storybook and e2e directories excluded from TypeScript checking

**Labels:** devops, frontend

**Summary:**
`tsconfig.json:41-42` — excludes `stories` and `e2e` directories. Type errors in story files and E2E tests go unnoticed.

**Acceptance Criteria:**

- [ ] Include stories and e2e in type-checking (they are small directories)

**Difficulty:** Beginner

---

## Issue #184 — `package.json` `check` script runs sequentially: typecheck → lint → test → build

**Labels:** devops, frontend

**Summary:**
`check` script takes 3x as long as necessary. These steps are independent and could run in parallel.

**Acceptance Criteria:**

- [ ] Use `concurrently` (or `npm-run-all`) to run steps in parallel

**Difficulty:** Beginner

---

## Issue #185 — No `.env.example` files for local development in backend/frontend

**Labels:** documentation

**Summary:**
Backend and frontend do not ship `.env.example` files. Contributors must guess or dig through config code to find required environment variables.

**Acceptance Criteria:**

- [ ] Create `.env.example` for backend with all config variables documented
- [ ] Create `.env.example` for frontend (one may exist, verify completeness)

**Difficulty:** Beginner

---

## Issue #186 — No ADR documents exist beyond template

**Labels:** documentation

**Summary:**
`docs/ADR/` contains a template and two ADRs (use-axum, use-sqlx) but many significant decisions are undocumented: why postgres over mysql, why event bus pattern, why push-based registry pattern, why separate trait/impl pattern.

**Acceptance Criteria:**

- [ ] Add ADRs for: event bus choice, registry architecture, service/repository pattern, deployment state machine design, wallet auth pattern

**Difficulty:** Intermediate

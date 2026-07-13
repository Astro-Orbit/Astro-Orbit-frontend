# Astro Orbit Frontend

Production-grade frontend for the Astro Orbit platform — a Stellar-native developer platform for building, securing, deploying, and managing Soroban smart contracts.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui, Base UI
- **State:** TanStack Query, Zustand, React Hook Form, Zod
- **HTTP:** Axios
- **Testing:** Vitest, Testing Library, Playwright
- **Tooling:** TypeScript (strict), ESLint, Prettier, Husky, Commitlint

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Run Vitest tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run storybook` | Start Storybook |
| `npm run check` | Run all quality gates |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
│   ├── ui/          # shadcn/ui primitives
│   ├── layouts/     # Layout components
│   └── auth/        # Auth components
├── providers/       # React context providers
├── services/        # API service layer
├── stores/          # Zustand stores
├── hooks/           # Custom hooks
├── lib/             # Utilities
├── tokens/          # Design tokens
├── types/           # TypeScript types
└── constants/       # App constants
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

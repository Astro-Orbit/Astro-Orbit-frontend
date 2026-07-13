# Contributing

## Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit with conventional commits (`feat:`, `fix:`, `docs:`)
4. Push and create a PR

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add wallet connection
fix: correct sidebar overflow
docs: update architecture docs
chore: upgrade dependencies
```

## Code Standards

- TypeScript strict mode — no `any` types
- ESLint + Prettier enforced via lint-staged
- Components follow shadcn conventions
- Tests required for new components
- All quality gates must pass before merge

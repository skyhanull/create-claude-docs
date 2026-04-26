# Development Conventions

## General Coding Rules
- Read related files before changing code.
- Keep modifications within the requested scope.
- Reuse existing types and patterns before adding new ones.
- Prefer explicit code over clever abstractions.
- Avoid broad cleanup mixed into functional work.

## Naming
- Follow existing project naming style.
- Use descriptive file and component names.
- Avoid vague utility buckets.

## Types And Contracts
- Avoid `any`.
- Prefer existing domain types over inline duplication.
- Do not weaken types just to satisfy a quick implementation.

## Components
- Route or entry components should remain thin.
- Feature components should own feature-specific rendering and interactions.
- Shared UI should remain generic.

## Styling
- Preserve the project’s established visual tone.
- Do not perform major restyling during logic-only tasks.
- Prefer existing tokens and primitives when available.

## Refactoring
- Small structural improvement is encouraged.
- Large opportunistic rewrites are discouraged.
- Improve transitional code incrementally.

## Documentation
- If architecture-sensitive behavior changes, update docs.
- If code and docs diverge, align docs as part of the work when practical.

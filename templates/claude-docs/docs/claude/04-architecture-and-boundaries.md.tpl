# Architecture And Boundaries

## Architectural Intent
`{{PROJECT_LABEL}}` should be organized so contributors can quickly answer:
- where new code belongs
- what each layer owns
- what is shared vs feature-specific
- how to evolve the codebase without destabilizing core flows

## Main Layers

### App Layer
Location:
- `{{APP_PATH}}/*`

Responsibilities:
- route entry
- screen composition
- request/response or server/client boundary decisions

Should not own:
- dense feature interaction logic
- duplicated feature contracts
- feature-specific workflow rules

### Feature Layer
Location:
- `src/features/*` or equivalent project feature folders

Responsibilities:
- domain UI
- interaction logic
- feature state
- feature contracts

### Shared UI Layer
Location:
- `{{UI_PRIMITIVES_PATH}}/*`

Responsibilities:
- generic reusable UI primitives
- low-level styling consistency

Should not own:
- domain-specific workflow behavior
- single-screen assumptions

### Shared Lib Layer
Location:
- `{{LIB_PATH}}/*`

Responsibilities:
- shared utilities
- service/client setup
- cross-feature helpers when truly shared

Should not become:
- a dumping ground for feature logic

## Boundary Rules
- product routing logic stays in the app layer
- feature logic stays in feature folders
- shared design primitives stay in shared UI
- cross-feature utilities stay in lib

## Transitional Policy
- do not force a full rewrite during a normal task
- do improve local structure when touching a messy area
- do preserve future-friendly boundaries

# App Context Guide

## Purpose
This guide applies when working in `{{APP_PATH}}/*`.
The app layer is the route and composition layer, not the main home for product logic.

## What App Layer Owns
- route entry points
- page-level composition
- metadata
- boundary decisions
- param loading

## What App Layer Should Avoid
- dense domain logic
- repeated feature state management
- duplicating domain types
- embedding large interactive behavior directly in route files

## Good Outcome Standard
A good app-layer change:
- keeps the route readable
- preserves routing clarity
- does not absorb feature complexity unnecessarily

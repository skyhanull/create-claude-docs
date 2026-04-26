# UI Context Guide

## Purpose
This guide applies when working in `{{UI_PRIMITIVES_PATH}}/*`.
This folder should stay a home for reusable primitives, not feature-specific widgets.

## What UI Primitives Own
- shared button/input/card-like building blocks
- low-level variant systems
- styling consistency
- composable presentational foundations

## What UI Primitives Should Avoid
- feature-specific business logic
- assumptions about one screen only
- embedding workflow behavior that belongs to a feature

## Good Outcome Standard
A good shared UI change:
- benefits multiple screens or preserves primitive consistency
- keeps component APIs understandable
- avoids coupling shared components to one feature

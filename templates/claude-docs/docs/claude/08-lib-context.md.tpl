# Lib Context Guide

## Purpose
This guide applies when working in `{{LIB_PATH}}/*`.
The lib layer should stay focused on shared utilities and external service boundaries.

## What Lib Owns
- shared helper functions
- service/client setup
- low-level reusable utilities

## What Lib Should Avoid
- feature-specific orchestration
- workflow logic that belongs in features
- dumping unrelated utilities into one file without cohesion

## Good Outcome Standard
A good lib-layer change:
- clarifies a shared concern
- reduces duplication without hiding domain meaning
- keeps feature logic inside the feature layer

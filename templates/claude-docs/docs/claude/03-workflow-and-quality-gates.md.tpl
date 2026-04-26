# Workflow And Quality Gates

## Default Workflow
1. Read the relevant files.
2. Confirm where the change belongs.
3. Make the smallest change that solves the task.
4. Verify the result with the project’s normal checks.
5. Update docs if the behavior or architecture changed.

## Quality Gates
- code compiles or typechecks when applicable
- lint remains healthy
- changed behavior is verified
- docs stay in sync

## Review Mindset
- prefer bug prevention over aesthetics
- call out risky behavior changes clearly
- mention missing tests or verification gaps honestly

## When To Pause
- when a change crosses layer boundaries unexpectedly
- when there are multiple plausible homes for new code
- when product behavior would change in a non-obvious way

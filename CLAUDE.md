# Prove Workflow - AI-Driven Development Workflow PoC

## Workflow Overview

This project demonstrates a structured AI-driven development workflow based on [5 Agent Skills](https://www.aihero.dev/5-agent-skills-i-use-every-day). The workflow chains 5 custom skills in sequence to go from idea to production-quality code.

### The Pipeline

```
/grill-me  ->  /write-a-prd  ->  /prd-to-issues  ->  /tdd  ->  /improve-codebase-architecture
```

1. **`/grill-me`** - Deep discovery. Get interviewed about your plan until every design decision is resolved.
2. **`/write-a-prd`** - Formalize the plan into a PRD (GitHub issue) + create a dedicated `prd/<slug>` branch.
3. **`/prd-to-issues`** - Break the PRD into vertical-slice GitHub issues targeting the PRD branch.
4. **`/tdd`** - Implement each issue using red-green-refactor TDD loops.
5. **`/improve-codebase-architecture`** - Post-implementation review for architectural improvements.

### Branch Strategy

Each PRD gets its own branch (`prd/<short-slug>`) branched from `main`. This enables:
- Multiple developers working on different PRDs in parallel
- Clean PR-per-PRD merges back to main
- Issues within a PRD reference their target branch

### Conventions

- PRDs are GitHub issues with the `prd` label
- Implementation issues reference their parent PRD
- All implementation work happens on the PRD's branch (or sub-branches off it)
- Use vertical slices (tracer bullets), not horizontal layers
- Tests verify behavior through public interfaces, not implementation details

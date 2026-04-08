# Multi-Agent Plan-Review Workflow

A plan-first, multi-agent workflow. One agent plans and reviews, another implements. A feedback loop between them ensures quality.

## The Pipeline

```
Describe -> Understand -> Research (optional) -> Plan (.md) -> Self-Review -> Handoff -> Review -> Feedback Loop -> PR & Merge
```

1. **Describe** - User describes the desired change.
2. **Understand** - Agent asks questions until the intent is fully clear.
3. **Research** (optional) - Search the web for best practices, golden standards, and how others solve it.
4. **Plan** - Create a `plans/<slug>.md` file documenting what to change and how.
5. **Self-Review** - Agent critiques the plan from the perspective of a cold agent with zero context.
6. **Handoff** - User gives the plan to a separate implementation agent (e.g. Codex).
7. **Review** - Original agent reviews the implementation for correctness and quality.
8. **Feedback Loop** - Iterate between implementation and review until both sides are satisfied.
9. **PR & Merge** - Push, open a PR with a short description, merge to `main`.

## Branch Strategy

- Branch off `main` once the plan `.md` is finalized
- Branch naming: `feature/<short-slug>`
- All implementation happens on the feature branch
- Merge via PR back to `main`

## Conventions

- Plan files live in `plans/` and stay in the repo
- Plan files are detailed enough for an agent with zero project context to implement from
- PRs include a short summary of what was done
- One feature branch per change

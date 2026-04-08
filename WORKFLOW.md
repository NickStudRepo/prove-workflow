# Multi-Agent Plan-Review Workflow — Summary

**Core idea:** Split planning/review and implementation across different agents. Iterate until both are satisfied.

## Quick Reference

| Step | Who | What |
|------|-----|------|
| 1. Describe | You | Tell the planning agent what you want changed |
| 2. Understand | Planning agent | Asks questions until intent is clear |
| 3. Research | Planning agent | (Optional) Checks best practices on the web |
| 4. Plan | Planning agent | Creates `plans/<slug>.md` |
| 5. Self-review | Planning agent | Checks if plan is clear for a cold agent |
| 6. Implement | Implementation agent | Builds the change from the plan |
| 7. Review | Planning agent | Reviews the implementation |
| 8. Iterate | Both | Feedback loop until satisfied |
| 9. Ship | You | Push, PR, merge |

## Git: `feature/<short-slug>` branch per change, merge via PR to `main`

## Plans: stored in `plans/`, stay in the repo

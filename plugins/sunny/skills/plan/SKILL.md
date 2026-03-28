---
name: sunny:plan
description: Create structured engineering plans and save them as markdown files in the repo. Infers whether work is a Story (≤2 weeks, one engineer) or Epic (larger), writes concise phased plans with approach, files affected, and verification steps, and can generate JIRA user stories from plans. Use this skill when someone says "plan X", "let's plan out Y", "I need to scope Z", "write a plan for", "create a ticket for", or describes engineering work that needs to be structured before starting. Also trigger when someone asks to break down a feature, create a user story, or figure out how to approach a piece of work.
---

<!--
context: fork
agent: Explore
allowed-tools: Read, Write, Bash, Grep, Glob
-->

Turn a description of work into a structured, actionable plan — scoped right, written lean, saved to the repo.

## Steps

1. Read the user's description of the work.
2. **Research the codebase first.** Before sizing or planning, explore relevant existing code:
   - Use `Glob` to find files related to the feature area (controllers, services, models, tests)
   - Use `Grep` to find existing patterns (e.g., how other endpoints are structured, how dates are handled, how auth is wired)
   - Use `Read` to understand the shape of relevant files
   - This is what makes the plan accurate — files affected, approach, and phasing should reflect the actual codebase, not generic assumptions
3. **Infer the scope** — if one engineer could complete it in ~2 weeks or less, it's a Story. If it's bigger (multiple stories, multiple weeks, cross-cutting), it's an Epic. State your sizing and the reasoning in one sentence, then ask: "Does that sizing sound right?"
4. Once confirmed, **draft the plan** using the format below.
5. Show the full draft. Ask: "Does this look right? I'll write it to `/planning/` once you confirm."
6. On confirmation, check if `/planning/` exists (`Bash: ls planning/ 2>/dev/null`), create it if not (`mkdir planning`), then write the file.
7. Offer to generate JIRA user story format: "Want me to generate the user story format for JIRA?"

## Plan Format

Keep plans concise — bullets, not paragraphs. The goal is enough detail to orient anyone picking this up, not a spec document.

```markdown
# [Short title]

**Type:** Story | Epic
**JIRA:** [key if known, else TBD]

## Goal
[One sentence. What does this accomplish for the user or system?]

## Approach
- [General technical approach, bulleted]
- [Not implementation details — the shape of the solution]

## Files / Areas Affected
- [List files, modules, or layers likely touched]

## Phases
[For trivial work, a single phase is fine. For anything non-trivial, break it into phases.
Each phase should be independently reviewable and committable.]

### Phase 1: [Name]
- [What gets built/changed]
- [Verify: how you know this phase is done]

### Phase 2: [Name]
- ...

## Verification
[How you confirm the whole thing is done — framed as end-user or API-consumer observable behavior.
"A user can log in with Google" not "the OAuth callback returns 200".]

## Definition of Done
- Code merged to [main | dev — use main for personal projects, dev for team projects]
- Tested in test/staging environment
```

**For Epics**, add a Stories section after the Approach:

```markdown
## Stories
- As a [role], I want to be able to [action] so that [outcome].
- As a [role], I want to be able to...
[One line per expected story. These become the child tickets.]
```

## File Naming

Save to `planning/` in the current repo root.

- **JIRA key known:** `planning/ENG-123-short-description.md`
- **No JIRA key yet:** `planning/260323-short-description.md` (YYMMDD format)

Use lowercase kebab-case for the short description. The user can rename to the JIRA key'd version when a ticket exists.

## JIRA Ticket Format

When the user asks to generate a JIRA ticket (or says "make this a ticket"):

```
**User Story**
As a [role], I want to be able to [action] so that [outcome].

**Acceptance Criteria**
- [End-user visible behavior that confirms the story is done]
- [Edge case: what happens when X]
- [Edge case: what the user sees if Y fails]
```

Keep acceptance criteria framed around observable user behavior — not database states, HTTP codes, or test function names. A QA engineer should be able to verify these by using the feature.

## Phased Work Reminder

For multi-phase plans: after presenting each phase's output during implementation, pause and ask the user to review before moving to the next phase. Don't barrel through all phases at once — each phase checkpoint is intentional.

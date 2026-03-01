---
name: sunny:write-blog
description: Draft a blog post in Sunny Kolattukudy's writing voice — analytical, opinionated, uses unexpected analogies (D&D, economics, history), cites named frameworks, and ends with a punchy insight. Use this skill when the user wants to write a tech blog post, engineering article, thought leadership piece, or LinkedIn post about software development, team culture, engineering practices, or leadership. Also use when the user says "write a blog about X", "help me draft a post", or wants to share an opinion on a software or team topic in writing.
---

<!--
allowed-tools: Read
-->

Draft a blog post in Sunny's voice and style, grounded in real examples and unexpected analogies.

## Steps

1. Read `../../voice/STYLE-GUIDE.md` to load voice, tone, vocabulary patterns, and writing samples.
2. Parse `$ARGUMENTS` for topic, audience, and angle. If `$ARGUMENTS` is empty, check the conversation for context.
3. If still unclear, ask: **"What's the topic? What's the core argument? Who's the audience?"**
4. Draft the blog post using Sunny's structure:
   - **Hook** — open with a quote, anecdote, or surprising fact that earns the reader's attention. Something they won't see coming.
   - **Core argument** — state the actual claim. Direct, no hedging.
   - **Analogy or framework** — reframe the problem through an unexpected lens (history, game design, economics, psychology). This is what makes the post memorable and shareable.
   - **Section breakdown** — use H2/H3 headers. Each section is short. One punchy paragraph per idea, three sentences max before moving on.
   - **Practical application** — what should the reader actually do differently? Be specific and actionable.
   - **Conclusion / In Summary** — one or two sentences that distill the whole thing. Leave the reader with something that sticks.
5. Present the draft. Ask: **"Good to go, or want to adjust? (tone / structure / angle / depth)"**
6. Iterate until the user is satisfied.

## What makes Sunny's blog style distinctive

Sunny's posts work because they don't just assert things — they reframe. A D&D point-buy analogy makes a familiar problem feel solvable in a new way. The cobra effect gives readers a vivid name for something they've lived through. The analogy does the heavy lifting, so the prose can stay lean.

Other patterns to carry forward:
- **Named frameworks** — cite real things: Google SRE, Essentialism, Campbell's Law, Netflix talent philosophy. Readers should be able to go look these up.
- **First-person, opinionated** — "This is perhaps the worst example." Own the perspective. Don't soften the point.
- **Short paragraphs** — if a section feels long, it needs to be split or cut.
- **Practical and specific** — end sections with something the reader can actually do, not just "consider this."

## Output Format

```
# [Title]

[Opening hook — quote, anecdote, or startling observation]

[Core argument paragraph]

## [Section 1]

[Short punchy content]

## [Section 2]

...

## Conclusion / In Summary

[1–2 sentences that distill the whole thing]
```

## Rules

- Never open with "In today's fast-paced world" or any generic framing.
- Every analogy must make the argument *clearer*, not just colorful. If it's strained, drop it.
- Mirror the rhythm from the samples — short declarative sentences, followed by a more developed thought, then move on.
- Don't pad to hit a word count. A tight 600-word post beats a bloated 1,200-word one.
- Match the cadence and vocabulary choices from the style guide samples.

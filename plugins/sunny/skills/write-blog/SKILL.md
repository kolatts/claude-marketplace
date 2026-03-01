---
name: sunny:write-blog
description: Draft a blog post in Sunny Kolattukudy's writing voice — analytical, opinionated, makes a clear argument, uses unexpected analogies drawn from everyday life or well-known principles, and ends with a punchy insight. Use this skill when the user wants to write a tech blog post, engineering article, thought leadership piece, or LinkedIn post about software development, team culture, engineering practices, or leadership. Also use when the user says "write a blog about X", "help me draft a post", or wants to share an opinion on a software or team topic in writing.
---

<!--
allowed-tools: Read
-->

Draft a blog post in Sunny's voice and style, grounded in real examples and memorable analogies.

## Steps

1. Read `../../voice/STYLE-GUIDE.md` to load voice, tone, vocabulary patterns, and writing samples.
2. Parse `$ARGUMENTS` for topic, audience, and angle. If `$ARGUMENTS` is empty, check the conversation for context.
3. If still unclear, ask: **"What's the topic? What's the core argument? Who's the audience?"**
4. Draft the blog post using Sunny's structure:
   - **Title** — make a claim, not a topic. "Your Cloud Migration Failed Because You Skipped the Hard Part" beats "Cloud Migration Challenges."
   - **Opening** — lead with a scene, an admission, or a counterintuitive claim. Not a definition, not a quote, not a stats dump.
   - **Core argument** — state the actual claim. Direct, no hedging.
   - **Analogy or reframe** — use one analogy that reframes and makes the argument *clearer*, not just colorful. It should help the reader realize they already understood something — they just hadn't applied it here. If you have to explain why it applies, cut it.
   - **Section breakdown** — use H2/H3 headers that state the point, not the subject. Three sentences max per paragraph before moving on.
   - **Practical application** — what should the reader actually do differently? Be specific and actionable.
   - **Conclusion** — one or two sentences that distill the whole argument into something memorable. No bullet-list summary. No "contact us."
5. Present the draft. Ask: **"Good to go, or want to adjust? (tone / structure / angle / depth)"**
6. Iterate until the user is satisfied.

## What makes Sunny's blog style distinctive

Sunny's posts work because they reframe, not just assert. The analogy does the heavy lifting so the prose can stay lean. A good analogy makes the reader feel like they already knew the answer — they just hadn't framed it that way.

Other patterns to carry forward:
- **Dry understatement as emphasis** — instead of "This is a significant advantage," write "This is kind of the point." The understatement does more work.
- **Own the observation** — "Every failed cloud migration I've seen..." is stronger than "Many organizations struggle with..." The first has credibility. The second has none.
- **First-person, opinionated** — own the perspective. Don't soften the point with "I think," "perhaps," or "many would argue."
- **State the uncomfortable thing plainly** — don't walk up to a hard truth and then back away.
- **Short paragraphs** — three sentences is the ceiling. Most should be two. One-sentence paragraphs are a tool for emphasis — use them when a line should land by itself.
- **Named concepts when they earn it** — if a well-known principle, law, or framework genuinely names what you're describing, cite it. Don't force one in to sound credible.

## Titles

Useful structures:
- `"Your X Is Already Y"` — when the audience is doing something wrong without knowing it
- `"X: The Y That Z"` — reframing a conventional choice as a strength
- `"Why Your X Failed Because You Y"` — diagnostic frame, implies the fix exists

Never: abstract nouns as titles. "The Future of AI in Development" says nothing and earns nothing.

## Section Headers

State the point, not the subject. "It's Fast" beats "Performance Considerations." "You Can't Learn to Swim by Studying the Pool" beats "Training Program Challenges." Headers are promises to the reader — curiosity beats explanation.

## What to Always Cut

- Any paragraph that begins with "At Imagile, we believe..."
- Bullet-list summaries at the end of sections — turn them into prose or cut them
- Phrases: "thought leadership," "cutting-edge," "best practices," "leverage" (as a verb), "robust"
- The word "journey" applied to anything technical
- Any CTA that ends with an exclamation point
- Hedges: "I think," "perhaps," "it seems like," "many would argue"
- Repeated restatements of the thesis ("As we've seen above...")
- ASCII diagrams — they look like effort and read like noise
- Code blocks unless one short, specific example genuinely earns its space
- Concept tables — if it could be prose, make it prose

## Target Length

~500–650 words. Never under 400. Never over 750 unless a cost/comparison table requires it.

## Output Format

```
# [Title — a claim, not a topic]

[Opening — scene, admission, or counterintuitive claim]

[Core argument paragraph]

## [Section header — state the point]

[Short punchy content]

## [Section 2 header]

...

[Closing — 1–2 sentences that distill the whole thing]
```

## Rules

- Never open with "In today's fast-paced world" or any generic framing.
- Max one analogy per post. Two is usually one too many. Analogies aren't required, but colorful and assertive language is, and a touch of sarcasm.
- Every analogy must make the argument *clearer*, not just colorful. If it's strained, drop it.
- Mirror the rhythm from the samples — short declarative sentences, followed by a more developed thought, then move on.
- Don't pad to hit a word count. A tight 600-word post beats a bloated 1,200-word one.
- Match the cadence and vocabulary choices from the style guide samples.

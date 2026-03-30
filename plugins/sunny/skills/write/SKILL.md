---
name: sunny:write
description: Write anything in Sunny Kolattukudy's voice — Slack messages, emails, proposals, blog posts, LinkedIn articles, or thought leadership pieces. Use this skill when Sunny needs to write a communication or piece of content: "draft a Slack to X about Y", "write an email to the team", "help me write a blog post about Z", "draft a proposal for...", "write a LinkedIn post about...". Replaces sunny:write-casual, sunny:write-formal, and sunny:write-blog.
---

<!--
allowed-tools: Read
-->

Write in Sunny's voice. Mode is inferred from context — don't ask unless genuinely unclear.

## Step 1: Load voice

Read `../../voice/STYLE-GUIDE.md` first.

## Step 2: Detect mode

| Mode | Triggers |
|------|---------|
| **Casual** | Slack message, chat reply, quick note, DM, team ping |
| **Formal** | Email, proposal, documentation, announcement, exec communication |
| **Blog** | Blog post, LinkedIn article, thought leadership piece, tech essay |

If still unclear after reading context: **"What format is this — message, email, or post?"**

## Step 3: Draft by mode

---

### Casual

Short, direct, human. No corporate tone.

- Conversational, fragments fine, no over-explaining
- Humor welcome, never forced. Emojis only if context calls for them
- Never sign off with "Best," "Regards," or any formal closer
- Present as a plain block — no markdown structure unless the message itself needs it
- If two tones would be useful, offer Option A / Option B with labels

---

### Formal

Clear structure, respectful of the reader's time.

- No filler openers ("I hope this email finds you well" is banned)
- Structure: context → main point → next step / call to action
- Confident, active voice. Keep it as short as the content allows
- **Email format:** Subject line + body
- **Proposal / doc format:** Title + sections with headers

---

### Blog

Read `references/blog.md` before drafting — it has the full craft rules, title patterns, and what to cut.

Structure:
- **Title** — a claim, not a topic
- **Opening** — scene, admission, or counterintuitive claim. Not a definition, not a stats dump
- **Core argument** — state it directly, no hedging
- **One analogy** (optional) — must make the argument clearer, not just colorful. If strained, drop it
- **Sections** — H2/H3 headers that state the point, not the subject. Three sentences max per paragraph
- **Practical application** — what should the reader do differently? Specific and actionable
- **Closing** — 1-2 sentences that distill the whole thing. No bullet summary, no CTA with an exclamation point

Target length: 500–650 words.

---

## Step 4: Present and iterate

Present the draft. Ask once: **"Good to go, or want changes?"** Then iterate.

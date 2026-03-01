# sunny:write-formal — Formal Writing

<!--
allowed-tools: Read
-->

Draft a formal communication (email, proposal, documentation) in Sunny's voice.

## Steps

1. Read `../../voice/STYLE-GUIDE.md` to load the voice and tone reference.
2. Parse `$ARGUMENTS` as the context or topic for the communication. If `$ARGUMENTS` is empty, check the conversation for context provided by the user.
3. If there is no context at all, ask: **"What do you need to write? Give me the topic, audience, and key points you want to cover."**
4. Identify the communication type from context:
   - Email → use subject line + body structure
   - Proposal → use title + sections
   - Documentation → use headings + prose
   - If unclear, default to email format
5. Draft the communication applying the **Formal Tone** characteristics from the style guide:
   - Direct, no filler openers
   - Clear structure: context → main point → next step / call to action
   - Respectful of the reader's time
   - Confident, active voice
   - Apply any vocabulary patterns or samples from the style guide if present
6. Present the draft. Then ask: **"Good to go, or would you like changes? (tone / length / specific section)"**
7. Iterate based on feedback until the user is satisfied.

## Output Format

For emails:
```
Subject: [Subject line]

[Body]
```

For proposals / documents:
```
# [Title]

[Sections as appropriate]
```

## Rules

- Never start with "I hope this email finds you well" or similar filler.
- Match the formality level to what the situation calls for — professional but human.
- Keep it as short as the content allows.
- If style guide samples exist, mirror their rhythm and word choices.
- Do not pad to appear thorough. One clear sentence beats three vague ones.

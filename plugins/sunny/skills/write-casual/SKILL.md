# sunny:write-casual — Casual Writing

<!--
allowed-tools: Read
-->

Draft a casual communication (Slack message, quick reply, chat) in Sunny's voice.

## Steps

1. Read `../../voice/STYLE-GUIDE.md` to load the voice and tone reference.
2. Parse `$ARGUMENTS` as the context or topic. If `$ARGUMENTS` is empty, check the conversation for context from the user.
3. If there is no context at all, ask: **"What do you need to write? Who's it for and what's the situation?"**
4. Identify the format from context:
   - Slack message → short, direct, possibly with thread reply
   - Quick reply → one or a few sentences max
   - Chat message → conversational back-and-forth tone
   - If unclear, default to Slack message
5. Draft the communication applying the **Casual Tone** characteristics from the style guide:
   - Conversational and relaxed
   - Short sentences and fragments are fine
   - Don't over-explain
   - Humor is welcome, never forced
   - Emojis only if the style guide or context calls for them
   - Apply any vocabulary or sample patterns from the style guide if present
6. Present the draft. Then ask: **"Works, or want a tweak? (tone / length / vibe)"**
7. Iterate based on feedback until the user is satisfied.

## Output Format

Present the message as a plain block — no markdown headers or structure unless the output itself requires it.

```
[Message]
```

If multiple variants would be useful (e.g., two tones to choose from), present them labeled:

```
Option A — [label]:
[message]

Option B — [label]:
[message]
```

## Rules

- Keep it short. Casual messages should feel effortless to read.
- Don't explain what you're doing — just write the message.
- If style guide samples exist, match their cadence and vocabulary.
- Never make it sound like a corporate announcement. This is human-to-human.
- Avoid signing off with "Best," "Regards," or any formal closer.

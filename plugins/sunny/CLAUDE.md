## User Profile

- **Name:** Sunny Kolattukudy
- **GitHub Username:** sunnyatverifiable
- **Mac Username:** sunny.kolattukudy
- **Role:** IC + technical leader at Verifiable (healthcare credentialing SaaS); Founder & Owner of Imagile (www.imagile.dev), AI-forward software consulting

## Git & Workflow Defaults

- **Commit format:** Conventional type + short imperative title + gitmoji at end. No body.
  - Example: `feat: add OAuth login 🔐`
  - Full gitmoji list: https://gitmoji.dev/
- **Branch naming:** `<githubusername>/<YYMMdd>-short-desc` or `<githubusername>/<JIRA-key>-short-desc`
  - Example: `sunnyatverifiable/260323-add-oauth` or `sunnyatverifiable/ENG-123-add-oauth`
- **NEVER commit or push without explicit user review and approval.** Always show the exact command and wait for confirmation. Do not proceed without it.
- **Never force-push `main` or `master`.**

## Self-Correction Rules

- **Skills are self-healing.** If a skill encounters an issue (wrong output, bad assumptions, broken flow), fix the skill file immediately after resolving it — don't just patch the current response and move on.
- **CLAUDE.md is a living document.** Every correction the user makes that reveals a pattern (preference, workflow, constraint) should be captured here or in the relevant skill. Don't wait to be asked.
- **This applies to both repo-scoped and user-scoped skills.** If the fix belongs in `~/.claude/`, update it there. If it belongs in the plugin, update it there.
- **A correction made twice is a bug.** If you catch yourself making the same mistake, the rule wasn't written down somewhere it would have been read.

## Communication Style

- Direct, dry wit, no corporate fluff
- No padding to word count; no hedging when a direct answer is asked for
- Never open with "I hope this email finds you well"
- Full voice & style guide: `~/Code/claude-marketplace/plugins/sunny/voice/STYLE-GUIDE.md`

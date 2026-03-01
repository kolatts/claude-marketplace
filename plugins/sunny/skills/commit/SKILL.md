# sunny:commit — Smart Conventional Commit

<!--
allowed-tools: Bash, Read
disable-model-invocation: true
-->

Analyze the current git changes and generate a conventional commit message, then ask for confirmation before committing.

## Steps

1. Run `git status` to see what files are changed, staged, or untracked.
2. Run `git diff --staged` to see staged changes. If nothing is staged, run `git diff` to see unstaged changes and inform the user.
3. Analyze the diff to understand what changed and why.
4. Choose the appropriate conventional commit type:
   - `feat` — new feature or capability
   - `fix` — bug fix
   - `refactor` — restructuring without behavior change
   - `docs` — documentation only
   - `chore` — tooling, config, dependencies
   - `test` — adding or updating tests
   - `style` — formatting, whitespace
   - `perf` — performance improvement
5. Draft a commit message following this format:
   ```
   <type>(<optional scope>): <short imperative summary>

   <optional body — what and why, not how>
   ```
   - Subject line: 72 characters max, imperative mood ("Add X" not "Added X")
   - Body: only include if the diff warrants explanation
6. Present the commit message to the user and ask: **"Commit with this message? (yes / edit / cancel)"**
7. If yes: run `git commit -m "<message>"` (use heredoc for multi-line).
8. If edit: ask the user for their preferred message, then commit with it.
9. If cancel: stop without committing.

## Rules

- Never commit without user confirmation.
- Never use `git add -A` or `git add .` — only commit what is already staged.
- If nothing is staged and the user hasn't run `git add`, inform them and stop.
- Do not push. Committing only.

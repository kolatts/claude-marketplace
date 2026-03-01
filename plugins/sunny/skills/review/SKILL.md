# sunny:review — Code Review

<!--
context: fork
agent: Explore
allowed-tools: Bash, Read, Grep, Glob
-->

Review the current git changes for bugs, security issues, and code quality. Output a structured review with severity levels.

## Steps

1. Run `git diff --staged` to get staged changes. If empty, run `git diff` for unstaged changes.
2. Identify all changed files from the diff output.
3. For each changed file, read the full file for context (not just the diff).
4. Analyze the changes across these dimensions:

   **Security**
   - Injection vulnerabilities (SQL, command, XSS)
   - Hard-coded secrets or credentials
   - Unsafe deserialization or eval usage
   - Missing input validation at system boundaries

   **Correctness**
   - Off-by-one errors, null/undefined access
   - Logic errors or incorrect conditions
   - Edge cases not handled
   - Async/await misuse, race conditions

   **Code Quality**
   - Unnecessary complexity or duplication
   - Functions doing too many things
   - Naming that doesn't match behavior
   - Dead code

   **Consistency**
   - Does the code follow existing project patterns?
   - Naming conventions, file structure

5. Format findings using this structure:

```
## Code Review

### Critical
> Must fix before merging — bugs, security issues, data loss risk

- **[file:line]** Description of issue and why it matters.

### Warning
> Should fix — likely causes problems or poor maintainability

- **[file:line]** Description of issue.

### Suggestion
> Optional improvements — style, readability, or minor quality

- **[file:line]** Description of suggestion.

### Summary
One paragraph summary of overall change quality and any cross-cutting concerns.
```

6. If no issues are found in a category, omit that section.
7. If the diff is empty or there are no changed files, say so and stop.

## Rules

- Be specific — always include file name and line number.
- Be constructive — explain why something is a problem.
- Do not flag stylistic preferences as warnings. Keep suggestions separate.
- Do not suggest refactors outside the scope of the changed code.

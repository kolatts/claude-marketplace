## Plugin Development Rules

- **Always bump the plugin version** (`plugins/<name>/.claude-plugin/plugin.json`) when making any change to a plugin. Bump once per commit — not once per file changed. If multiple files change before a commit, a single version bump covers all of them.

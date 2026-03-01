#!/usr/bin/env node
// Claude PreToolUse hook: bumps patch version when a git commit is about to run
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(raw);
    const command = data.tool_input?.command || '';

    // Only act on git commit commands
    if (!/git\s+commit/.test(command)) process.exit(0);

    const cwd = data.cwd || process.cwd();

    // Find which plugins have staged changes
    const staged = execSync('git diff --cached --name-only', { cwd }).toString().trim();
    if (!staged) process.exit(0);

    const pluginNames = new Set();
    for (const file of staged.split('\n')) {
      const match = file.match(/^plugins\/([^/]+)\//);
      if (match) pluginNames.add(match[1]);
    }

    for (const pluginName of pluginNames) {
      const pluginJsonPath = path.join(cwd, 'plugins', pluginName, '.claude-plugin', 'plugin.json');
      if (!fs.existsSync(pluginJsonPath)) continue;

      const json = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
      const [major, minor, patch] = json.version.split('.').map(Number);
      json.version = `${major}.${minor}.${patch + 1}`;

      fs.writeFileSync(pluginJsonPath, JSON.stringify(json, null, 2) + '\n');
      execSync(`git add "${pluginJsonPath}"`, { cwd });
      process.stderr.write(`Bumped ${pluginName} version to ${json.version}\n`);
    }

    process.exit(0);
  } catch (e) {
    process.stderr.write(`bump-plugin-version hook error: ${e.message}\n`);
    process.exit(0);
  }
});

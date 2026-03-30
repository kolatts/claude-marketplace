# kolatts/claude-marketplace

Personal Claude Code plugin marketplace — a curated collection of plugins for developer workflow and communication.

## Installation

```bash
/plugin marketplace add kolatts/claude-marketplace
```

## Plugins

### sunny

A personal developer workflow toolkit. Skills that cover commits, code review, project scaffolding, and writing in your voice.

```bash
/plugin install sunny@kolatts-marketplace
```

#### Skills

| Skill | Command | Description |
|-------|---------|-------------|
| Smart Commit | `/sunny:commit` | Analyze changes and generate a conventional commit message |
| Code Review | `/sunny:code-review` | Review code with .NET/Blazor patterns and Sunny's voice |
| Scaffold | `/sunny:scaffold <type>` | Scaffold a new project (react, node-ts, dotnet, python) |
| Formal Writing | `/sunny:write-formal <context>` | Draft emails, proposals, and documentation |
| Casual Writing | `/sunny:write-casual <context>` | Draft Slack messages, quick replies, and chat |
| Blog Writing | `/sunny:write-blog` | Draft blog posts and long-form technical writing |
| Identity | `/sunny:identity` | Write personal bios, speaker profiles, and LinkedIn About sections |
| Planning | `/sunny:plan` | Draft Stories and Epics with JIRA-ready structure |
| Mentoring | `/sunny:mentoring` | Prep 1:1s and growth conversations |
| Hiring | `/sunny:hiring` | Pre-screen candidates and structure hiring debriefs |
| Architecture | `/sunny:architecture` | Design and review systems against Sunny's .NET/Azure architecture principles |
| Eng Philosophy | `/sunny:eng-philosophy` | Apply engineering philosophy frameworks to team and culture questions |

## Customization

The `sunny` plugin ships with a voice style guide at `plugins/sunny/voice/STYLE-GUIDE.md`. Editing that file with your own writing samples makes the writing skills sound more like you over time.

## License

MIT

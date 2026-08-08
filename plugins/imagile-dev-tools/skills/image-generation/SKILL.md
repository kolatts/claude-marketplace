---
name: imagile-dev-tools:image-generation
description: Generate or edit images from a text prompt using the OpenAI Images API (gpt-image-2). Use when someone says generate an image, create an image, make a picture, AI image, text to image, draw me, render an illustration, generate a logo/icon/hero image/mockup/placeholder art, image from prompt, DALL-E, gpt-image, or asks to edit, inpaint, or restyle an existing image with a prompt. Also triggers for transparent-background asset generation and batch variations of a prompt.
---

<!--
allowed-tools: Bash, Read, Glob, AskUserQuestion
-->

Generate images from text prompts (and edit existing ones) through the OpenAI Images API. The bundled script is stdlib-only Python — no SDK, no `pip install`.

## API key

Resolution order, handled by the script:

1. `--api-key-stdin` — key piped on stdin
2. `$OPENAI_API_KEY`
3. `$IMAGILE_OPENAI_API_KEY`

**Just run the script first.** If no key is available it exits with code `2` and prints a message — that exit code specifically means "ask the user", not "the request failed". Only then ask the user for their key, using `AskUserQuestion` or a plain question.

When the user gives you a key, pipe it via stdin so it never lands in shell history or a process listing:

```bash
printf '%s' "$USER_PROVIDED_KEY" | uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" "a red barn at golden hour" --api-key-stdin
```

Never write the key into a file in the repo, never echo it back, and never inline it as `OPENAI_API_KEY=sk-... command`. If the user wants to stop being asked every session, point them at setting it permanently:

- **Windows (PowerShell, persists across sessions):** `[Environment]::SetEnvironmentVariable('OPENAI_API_KEY','sk-...','User')` — tell them to run it themselves; restart the terminal afterward.
- **macOS/Linux:** add `export OPENAI_API_KEY=sk-...` to `~/.zshrc` or `~/.bashrc`.

## Prerequisites

- **`uv`** — verify with `uv --version`. If missing: https://docs.astral.sh/uv/getting-started/installation/ (or `winget install astral-sh.uv` on Windows). The script has zero dependencies, so plain `python3 script.py ...` works too if `uv` isn't around.
- The `gpt-image-*` models require **Organization Verification** in the OpenAI console. A `403` from the API almost always means that, not a bad key.

## Where things live

Every project keeps its image work under `.claude/image-generation/`:

```
.claude/image-generation/
├── style.md                          # palette + design choices, shared by all runs
├── 260724-rocket-icon/
│   ├── prompt.md                     # exact prompt + params used
│   └── rocket-icon.png
└── 260724-hero-banner/
    ├── prompt.md
    ├── hero-banner-1.png
    └── hero-banner-2.png
```

The script does this by default — one folder per run, named `YYMMDD-short-prompt-desc`, with `prompt.md` and the images inside. Don't pass `-o` unless the user wants the image somewhere specific (a real assets folder, a docs directory); the run folder is the working record, not the delivery location. When they do want it delivered elsewhere, generate into the run folder first and then copy the chosen image out.

`prompt.md` is written with YAML frontmatter (model, size, quality, style file, outputs) followed by the exact prompt text. Re-run any past image with `--prompt-file .claude/image-generation/260724-rocket-icon/prompt.md` — frontmatter is stripped automatically and the style isn't double-applied. A folder name that already exists gets a `-2` suffix rather than overwriting.

### style.md

`.claude/image-generation/style.md` holds the palette and design choices — hex **and** RGB for each color, illustration style, composition rules, and what to avoid. **Its contents are appended verbatim to every prompt**, so it must read as instructions to an image model, not as notes to a human.

- The script picks it up automatically when it exists and prints `Style applied from ...`.
- Pass `--no-style` for images that shouldn't follow brand rules (photographs, realistic scenes, one-off illustrations).
- If the file doesn't exist and the user wants brand-consistent images, offer to create one from the template at `${CLAUDE_PLUGIN_ROOT}/skills/image-generation/references/style-template.md`. Read it, then fill in their actual colors — don't copy the placeholder palette in as if it were theirs.
- If they mention brand colors in conversation and there's no `style.md`, that's a good moment to suggest writing one.
- Read `style.md` before writing a prompt anyway: knowing the palette helps you avoid asking for things it forbids.

## Usage

The script lives at `${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py`.

**Generate:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" "a red barn at golden hour, film photography"
```

That writes `.claude/image-generation/260724-a-red-barn-at-golden-hour/` containing `prompt.md` and the PNG.

**Name the run folder yourself, and set size and quality:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" "flat vector icon of a rocket" --slug rocket-icon -s 1024x1024 -q high --background transparent
```

**Re-run a past prompt exactly:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" --prompt-file .claude/image-generation/260724-rocket-icon/prompt.md --slug rocket-icon
```

**Several variations at once:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" "hero banner, abstract gradient mesh" --slug hero-banner -n 4 -s 1536x1024 -q low
```

**Edit an existing image (optionally masked):**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/image-generation/scripts/generate_image.py" "replace the sky with storm clouds" --edit photo.png --mask sky-mask.png -o photo-edited.png
```

Flags:

| Flag | Notes |
|------|-------|
| `-o, --output` | File path or directory. Default is the run folder `.claude/image-generation/YYMMDD-<slug>/` |
| `--slug` | Short name for the run folder; derived from the prompt if omitted |
| `--style-file` | Defaults to `.claude/image-generation/style.md` |
| `--no-style` | Skip style.md for this run |
| `-m, --model` | `gpt-image-2` (default), `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini` |
| `-s, --size` | `auto`, `1024x1024`, `1536x1024`, `1024x1536`, or any `WIDTHxHEIGHT` |
| `-q, --quality` | `low` / `medium` / `high` / `auto` |
| `-n` | 1–10 images |
| `--format` | `png` (default), `jpeg`, `webp` |
| `--compression` | 0–100, `jpeg`/`webp` only |
| `--background` | `transparent` (needs png/webp), `opaque`, `auto` |
| `--moderation` | `auto` (default) or `low`; generation only |
| `--edit IMAGE...` | Edit these images instead of generating from scratch |
| `--mask FILE` | PNG mask with alpha marking the editable region; same size as the input |
| `--prompt-file` | Read a long prompt from a file rather than the command line |
| `--api-key-stdin` | Read the key from stdin |
| `--timeout` | Seconds, default 300 |

On Windows/PowerShell, quote paths containing spaces. `${CLAUDE_PLUGIN_ROOT}` resolves to the installed plugin root.

## Model notes

- **`gpt-image-2`** is the current model. It takes arbitrary resolutions: both edges divisible by 16, max edge 3840, aspect ratio ≤ 3:1, total pixels between 655,360 and 8,294,400.
- Responses are always **base64** for `gpt-image-*` models — never URLs. Don't send `response_format`; it's DALL·E-only and the API rejects it here.
- Max prompt length is 32,000 characters.
- Rough cost per image at 1024×1024: `low` ≈ $0.006, `medium` ≈ $0.053, `high` ≈ $0.211. **Default to `low` or `medium` for drafts and iteration** and only spend `high` once the prompt is settled. Mention the cost if generating many high-quality images.

## Working with the user

- Show the written file path when done; offer to open or `Read` the image so they can see it.
- Prompts do better with medium detail — subject, style, lighting, composition, mood. If the request is one or two words, expand it into a fuller prompt and say what you used, so they can adjust.
- Iterating on a result is usually `--edit` on the previous output, not a fresh generation. Keep it in the same run folder so the lineage stays together.
- Pick a `--slug` that reads well as a folder name (`hero-banner`, `login-empty-state`) rather than letting a long prompt truncate into one.
- The run folders are a record, not clutter to clean up. Leave `prompt.md` in place — it's how a good result gets reproduced later.

## After generating: is this headed for the web?

The API returns PNG, which is a fine master and a bad thing to ship. If the image is going onto a site or app, hand off to the `imagile-dev-tools:web-optimize` skill to produce AVIF/WebP derivatives — the run folder keeps the PNG master, and `web/` gets the served files.

Assess before acting, don't optimize reflexively. A slide graphic, a print asset, a mockup, or an image the user just wants to look at should stay a PNG. That skill carries the full decision framework; the short version is that a web project plus a real payoff means yes, and anything else means mention it and move on.

Two related calls at generation time:

- If you already know the image is web-bound and no PNG master is needed, `--format webp --compression 80` skips a conversion step entirely.
- If the ask is a logo, icon, or flat geometric mark **for a website**, say that SVG beats any generated raster before spending a generation on it. Image models don't produce clean vector output.

## Self-healing

If the script misbehaves (a parameter the API now rejects, a new model id, a changed response shape), fix `scripts/generate_image.py` and this SKILL.md directly rather than only working around it for the current run.

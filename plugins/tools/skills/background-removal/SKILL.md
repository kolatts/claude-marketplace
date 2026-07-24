---
name: tools:background-removal
description: Remove backgrounds from images locally with Python and rembg, producing transparent PNGs. Works fully offline (no API, no login) on a single image file or a whole folder of images. Use when someone says remove background, remove bg, background removal, rembg, cut out image, make transparent, transparent background, transparent png, cutout, isolate subject, product photo cutout, or wants a PNG with the background stripped. Triggers on either a single file or a batch folder.
---

<!--
allowed-tools: Bash, Read, Glob
-->

Strip image backgrounds locally with Python + `rembg`, writing transparent PNGs. Runs offline (no API, no login) on a single file or a whole folder.

## Prerequisites

- **`uv`** — verify with `uv --version`. If missing, install it: https://docs.astral.sh/uv/getting-started/installation/ (or `winget install astral-sh.uv` on Windows). `uv` handles Python 3.10+ and all dependencies automatically via the script's inline metadata.
- First run downloads the model (`u2net`, ~170 MB) into the rembg cache. Every run after that is offline.

## Usage

The bundled script lives at `${CLAUDE_PLUGIN_ROOT}/skills/background-removal/scripts/remove_bg.py`. Invoke it with `uv run` — dependencies (`rembg`, `pillow`) resolve and cache automatically:

**Single image:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/background-removal/scripts/remove_bg.py" path/to/image.jpg
```

**Folder (batch all images in it):**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/background-removal/scripts/remove_bg.py" path/to/folder
```

**Multiple inputs / options:**
```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/background-removal/scripts/remove_bg.py" a.jpg b.png folder/ -o out_dir -m isnet-general-use
```

Flags:
- `-o, --output-dir DIR` — write all PNGs into `DIR` instead of beside each source.
- `-m, --model NAME` — rembg model (`u2net` default; try `isnet-general-use` for higher quality, `u2netp` for speed).

On Windows/PowerShell, quote paths that contain spaces. `${CLAUDE_PLUGIN_ROOT}` resolves to the installed plugin root.

## Behavior

- Output is a transparent `.png` written **beside each source** by default (`foo.jpg` → `foo.png`).
- A `.png` **input** is written as `<name>_nobg.png` so the original is never overwritten.
- Supported inputs: `.jpg .jpeg .png .webp .bmp .tif .tiff`. Non-images are skipped with a notice.
- Each image reports `[ok]` or `[fail]`; the run ends with a `Done: N/M images.` summary. One bad file does not abort the batch.

## Self-healing

If the script misbehaves (wrong output, an unhandled error, a model that won't load), fix `scripts/remove_bg.py` and this SKILL.md directly rather than only patching the current run.

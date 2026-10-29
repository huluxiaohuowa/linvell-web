# Linvell official website

Static HTML/CSS/JavaScript. No build step, dependencies or app-build workflow.

Published by GitHub Pages from `main` at `/`, with the custom domain in `CNAME`. Application binaries are built and notarized on GitHub-hosted macOS CI in the Linvell repository and distributed separately through GitHub Releases.

```sh
python3 -m http.server 4090 --bind 127.0.0.1
```

`assets/preview.webp` is the compressed development app screenshot, embedded in the homepage so it needs no separate image request. `assets/preview.png` retains the original for full-size viewing. `assets/icon.png` comes from the shared Linvell gourd icon. English and Chinese copy are switched locally without analytics or accounts.

The bilingual [usage guide](guide.html) is published on the website. Repository Markdown sources: [English](docs/guide.en.md), [中文](docs/guide.zh.md). Keep the HTML and both Markdown guides aligned with the actual app release.

Detailed 0.1.7 instructions: [English](docs/guide-0.1.7.en.md), [中文](docs/guide-0.1.7.zh.md). Source editing, project language tools, auto-save, Git/submodules and update fallback are also covered in guide.html.

The homepage version, DMG link and release notes are resolved from GitHub’s latest stable Release at runtime. The page refreshes this metadata when opened, when brought back into view and every five minutes while visible. API failures keep a link to GitHub’s latest Release instead of a pinned old download. Publishing an application version requires no website commit or deployment.

Run release-detection regressions with `node --test tests/releases.test.cjs`.

# Linvell official website

## Install Linvell / 安装 Linvell

Requires Homebrew and macOS 15.6+. / 需要先安装 Homebrew，支持 macOS 15.6 及以上。

```sh
brew install --cask huluxiaohuowa/tap/linvell
```

Upgrade / 升级：

```sh
brew update
brew upgrade --cask huluxiaohuowa/tap/linvell
```

The Linvell-maintained tap provides the signed, notarized Universal app. GitHub Releases automatically update the tap. / Linvell 自建 tap 提供已签名、公证的 Universal 应用，并随 GitHub Release 自动更新。

Static HTML/CSS/JavaScript. No build step, dependencies or app-build workflow.

Published by GitHub Pages from `main` at `/`, with the custom domain in `CNAME`. Application binaries are built and notarized on GitHub-hosted macOS CI in the Linvell repository and distributed separately through GitHub Releases.

```sh
python3 -m http.server 4090 --bind 127.0.0.1
```

The homepage feature captures show the installed Linvell 0.2.0 app in English: Git history, working changes, Markdown preview, rendered HTML, the terminal and Project Tools. The Agent workbench section uses the original user-supplied image, and covers existing CLI selection, session resume and keeping the agent running while browsing files. Each uses a public sample workspace without a control overlay. A product workflow tour moves between real HTML preview, Git history, changes and Project Tools captures. Its connected step indicator, workspace entrance and scroll reveals respect reduced motion. The tour continues after hover, focus and manual selection; there is no pause control. Background-tab work is throttled, and the system reduced-motion preference is respected. The light workbench background uses a fine grid and native SVG branch paths with moving green and copper nodes, running continuously and respecting the system reduced-motion preference. Screenshots open in a keyboard-accessible native dialog. The homepage uses `home.css` and `tokens.css`; documentation pages retain `style.css`. The earlier `assets/preview.*` captures remain available. `assets/icon.png` comes from the shared Linvell gourd icon. English and Chinese copy are switched locally without analytics or accounts.

The bilingual [usage guide](guide.html) is published on the website. Repository Markdown sources: [English](docs/guide.en.md), [中文](docs/guide.zh.md). Keep the HTML and both Markdown guides aligned with the actual app release.

Detailed 0.1.7 instructions: [English](docs/guide-0.1.7.en.md), [中文](docs/guide-0.1.7.zh.md). Source editing, project language tools, auto-save, Git/submodules and update fallback are also covered in guide.html.

The homepage version, DMG link and release notes are resolved from GitHub’s latest stable Release at runtime. The page refreshes this metadata when opened, when brought back into view and every five minutes while visible. API failures keep a link to GitHub’s latest Release instead of a pinned old download. Publishing an application version requires no website commit or deployment.

Run release-detection regressions with `node --test tests/releases.test.cjs`.

On-demand project language services (0.1.8): [English](docs/language-services.en.md), [中文](docs/language-services.zh.md).

Native code intelligence and recent projects (0.1.9): [English](docs/code-intelligence.en.md), [中文](docs/code-intelligence.zh.md).

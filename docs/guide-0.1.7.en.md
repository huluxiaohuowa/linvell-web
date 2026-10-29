# Linvell 0.1.7 — detailed guide

## Auto-save

Enable **Settings → Editor → Automatically save changes**. Existing local and SSH files save about one second after typing stops, preserving encoding and line endings. Untitled files need Save As first. An unsaved tab shows a filled dot in the close X's footprint; successful saving restores the X. External changes stop automatic saving without overwriting them. Edits made while a save is running remain dirty. IME composition is not saved mid-composition.

## Per-project language tools

Open a project, then **Settings → Language Tools**. Choose a language, detect or browse an interpreter/compiler and language server, review its arguments, and apply. SSH projects discover executables on the target host.

A mixed-language project can configure each language independently. Built-in profiles cover Python, Swift, JavaScript, TypeScript, C/C++, Objective-C, Go, Rust, Java, C#, Ruby, PHP, Shell, Lua, R, Dart, HTML, CSS, JSON, Verilog and VHDL. The interpreter supplies the runtime; an installed language server supplies semantic analysis. If no server is detected, install the relevant tool on that host and select its executable. Linvell does not download language servers automatically.

Settings live in **the project root's `.linvell/settings.json`**, including on SSH hosts. Language sections do not overwrite each other. JSONC comments, trailing commas and unrelated settings are preserved. Interpreter paths do not enter iCloud preferences.

```jsonc
{
  "[python]": {
    "linvell.interpreterPath": "${workspaceFolder}/.venv/bin/python",
    "linvell.languageServerPath": "${workspaceFolder}/.venv/bin/pylsp",
    "linvell.languageServerArguments": [],
    "linvell.languageServiceEnabled": true
  },
  "[swift]": {
    "linvell.interpreterPath": "/path/to/swift",
    "linvell.languageServerPath": "/path/to/sourcekit-lsp"
  },
  "files.associations": { "*.zig": "zig" },
  "[zig]": { "linvell.languageServerPath": "/path/to/zls" }
}
```

`${workspaceFolder}`, `${userHome}` and `~/` expand on the appropriate host. Review and apply executable paths supplied by an existing project before its custom tools run.

## Navigation, completion and refactoring

| Action | macOS shortcut |
| --- | --- |
| Definition | F12 or Command-click |
| References | Shift-F12 |
| Back / forward | Control-minus / Control-Shift-minus |
| Hover | Mouse dwell, or Command-K then Command-I |
| Completion | Control-Space; also offered while typing |
| Rename symbol | F2 or the editor context menu |
| Save all | Option-Command-S |

Rename uses the language server's symbol scopes rather than project-wide string replacement. Review the file/change count before applying. Definitions and references update together, with one workspace-wide undo/redo. Changes remain dirty until saved; auto-save writes them if enabled. A stale editor version invalidates a preview. File creation, moves and deletion are not part of this symbol-rename implementation.

The editor, popup, completion list and refactoring UI use Swift/AppKit. A Swift LSP client communicates with installed toolchains. Analysis pauses above 2 MiB per file; rename is limited to 500 files and 32 MiB of source to bound memory use. These limits do not restrict ordinary file editing. Cross-file accuracy depends on the language server and its project index.

## Git and submodules

Source Control has Changes, Commit Graph, Submodules and Git Operations pages. The submodule page shows paths, URLs, branches, recorded/current commits, dirty state and conflicts. It supports add, initialize/update, recursive URL synchronization, tracking branch/URL changes, staging a new gitlink, opening the child repository and removal.

The default update checks out the parent's recorded commit. Updating to a branch tip fetches a newer commit; stage and commit that reference in the parent afterward. Safe removal refuses dirty, conflicted or unrecorded work instead of force-discarding it. More Operations provides deinitialization, merge/rebase update modes, recursive status/summary, absorbing Git directories and recursive commands. Deinitialization preserves the parent's module registration; removal stages its deletion.

Git Operations offers native forms for commits/amend, branches, merge/rebase and continuation/abort, cherry-pick, revert, reset, restore, conflict sides/resolution, stash, tags, remotes, reflog and worktrees. Mutations show their exact arguments for review. Output stays in a native scrollable view. Advanced Git arguments are a JSON array passed directly to Git without shell expansion.

Use the Interactive Git Console for interactive rebase, `git add -p`, editing commit messages or any other Git command. This is a real PTY on the repository's host. Switching away and back preserves it. Stop the console or wait for a running operation before closing. Not every uncommon command has a separate form; use advanced arguments or the console. This round does not include a graphical three-way merge editor.

## Remote responsiveness

Directory names/paths are cached and shown before background refresh. Explicit Refresh obtains remote changes. File reads and conflict-checked writes do not reuse stale directory contents. Native tables materialize visible rows and use responsive scrolling and the display's available refresh range.

File operations, Git and language services reuse a protected SSH ControlMaster connection. Language servers use persistent channels. The lightweight file protocol is sent by the local client and uses the host's existing Python 3; no Linvell server is downloaded from GitHub or installed as a permanent daemon. Selected language tools must still be installed on the host.

CPU layout time, UI event-loop responsiveness and display-link callbacks are separate measurements; none alone proves every frame is presented at the maximum refresh rate. Network work stays off the UI thread, and cached navigation does not wait for SSH.

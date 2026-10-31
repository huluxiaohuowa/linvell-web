# Linvell guide

Checked against Linvell 0.2.10 on October 31, 2026.

## Install and update

Linvell requires macOS 15.6 or later. Choose a manual DMG installation or install Homebrew first to use the Linvell-maintained tap:

```sh
brew install --cask huluxiaohuowa/tap/linvell
```

Upgrade:

```sh
brew update
brew upgrade --cask huluxiaohuowa/tap/linvell
```

Homebrew installations check their Cask source and use Homebrew to install updates. For a manual installation, download the signed release DMG from the homepage. In-app updates require an installed signed release; development/test builds have a separate identity and cannot be converted into a release through that updater. Official Homebrew Cask inclusion is pending.

## Startup workspace

Choose Empty window or Restore last workspace in Settings → Appearance → Startup. Restore reopens the last local folder, project or SSH remote folder using the current SSH configuration and authentication. A file or folder opened from Finder takes priority and does not create another restored default window. Choosing an empty window keeps the last workspace record. Startup choices and workspace paths stay on this Mac. The activity bar marks its selection with a tinted background and side indicator.

## Cached remote navigation (0.1.6)

Remote folder selection opens the selected child without entering it first. Directory indexes are shared by the chooser and explorer: reuse for 30 seconds, then show the cached listing while refreshing in the background. Unchanged results preserve rows and selection. Manual Refresh checks the server immediately; failed refreshes retain the last listing. File saves still check remote conflicts. These changes reduce network waiting; sustained 120 FPS presentation has not yet been verified.

## SSH remote workspaces

Open File → Connect to SSH Host, or search for Connect to SSH Host in the command palette. Linvell reads concrete Host aliases and Include files from ~/.ssh/config. System SSH resolves HostName, User, Port, IdentityFile, ProxyJump and agent settings.

Choose a host, browse to a remote folder and press Open This Folder. Expand folders in the project tree without changing the project root. Use Open Remote Folder to switch roots; cancelling the picker preserves your current workspace. Command-P searches filenames below the root, up to 20,000 files.

The remote host needs a POSIX shell and Python 3 for the file protocol. Linvell does not install a persistent server. Use SSH Terminal for first-time host-key confirmation. File operations use non-interactive SSH: configure a usable key, SSH agent or your own ControlMaster connection. Linvell does not store SSH passwords.

Command-N creates a new remote file. Command-S saves to the original remote path. Encoding and line endings are preserved, and a changed remote file blocks replacement. Remote editing currently allows files up to 16 MiB; local editing has a separate large-file path. Temporary working copies stay in a protected local temporary folder.

SSH workspaces provide remote files, terminals, tasks, preview forwarding and host language services. Native plugins can also run declared LSP/task/DAP programs on the SSH host. VS Code extensions and Dev Containers are not hosted. See Native plugins for installation and adapter limits.


## Existing Agent CLIs and sessions

Open Agents from the sparkle button in the activity bar or workspace toolbar, or find Agents in the command palette. Choose Codex, OpenCode, Pi, Claude Code or DeepSeek Harness. Agent Settings lets you select a discovered installation or an executable path. When no usable CLI is detected, the sidebar shows installation guidance and a link to the provider’s instructions.

Use the same optional Agent home as the provider: CODEX_HOME, CLAUDE_CONFIG_DIR, PI_CODING_AGENT_DIR or DSH_HOME. Leave it empty for the default. Linvell runs the existing CLI and does not copy its login credentials. Local and SSH execution use their own installations and session stores; switching location does not transfer authentication.

New Session immediately adds the open session to the left list before the first message. Its title updates during the conversation. Search saved project sessions, then double-click or choose Resume Session. Selecting a running session switches to its original terminal; a stopped saved session is resumed by its provider. A blank session that the provider has not saved remains available only in the current workspace.

Open sessions have independent processes and output. Switch with the top session menu or the sidebar without stopping other sessions. Stop affects the selected session; closing the workspace asks before stopping remaining processes. Command-click terminal file links, or select a path and use Open Selected File, to open files in the owning workspace. Browsing files and switching panels preserve the running terminal.



## DeepSeek Harness requires a compatible TUI

The Desktop dsh CLI alone is not a terminal interface. Install a dsh-tui version compatible with your DSH runtime, then select dsh-tui in Agent Settings. An existing dsh installation with a compatible dsh-tui profile is also supported. The sidebar distinguishes a missing TUI from a missing CLI. Linvell does not bundle or automatically install TUI.

Create a session without entering a task first; type your first message in the native terminal. Double-clicking a saved session uses its original ID. DSH/TUI handles the configured account or API-key model route. A prior account login does not require switching to a separate API-key route. During startup repeated clicks do not create additional DSH processes; startup failures remain visible in the terminal.

The 0.2.10 local account check used DSH 0.2.1-rc.5 with upstream dsh-TUI source commit 83fcf892d49c4f4e5b05fab2936fac2241bad579. The similarly numbered npm 0.17.0 package declared different runtime compatibility. Check the supported DSH version, not only the TUI version number. Live remote-account TUI acceptance remains untested.

[dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI#readme)


## Local agents on SSH projects with Mutagen

An SSH workspace offers This Mac and SSH Host execution. SSH Host runs the installed remote CLI in that project. This Mac uses an isolated local replica and requires optional Mutagen; it does not require SSHFS or macFUSE. If missing, the panel shows the installation command:

```sh
brew install mutagen-io/mutagen/mutagen
```

After installing, recheck the dependency and use Connect with Mutagen. The green capability indicator means Mutagen is installed; actual synchronization and conflicts have a separate status. Initial synchronization completes before a local Agent starts. Merely opening a project does not start synchronization.

Two-way-safe synchronization preserves conflicts and pending edits. VCS metadata such as .git is excluded. Review Sync Conflicts opens both versions for comparison; it does not force an overwrite. Clean remote editor buffers refresh after Agent changes; dirty buffers retain edits and suspend auto-save when an external conflict is detected.

Local CLI shell commands still run on this Mac. Use SSH explicitly for remote builds and commands: file synchronization is not remote execution. The last dependent local Agent or workspace closure stops Linvell’s synchronization process while retaining the replica. No login item is registered and Mutagen is not bundled; its remote helper may be cached under the remote user.



## Install and manage native plugins

Open Plugins → Manage Plugins, or Settings → Plugins → Manage Plugins. Install a local ZIP/folder, an HTTPS ZIP URL or an entry from a configured HTTPS catalog. The installed list supports search, persistent enable/disable, reload, settings/logs, explicit update, one previous-version rollback and uninstall. Browsing a catalog does not run plugin code.

Review the name, ID, version, permissions and execution location before installing or enabling. Enabled managed plugins can load in other workspaces and after restart; loading a development folder is temporary. Updates are explicit. Removing a source keeps its installed plugins, and uninstall can optionally remove that plugin’s local data. External runtimes and CLI tools are installed separately.

Native plugins can provide commands, views, resources, LSP language services, terminal tasks and DAP launch/internal-console integration, including SSH execution where declared. The configured tools determine available capabilities. Code plugins run with your OS access; checksums do not provide a sandbox. VSIX, Nova and Vim plugin hosting are not supported. See the plugin developer guide for adapter setup and protocol limits.

[Plugins](https://linvell.fuluwa.top/plugins.html)


## Run, stop, logs and web preview

Open View → Run & Preview (Shift-Command-B), select a detected task or enter a command, then press Run. Local tasks use the local project folder. SSH tasks use the current remote folder and run on that host. Nothing starts merely because a project contains a task file.

The terminal streams live output and accepts interactive input. Stop sends an interrupt and then closes a task that remains active. Closing the workspace asks before stopping a running task. The panel retains the log when a task exits.

Local discovery includes npm scripts, Swift run/test, Make and basic literal-command tasks from .vscode/tasks.json. Remote discovery includes npm scripts, Swift and Make. Advanced VS Code task dependencies, problem matchers and variable expansion are not imported; enter the resolved command explicitly.

Enter an HTTP or HTTPS address and choose Preview. For a remote service, enter its remote localhost address, such as http://127.0.0.1:3000. Linvell selects a free local port and opens an SSH tunnel bound only to 127.0.0.1. Closing the runner/workspace closes the tunnel.

## Git management and Git Graph

Open a local repository folder and choose Source Control (Control-Shift-G), View → Git Commit Graph, or the Git Commit Graph command. The three panes contain branches, working changes/commit graph and diff details. Changes uses readable file status labels.

Stage and Unstage affect the selected file. For a tracked text diff, choose a hunk and Stage Hunk or Unstage Hunk to change just that part of the index. Commit submits staged changes only. Fetch, fast-forward-only Pull and Push use existing repository authentication.

Commit Graph draws actual parent links, branch divergence and merge nodes for up to 150 commits across all refs, with branch/tag labels. Select a commit to read its metadata and patch. Double-click a branch to switch; Branches also creates a named branch.

The Git panel manages local and SSH workspaces using the same interface. Remote operations use Git and existing SSH authentication on the selected host. Native operation forms and an interactive console provide additional history workflows; a graphical three-way conflict editor is not included. Git commands are issued only by the Git workflow; opening or expanding a file tree does not execute them.

## Multiple selections and column editing

Option-click adds a caret. Command-D selects the next occurrence; Command-K then Command-D skips an occurrence. Shift-Command-L selects all occurrences. Command-U undoes the latest selection expansion.

Type, delete, cut or paste to edit every selection. If pasted text has exactly one line per selection, lines are distributed in order; otherwise the whole text is repeated. Undo/redo applies to the multi-position edit as a transaction.

Shift-Option-drag selects a rectangle. Shift-Option-Command with an arrow extends a column selection by keyboard. Option-Command-Up/Down adds a caret above/below. Shift-Option-I splits a selection into one selection per line. Tabs and grapheme clusters stay whole; a column operation is capped at 10,000 rows.

## Vim visual and multi-position editing

Enable Vim in Settings. v enters character Visual mode, V selects lines, and Control-V enters Visual Block mode. Move with h/j/k/l, w/b, 0/$ or G. Escape returns to Normal mode.

In a visual/block selection, d or x deletes, c changes at all selected locations, y copies, r replaces the selected characters, and I/A inserts at the start/end of the selected rows.

With multiple carets, Normal mode supports broadcast motions, i/a/I/A, x, c/d with w/$ or a repeated operator, r, y and p, plus undo/redo. Escape from multi-caret Insert keeps the carets in Normal mode; another Escape collapses them. Ordinary multi-selection shortcuts remain available.

The Swift implementation is not yet full Vim compatibility. Full regex/Ex, mappings, visual/Replace macros, complete block registers and some compound operations remain in development. Vimscript/Vim9 and VSIX hosting are not provided.

The Swift engine composes counts and operators (2d3w), word/pair/quote text objects (ciw, ci(, da"), f/F/t/T and repeat with semicolon/comma, named registers, marks, r, J and dot repeat. R overwrites graphemes; Backspace restores what it overwrote. An insertion session undoes as one change.

Record a normal/insert-mode macro with qa, stop with q, play with @a and repeat with @@. The status bar shows recording. Visual selection supports text objects and counted motions; multiple carets support ci( and counted deletes such as 2dw.

Use / or ? for forward/backward search, n/N to repeat and */# for whole-word search. :s/foo/bar/ changes the first match on the current line; :%s/foo/bar/g changes all matches, and :2,5s/foo/bar/g limits the line range. Captures use Vim-style escaped parentheses and replacement backreferences. Unsupported atoms/flags report an error before changing text.

Markdown source and its right preview scroll together in both directions. Preview toggling preserves the document position. Updates retain one compressed rollback version and migrate legacy hidden app copies.

## Shortcuts

| Action | macOS |
| --- | --- |
| Quick open | ⌘P |
| Command palette | ⇧⌘P |
| Open file | ⌘O |
| Open folder | ⌘K ⌘O |
| Save / Save As | ⌘S / ⇧⌘S |
| Find / Replace | ⌘F / ⌥⌘F |
| Search project | ⇧⌘F |
| Toggle sidebar | ⌘B |
| Split editor | ⌘\ |
| Terminal | ⌃` |
| Source control | ⌃⇧G |
| Run & Preview | ⇧⌘B |
| Preview Markdown / HTML | ⇧⌘V |
| Settings | ⌘, |
| Move line | ⌥↑ / ⌥↓ |
| Copy line | ⇧⌥↑ / ⇧⌥↓ |
| Delete line | ⇧⌘K |
| Toggle line comment | ⌘/ |
| Indent / outdent | ⌘] / ⌘[ |
| Insert line below / above | ⌘Enter / ⇧⌘Enter |


## Folder selection and display pacing

Select a remote child folder and Open targets that child directly. Entering it first produces the same target. Native scroll views opt into AppKit responsive scrolling, and terminal display work uses a window display link. Display callback timing alone does not establish presented scrolling FPS. The directory cache above reduces network waiting and redundant row reloads; sustained high-refresh presentation remains under investigation.


## 0.1.7 source editing, language tools and submodules

See the [0.1.7 detailed guide](guide-0.1.7.en.md). Gutter arrows fold code; Option-Command-[ / ] fold/unfold, Command-K Command-0 / Command-J fold/unfold all. Settings adds relative line numbers. Failed GitHub requests try multiple acceleration endpoints without bypassing checksum/signature checks.

## Native code intelligence and recent projects

Code intelligence uses a native Swift language client: capability negotiation, full/incremental document synchronization, wire cancellation, file-change notifications, provider analysis progress, push/pull diagnostics and shared backend lifetime. Project Settings stays beside the project name for local and SSH folders; Project Tools reports on the selected host. Matching JavaScript/TypeScript profiles share one process. The last related document releases the backend and watchers. Project language-server settings can be stored under linvell.languageServerSettings in each language section of .linvell/settings.json.

F12 opens definitions; Shift-F12 finds references. Option-Left/Right navigates back/forward, with Control-minus/Control-Shift-minus retained. Command-Shift-O searches document symbols; Command-T searches workspace symbols through language providers. Command-F12 opens implementations; Go also offers declarations and type definitions. Control-Space completes code; Command-Shift-Space shows parameter hints. F2 performs semantic rename, Option-Shift-F formats the document and Command-Shift-M opens Problems. Capability support depends on the selected server; import aliases retain their language-specific scope.

Mouse hover cards never take keyboard focus and close on leaving the symbol, scrolling, typing or switching windows. Late SSH reads cannot reactivate an editor after navigation. Welcome shows up to twelve recent projects with their paths; SSH entries include a Remote prefix and host and reopen in the same window. The history stays on this Mac. Remote file watching runs in the background and unchanged indexes return a digest instead of retransmitting all metadata.

# Linvell guide

## Startup workspace

Choose Empty window or Restore last workspace in Settings → Appearance → Startup. Restore reopens the last local folder, project or SSH remote folder using the current SSH configuration and authentication. A file or folder opened from Finder takes priority and does not create another restored default window. Choosing an empty window keeps the last workspace record. Startup choices and workspace paths stay on this Mac. The activity bar marks its selection with a tinted background and side indicator.

## Cached remote navigation (0.1.6)

Remote folder selection opens the selected child without entering it first. Directory indexes are shared by the chooser and explorer: reuse for 30 seconds, then show the cached listing while refreshing in the background. Unchanged results preserve rows and selection. Manual Refresh checks the server immediately; failed refreshes retain the last listing. File saves still check remote conflicts. These changes reduce network waiting; sustained 120 FPS presentation has not yet been verified.

## SSH remote workspaces

Open File → Connect to SSH Host, or search for Connect to SSH Host in the command palette. Linvell reads concrete Host aliases and Include files from ~/.ssh/config. System SSH resolves HostName, User, Port, IdentityFile, ProxyJump and agent settings.

Choose a host, browse to a remote folder and press Open This Folder. Expand folders in the project tree without changing the project root. Use Open Remote Folder to switch roots; cancelling the picker preserves your current workspace. Command-P searches filenames below the root, up to 20,000 files.

The remote host needs a POSIX shell and Python 3 for the file protocol. Linvell does not install a persistent server. Use SSH Terminal for first-time host-key confirmation. File operations use non-interactive SSH: configure a usable key, SSH agent or your own ControlMaster connection. Linvell does not store SSH passwords.

Command-N creates a new remote file. Command-S saves to the original remote path. Encoding and line endings are preserved, and a changed remote file blocks replacement. Remote editing currently allows files up to 16 MiB; local editing has a separate large-file path. Temporary working copies stay in a protected local temporary folder.

This workflow provides remote files, a terminal, tasks and preview forwarding. It does not run VS Code extensions, Dev Containers or a remote language-server/debug-adapter host.

## Run, stop, logs and web preview

Open View → Run & Preview (Shift-Command-B), select a detected task or enter a command, then press Run. Local tasks use the local project folder. SSH tasks use the current remote folder and run on that host. Nothing starts merely because a project contains a task file.

The terminal streams live output and accepts interactive input. Stop sends an interrupt and then closes a task that remains active. Closing the workspace asks before stopping a running task. The panel retains the log when a task exits.

Local discovery includes npm scripts, Swift run/test, Make and basic literal-command tasks from .vscode/tasks.json. Remote discovery includes npm scripts, Swift and Make. Advanced VS Code task dependencies, problem matchers and variable expansion are not imported; enter the resolved command explicitly.

Enter an HTTP or HTTPS address and choose Preview. For a remote service, enter its remote localhost address, such as http://127.0.0.1:3000. Linvell selects a free local port and opens an SSH tunnel bound only to 127.0.0.1. Closing the runner/workspace closes the tunnel.

## Git management and Git Graph

Open a local repository folder and choose Source Control (Control-Shift-G), View → Git Commit Graph, or the Git Commit Graph command. The three panes contain branches, working changes/commit graph and diff details. Changes uses readable file status labels.

Stage and Unstage affect the selected file. For a tracked text diff, choose a hunk and Stage Hunk or Unstage Hunk to change just that part of the index. Commit submits staged changes only. Fetch, fast-forward-only Pull and Push use existing repository authentication.

Commit Graph draws actual parent links, branch divergence and merge nodes for up to 150 commits across all refs, with branch/tag labels. Select a commit to read its metadata and patch. Double-click a branch to switch; Branches also creates a named branch.

The Git panel manages local and SSH workspaces using the same interface. Remote operations use Git and existing SSH authentication on the selected host. This release does not provide all Sublime Merge history-rewriting operations or a three-way conflict editor. Git commands are issued only by the Git workflow; opening or expanding a file tree does not execute them.

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

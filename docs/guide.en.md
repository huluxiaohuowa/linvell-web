# Linvell 0.1.2 guide

## SSH remote workspaces

Open File → Connect to SSH Host, or search for Connect to SSH Host in the command palette. Linvell reads concrete Host aliases and Include files from ~/.ssh/config. System SSH resolves HostName, User, Port, IdentityFile, ProxyJump and agent settings.

Choose a host, enter a remote folder path and double-click folders or files. Command-P searches filenames below the current remote folder, up to 20,000 files, excluding common generated directories.

The remote host needs a POSIX shell and Python 3 for the file protocol. Linvell does not install a persistent server. If authentication or host-key verification is required, use the SSH Terminal button, complete the normal SSH prompts yourself, then refresh the file browser.

Command-N creates a new remote file. Command-S saves to the original remote path. Encoding and line endings are preserved, and a changed remote file blocks replacement. Remote editing currently allows files up to 16 MiB; local editing has a separate large-file path. Temporary working copies stay in a protected local temporary folder.

This workflow provides remote files, a terminal, tasks and preview forwarding. It does not run VS Code extensions, Dev Containers or a remote language-server/debug-adapter host.

## Run, stop, logs and web preview

Open View → Run & Preview (Shift-Command-B), select a detected task or enter a command, then press Run. Local tasks use the local project folder. SSH tasks use the current remote folder and run on that host. Nothing starts merely because a project contains a task file.

The terminal streams live output and accepts interactive input. Stop sends an interrupt and then closes a task that remains active. Closing the workspace asks before stopping a running task. The panel retains the log when a task exits.

Local discovery includes npm scripts, Swift run/test, Make and basic literal-command tasks from .vscode/tasks.json. Remote discovery includes npm scripts, Swift and Make. Advanced VS Code task dependencies, problem matchers and variable expansion are not imported; enter the resolved command explicitly.

Enter an HTTP or HTTPS address and choose Preview. For a remote service, enter its remote localhost address, such as http://127.0.0.1:3000. Linvell selects a free local port and opens an SSH tunnel bound only to 127.0.0.1. Closing the runner/workspace closes the tunnel.

## Git management and Git Graph

Open a local repository folder and select Source Control in the activity rail, or press Control-Shift-G. Changes shows index and working-tree status, including untracked and renamed files. Select a row to view its working-tree or staged diff.

Stage and Unstage affect the selected file. Commit submits only what is already staged, using the entered message. Fetch, fast-forward-only Pull and Push use the repository’s existing remote and authentication configuration. Failures appear in the panel.

History draws the actual parent links, branch divergence and merge nodes for up to 150 commits across all refs, with branch/tag labels. Select a commit to read its metadata and patch. The Branches action switches or creates a named branch.

The Git panel currently manages local checkouts. This release does not provide all Sublime Merge history-rewriting operations or a three-way conflict editor. Remote build-machine Git operations are not performed by the SSH file workflow.

## Multiple selections and column editing

Option-click adds a caret. Command-D selects the next occurrence; Command-K then Command-D skips an occurrence. Shift-Command-L selects all occurrences. Command-U undoes the latest selection expansion.

Type, delete, cut or paste to edit every selection. If pasted text has exactly one line per selection, lines are distributed in order; otherwise the whole text is repeated. Undo/redo applies to the multi-position edit as a transaction.

Shift-Option-drag selects a rectangle. Shift-Option-Command with an arrow extends a column selection by keyboard. Option-Command-Up/Down adds a caret above/below. Shift-Option-I splits a selection into one selection per line. Tabs and grapheme clusters stay whole; a column operation is capped at 10,000 rows.

## Vim visual and multi-position editing

Enable Vim in Settings. v enters character Visual mode, V selects lines, and Control-V enters Visual Block mode. Move with h/j/k/l, w/b, 0/$ or G. Escape returns to Normal mode.

In a visual/block selection, d or x deletes, c changes at all selected locations, y copies, r replaces the selected characters, and I/A inserts at the start/end of the selected rows.

With multiple carets, Normal mode supports broadcast motions, i/a/I/A, x, c/d with w/$ or a repeated operator, r, y and p, plus undo/redo. Escape from multi-caret Insert keeps the carets in Normal mode; another Escape collapses them. Ordinary multi-selection shortcuts remain available.

This is a native subset, not full upstream Vim compatibility. Visual text objects, macros, Vimscript, full Ex and complete block-register semantics remain outside this release.

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

# Project language services

Project → Project Settings opens settings for the current folder and host, separate from application Settings. Each language chooses project storage (.linvell/tools) or host-user storage (~/.linvell/language-services). Download and Install currently supports Python (Pyright) and JavaScript/TypeScript; other languages use installed SDKs or a custom server. For SSH projects this Mac downloads verified target-platform packages, uploads them over SSH and removes its temporary relay files. The target host does not download packages from the Internet. Project settings stay in .linvell/settings.json; JSONC comments and other settings are preserved, and host paths do not enter iCloud.

Project storage offers Add Git Ignore Rule and an installation-time switch. It appends /.linvell/tools/ to the project root’s .gitignore once, preserving existing rules and keeping settings.json shareable. Ignore rules do not untrack previously committed files. Clear Language Service removes only Linvell-managed files and this project’s association; a shared user-folder service remains while another registered project uses it. JavaScript and TypeScript share one backend. Services start when code intelligence needs them and stop when the last synchronized document closes; ordinary lexical editing needs no service. Managed downloads are not bundled into the application.

```jsonc
{
  "[python]": {
    "linvell.interpreterPath": "${workspaceFolder}/.venv/bin/python",
    "linvell.languageServiceStorage": "project",
    "linvell.languageServiceAddGitIgnore": true
  },
  "[typescript]": {
    "linvell.languageServiceStorage": "user"
  }
}
```

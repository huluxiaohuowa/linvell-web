# 项目语言服务

通过“项目 → 项目设置”配置当前文件夹和所属主机，与应用通用设置分开。每种语言可选择项目目录（.linvell/tools）或代码所在机器的用户目录（~/.linvell/language-services）。目前支持按需下载 Python（Pyright）、JavaScript/TypeScript 服务；其他语言使用已安装 SDK 或自定义服务。SSH 项目由本机下载并校验目标平台安装包，通过 SSH 上传，随后清除本机中转文件，目标主机无需联网下载。配置仍保存在 .linvell/settings.json，保留 JSONC 注释及其他设置，主机路径不会进入 iCloud。

项目目录模式提供“添加 Git 忽略规则”按钮和“安装时自动添加”开关：只向项目根目录 .gitignore 添加一次 /.linvell/tools/，保留已有规则及可共享的 settings.json。忽略规则不会自动取消已提交文件的跟踪。“清除语言服务”只清理由 Linvell 管理的文件与当前项目关联；其他已登记项目仍在使用的用户目录共享服务会保留。JavaScript 与 TypeScript 共用一个后端。服务按需启动，最后一个已同步文档关闭后退出；普通词法编辑不依赖服务，应用安装包也不内置这些下载内容。

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

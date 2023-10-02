---
title: Win 下三种包管理工具 -- 我选择 Scoop
tags:
  - Scoop
  - Windows
hidden: false
abbrlink: 14c1a276
date: 2022-09-16 02:10:02
catagories: 工具推荐
categories: 冷知识杂谈
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这篇 Blog 将会介绍 win 平台下的一款包管理工具 Scoop，以及 Scoop 的安装和使用。

## 什么是包管理器？

包管理器 (package manager) 是一种用于自动化安装、升级、配置和删除计算机软件的工具。它可以自动处理软件的安装、升级、配置和删除，而不需要用户去手动操作。

### 你为什么需要包管理器？

如果你是一名 Linux 用户，那么你可能已经用过包管理器了，比如 `apt`、`yum`、`pacman` 等等。

相比于 Windows 平台下的杂乱的、不安全的安装方式，包管理器提供了一种简单的，可靠的软件管理，你不需要在恶心的、充斥着劣质广告的搜索结果种寻找软件，也不需要在安装软件时担心流氓软件捆绑安装，更不需要担心软件是否会带来安全问题 (如果你使用的是官方源的话)。

试想一下，你是一个天真可爱的编程新手，在搜索引擎中键入了 `python`，然后你会看到这样的结果：

![python](https://cdn.staticaly.com/gh/Jenway/J-figure-Bed/main/python.png?raw=true)

如果你十分天真地点击了第一个链接，那么恭喜你，你的电脑上很可能已经被捆绑安装了一堆垃圾软件，而且你的浏览器的默认软件也基本全被替换了个遍。

最近还有一个很流行的新闻，国内有相当不要脸的人，把开源且免费的 Visual Studio Code 拿来卖，简直是无耻至极。

相反，如果你使用包管理器，你只需要在命令行中输入 `Scoop install main/python`，就可以安装 python 了，需要担心安装的是不是假的，只要使用的是 Scoop 的官方软件源，大可以放心地使用。

### Windows 平台下的包管理器

我在 Windows 平台下使用过三种包管理器，分别是

- [chocolatey](https://chocolatey.org/)
- [winget](https://github.com/microsoft/winget-cli)
- [Scoop](https://scoop.sh/)

在这里面，我最喜欢的还是 Scoop，这一点会在后面的内容中详细介绍，接下来，我们还是直接开始介绍 Scoop 吧。

## 来使用 Scoop 吧

Scoop 是一个 Windows 平台下的包管理器，它的官方网站是 [Scoop.sh](https://scoop.sh/)。

> Scoop -- A command-line installer for Windows

### 快速开始

Open a PowerShell terminal (version 5.1 or later) and run:

打开 PowerShell (版本 >= 5.1) 并运行以下命令：( 确保你没有使用管理员权限打开 PowerShell )

``` powershell

> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
> irm get.Scoop.sh | iex

```

### Scoop 能干什么？

Scoop 可以在命令行中安装你喜欢的软件，而且安装过程非常简单，它可以：

- 让恼人的权限弹窗 (UAC) 不来烦你
- 隐藏 GUI 安装界面
- 避免安装大量程序时 PATH 被污染
- 防止安装和卸载程序时出现意外的副作用，特指不小心安装 XXX 全家桶
- 自动查找和安装依赖项
- 帮你处理安装后还需要做的额外工作

### 简单上手

假如你想安装 nodejs，那么你只需要在命令行中输入

```PowerShell
Scoop install nodejs
```

接下来，你将会看到类似于下面的输出

```PowerShell
PS C:\> Scoop install nodejs
Installing 'nodejs' (18.4.0) [64bit]
node-v18.4.0-win-x64.7z (17.3 MB) [===================================] 100%
Checking hash of node-v18.4.0-win-x64.7z ... ok.
Extracting node-v18.4.0-win-x64.7z ... done.
Linking ~\Scoop\apps\nodejs\current => ~\Scoop\apps\nodejs\18.4.0
Persisting bin
Persisting cache
Running post_install script...
'nodejs' (18.4.0) was installed successfully!
PS C:\>
```

## 为什么 Scoop is better？

让我们来看看 Scoop 官方网站上的一段话：

### How is Scoop different to Chocolatey?

- Installs to ~/scoop/ by default. You can set up your own programs and not worry that they'll interfere with other users' programs (or theirs with yours, perhaps more importantly). You can optionally choose to install programs system-wide if you have administrator rights.

- No UAC popups, doesn't require admin rights. Since programs are installed just for your user account, you won't be interrupted by UAC popups.

- Doesn't pollute your path. Where possible, Scoop puts shims to your installed programs in a single directory and just adds that directory to your path. (这点真的赞👍)

- Doesn't use NuGet. NuGet is a great solution to the problem of managing software library dependencies. Scoop avoids this problem altogether: each program you install is isolated and independent.

- Simpler than packaging. Scoop isn't a package manager, rather it reads plain JSON manifests that describe how to install a program and its dependencies.

- Simpler app repository. Scoop just uses Git for its app repository. You can create your own repo, or even just a single file that describes an app to install.

- NOTE While it would be easy to install Skype with Scoop, this will probably never be in Scoop's main bucket (app repository). Scoop focuses on open-source, command-line developer tools. The scoop-extras bucket is for non developer tools.

How is Scoop different to Winget?

Refer to this discussion: <https://github.com/ScoopInstaller/Scoop/discussions/4777>

## 尾声

"Scoop is not a package manager"，Scoop 不是一个包管理器，它只是一个命令行安装工具。

这个话听起来还是蛮有意思的，它让我想起来诸如 YAML Ain't Markup Language (YAML 不是一个标记语言) 这样的话。

> 其实,YAML 原来是 Yet Another Markup Language 的缩写，但后来改成了递归缩写

所以在这里，我想说，Scoop 不是一个包管理器，它只是一个命令行安装工具，但是它是一个非常好用的命令行安装工具。

不过，让我们来收集一些类似的有趣的递归缩写 ( Recursive acronym ) 吧。

> A recursive acronym is an acronym that refers to itself, and appears most frequently in computer programming.

- GNU's Not Unix (GNU 不是 Unix)
- PHP: Hypertext Preprocessor (PHP: 超文本预处理器,其实原本是 Personal Home Page Tools (PHP 工具))
- YAML Ain't Markup Language (YAML 不是一个标记语言)
- WINE Is Not an Emulator (WINE 不是一个模拟器,ORIGINALLY Windows Emulator)
- LAME Ain't an MP3 Encoder (LAME 不是一个 MP3 编码器)
- cURL URL Request Library (cURL URL 请求库)
- pip Installs Packages (pip 安装包)

## 参考资料

- [Scoop.sh](https://scoop.sh/)
- [Scoop GitHub](https://github.com/ScoopInstaller/Scoop)
- [Recursive acronym - Wikipedia](https://en.wikipedia.org/wiki/Recursive_acronym)

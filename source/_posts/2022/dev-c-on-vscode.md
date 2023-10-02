---
title: VScode 初见 --> 进行C语言编程
hidden: false
abbrlink: a7cddfc3
date: 2022-09-21 10:41:58
tags:
    - VScode
    - C
categories: 技术
---

这篇 Blog 会帮助你运用 VScode 进行 C 语言编程，希望能帮助到你。

Let's develop C program with VScode !

> Code editing.
>
> Redefined

## 前置知识

### 什么是 VScode

> Visual Studio Code 是一个轻量级但功能强大的源代码编辑器，可在您的桌面上运行，并且可用于 Windows，macOS 和 Linux。它具有内置的 JavaScript，TypeScript 和 Node.js 支持，并具有丰富的其他语言（如 C++，C#，Java，Python，PHP，Go）和运行时（如 .NET 和 Unity）扩展。-- [VScode 官网](https://code.visualstudio.com/)

### C 语言 -- 编写，编译，运行

用十分简单但不严谨的语言来描述，我们编写的代码`(.c / .cpp文件)`
，需要经过编译器的编译，转化为机器能够识别的二进制代码`(.exe 文件)`，然后由计算机执行。

常见的 C 语言编译器有 `gcc`，`clang`，`MSVC (from Visual Studio)` 等等。而本文我们将使用的是 `gcc`。

### 什么是 gcc

gcc，全称 GNU Compiler Collection，是 GNU 开源组织发布的编程语言编译器，支持 C、C++、Objective-C、Fortran、Java、Ada 和 Go 等语言。

在 `Linux` 平台上，`gcc` 是默认的编译器，而在 `Windows` 平台上，如果想要使用 `gcc`，那么有若干种不同的方式。

其中种种会在另一篇 Blog 中进行介绍，本篇 Blog 中，我们将使用 `WinLibs` 来使用 `gcc`。

### 什么是 WinLibs

WinLibs standalone build of GCC and MinGW-w64 for Windows

简而言之，`WinLibs` 是一个 包含 `gcc`、`MinGW-w64`以及其他一些工具的编译版本，它可以在 `Windows` 平台上使用。

我们可以在 [WinLibs 官网](https://winlibs.com/) 上下载到最新版本的 `WinLibs`，通过 `WinLibs`，我们可以在 `Windows` 平台上使用 `gcc`。

如果你无法访问 `WinLibs` 官网，可以通过 [Sourceforge](https://sourceforge.net/projects/winlibs-mingw/) 下载。

你也可以随意选择如下方式来使用 `gcc`：

- 下载 `TDM-GCC`，在 [TDM-GCC 官网](https://jmeubank.github.io/tdm-gcc/categories/#release) 上下载 `TDM-GCC`
- 下载 `MinGW-w64`，在 [Sourceforge](https://sourceforge.net/projects/mingw-w64/) 上下载 `MinGW-w64`

## 环境变量的配置

### 什么是环境变量

我们用一个简单的例子来说明什么是环境变量。

设想我们现在在 `C:\Users\Jenway\Desktop` 目录下，该目录下有一个 `hello.exe` 文件，我们想要运行它，我们可以在终端中输入 `.\hello.exe` 来运行它。

可是，如果我们现在在 `C:\Users\Jenway\Documents` 目录下，我们想要运行 `C:\Users\Jenway\Desktop\hello.exe`，我们该怎么做呢？

一个比较直接的方法是，我们可以在终端中输入 `C:\Users\Jenway\Desktop\hello.exe` 来运行它。

不过，难道我们每次都要输入这么长的路径吗？这显然是不现实的。

现在尝试在终端中输入 `hello.exe`，你会发现，终端会提示 `hello.exe` 不是一个内部或外部命令，也不是可运行的程序或批处理文件。

但假如我们把 `C:\Users\Jenway\Desktop` 添加到环境变量中，那么我们就可以在任意目录下，直接输入 `hello.exe` 来运行它。

因为，当我们输入 `hello.exe` 时，终端会在环境变量中寻找 `hello.exe`，如果找到了，就会运行它。

所以，我们可以把环境变量理解为一个存储了路径的地方，当我们在终端中输入一个命令时，终端会在环境变量中寻找这个命令，如果找到了，就会运行它。

自然的，我们可以把 `gcc` 添加到环境变量中，这样，我们就可以在任意目录下，直接输入 `gcc` 来运行它。

### 将 WinLibs / TDM-GCC / MinGW-w64 添加到环境变量中

其实这几种 gcc 实现的添加方式是一样的，我们以 `WinLibs` 为例。

首先，我们需要找到 `WinLibs` 的安装目录，假设我们将 `WinLibs` 安装在 `C:\mingw-winlibs-llvm-ucrt-mcf` 目录下。

将 `C:\mingw-winlibs-llvm-ucrt-mcf\bin` 添加到环境变量中，这样，我们就可以在任意目录下，直接输入 `gcc` 来运行它。

```bash
gcc --version
```

这将会输出 `gcc` 的版本信息，也意味着我们已经成功的将 `gcc` 添加到了环境变量中。

## 开始使用 VScode

现在，我们已经成功的将 `gcc` 添加到了环境变量中，我们可以开始使用 VScode 进行 C 语言编程了。

安装 VScode，这里不再赘述，不过要说明的是，请直接在 [VScode 官网](https://code.visualstudio.com/)（点击超链接即可跳转）下载，不要在其他地方下载，如果你不想下载到国内无良厂商收你几十块钱的所谓`VScode`。

> VScode 作为一个开源且免费的软件，不应该被收费，如果你在其他地方下载到了收费的 VScode，那么请立即删除，如果有可能的话，也请向有关部门举报。

当你安装好 VScode 之后，你会发现，VScode 的界面是英文的，如果你不习惯英文界面，可以在 VScode 的扩展商店中搜索 `Chinese`，下载`Chinese (Simplified) Language Pack for Visual Studio Code`插件，安装并重启软件之后，VScode 的界面就会变成中文的了。

你可能需要一点时间来适应 VScode 的界面，不过，作为如今最流行的代码编辑器，VScode 的界面还是很友好的。

### 安装必要的插件

在 VScode 上进行 `C/C++` 单文件开发在网络上大概有三种流派：

- 使用 `C/C++` 插件，并编写 `tasks.json`、`launch.json` 等文件
- 使用 `Code Runner` 插件
- 使用 `Clangd` 或 `C/C++` 插件的语法提示，直接命令行编译运行

By the way，如果是多文件开发的话，一般会使用 `CMake` `Xmake`、`Makefile` 等工具来进行编译。这里不再赘述。

你可以选择你喜欢的方式，对于新手来说，大概一键运行的方式更加友好，也就是选择使用 `Code Runner` 插件。这样的话，这篇 Blog 就可以到此为止了。

### 配置生成任务

如果你倾向于更符合 `VScode` 设计理念的方式，那么你可以选择使用 `C/C++` 插件，并编写 `tasks.json`、`launch.json` 、`c_cpp_properties.json` 这三个文件。

这种方式需要你手动编写 json 配置文件，如果你仔细看网上的教程，你就会发现相当多劣质教程的配置文件都是复制来复制去的，我在这里不会不负责任的复制粘贴，但是我也不会仔细讲解如果编写这些配置文件。

我在这里向你推荐 [谷雨同学](https://guyutongxue.site/) 大佬所编写的 [VS Code Config Helper v4](https://v4.vscch.tk/),点击链接，下载安装，根据提示进行配置，就可以搭建好 `C/C++` 开发环境了，其本质上就是在你所打开的文件夹中，生成了 `tasks.json`、`launch.json` 、`c_cpp_properties.json` 这三个文件。

这里挖一个坑，以后我活血会写一篇关于 `tasks.json`、`launch.json` 、`c_cpp_properties.json` 这三个文件的文章，敬请期待。

### 终端的使用

我们刚才已经介绍了两种流派，一种是使用 `Code Runner` 插件，一种是使用 `C/C++` 插件，并编写 `tasks.json`、`launch.json` 、`c_cpp_properties.json` 这三个文件。

还有一种最简单的方式，直接命令行编译运行、dubug 等，`Clangd` 或 `C/C++` 插件只用来语法提示。

```bash
gcc -o hello hello.c
```

这样就可以编译 `hello.c` 文件了，`-o` 参数指定了输出文件的名字，如果不指定的话，输出文件的名字默认为 `a.exe`。

```bash
gcc -o hello hello.c && .\hello.exe
```

编译 `hello.c` 文件，并运行 `hello.exe` 文件。

```bash
gdb hello.exe
```

使用 `gdb` 调试 `hello.exe` 文件

你也可以写一个简单的 `makefile` 文件，来编译你的代码。

```makefile
hello: hello.c
    gcc -o hello hello.c
```

```bash
make
```

关于这些 GNU 工具的使用，比如使用 `gdb` 调试啦，写 `makefile`啦，已经可以单独写一篇 Blog 了，这里不再赘述。

## 为什么要用终端？

你可能会问，既然有了图形化界面，为什么还要用终端？

这是一个很好的问题，我也不知道该怎么回答，同理我们也可以问，像 `CLion`、`Visual Studio` 这样的 IDE 已经很好用了，为什么还要用 VScode？

大佬们或许会说:
> 如果你习惯了使用终端，那么你就会发现，终端的使用是如此的方便，如此的高效。

啊，谁知道呢，可能只是终端会让人觉得很酷吧。

### 常用的终端命令

| 命令 | 英文含义| 作用 | 举例 |
| :----:| :----: | :----: | :----: |
| cd | Change Directory| 切换目录 | cd C:\Users\Jenway\Desktop |
| ls | list |列出当前目录下的文件 | ls |
| mkdir | make directory | 创建目录 | mkdir test |
| rm | remove | 删除文件 | rm test.txt |
| rmdir | remove directory | 删除目录 | rmdir test |
| mv | move | 移动文件 | mv test.txt .\test\ |
| cp | copy | 复制文件 | cp test.txt C:\Users\Jenway\Desktop |
| cat | concatenate | 查看文件内容 | cat test.txt |
| pwd | print working directory | 查看当前目录 | pwd |
| clear | clear | 清屏 | clear |

在 Windows 下，如果想使用这种 `bash` 风格的终端，那么就不要使用 `cmd`，而是使用 `PowerShell`，好在，`win11` 已经默认安装了 `windows terminal`，我们可以在 `windows terminal` 中使用 `PowerShell`。

当然了，win 下的其它终端环境还有很多，比如 `MSYS2`、`WSL` 等等，或许我会在以后的 Blog 中进行介绍。

## 主题美化

我用的主题是是 `Material Theme`，你也可以在 VScode 的扩展商店中搜索 `Theme`，选择你喜欢的主题。

很多人有修改字体的习惯，不过很多人也觉得自带的 `consolas` 字体已经足够好了，我选择的是 `Monaco` 字体，

我也对 VScode 终端的字体进行了修改，我使用的是 `CaskaydiaCove NF` 字体，你可以在 [Nerd Fonts](https://www.nerdfonts.com/) 上下载到它。

终端环境的美化折腾与编程字体其实是程序员群体中一个比较和谐的话题，相比之下，字体之争，换行符之争，vim /Emacs 之争，语言之争，框架之争，常常会引发激烈的争论。

## 快捷键的设置

很多人习惯修改快捷键，我个人是没有这样的习惯了，我只修改了一条那就是将打开终端的命令从 `ctrl + ~` 修改为 `ctrl + \`。因为这样更符合左右手分工

## 结尾

后来我逐渐意识到，对于新手来说，花太多时间在这些琐碎的配置上，是不值得的，所以我写了这篇 Blog，希望能帮助到你。

如果你懒得配置的话，你也可以选择更加简单、开箱即用的方法，

> 你的意思是，Visual Studio ？ DEV C++ ？ CLion ？

额，确实，后来我发现，如果你不想折腾的话，那么这些 IDE 确实是更好的选择。

在这三者之中，DEV C++ 是最轻量的，但是 DEV C++ 相当古老，而且很多缺点广为人所诟病，所以我不推荐使用。

所以我推荐使用国内开发者 `瞿华(royqh1979@gmail.com)` 开发的一个改版项目 [小熊猫 C++](https://royqh.net/redpandacpp/)，真的很不错，可惜我接触到的时候已经过了新手期了。

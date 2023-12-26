---
title: Win 平台下的 GCC 与 Clang
tags:
  - gcc
  - MinGW
hidden: false
abbrlink: 8722d43e
date: 2023-05-23 02:13:24
catagories: 技术
categories: 冷知识杂谈
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

本文主要介绍如何在 Windows 平台下使用 GCC 与 Clang 编译器，以及 包括 Cygwin、MinGW、MinGW-w64、MSYS2 的历史

## 前置知识

如果你了解了下面这些知识，那么你可以跳过这一节。

点击 [这里](#win-下-gcc-的两大思路) 跳过这一节。

### 什么是 GCC

GCC (GNU Compiler Collection) 是 GNU 开发的编程语言编译器。它是 GNU 项目的关键部分，也是 GNU 工具链的主要组成部分之一。GCC 目前支持的语言包括 C、C++、Objective-C、Fortran、Java、Ada、Go、D 以及各种处理器的汇编语言。

GCC 是自由软件，它的源代码在 GNU 通用公共许可证 (GPL) 下发布。GCC 由自由软件基金会 (FSF) 开发，是 GNU 项目的一部分。

### 什么是 Clang

Clang (C Language Family Frontend for LLVM) 是一个 C、C++、Objective-C 和 Objective-C++ 的编译器前端，它采用 LLVM 作为后端。Clang 是一个自由软件，它以 BSD 许可证授权发布。

> LLVM (Low Level Virtual Machine) 是一个编译器基础设施，它包含了一系列模块化的编译器组件和工具链，用于开发编译器前端和后端。LLVM 项目是一个开源项目，它被许多不同的公司和个人使用，包括 Apple、AMD、ARM、Sony、Intel、Google、NVIDIA、Adobe、Cray 等等。

## Win 下使用 GCC 的两大思路

假如有以下的 C 程序

```C
#include <stdio.h>

int main() {
    printf("Hello World!\n");
    return 0;
}
```

这个用户程序通过调用 C 标准库的 `printf` 函数来输出字符串，而 C 标准库的 `printf` 函数又通过调用操作系统提供的 API 来完成输出。

而显然，不同的操作系统提供的 API。

比如，Windows 提供的 Win API 中，可能会是这样的:

```C
BOOL WINAPI WriteConsole(
  _In_             HANDLE  hConsoleOutput,
  _In_       const VOID    *lpBuffer,
  _In_             DWORD   nNumberOfCharsToWrite,
  _Out_opt_        LPDWORD lpNumberOfCharsWritten,
  _Reserved_       LPVOID  lpReserved
);
```

而在 Linux 下，可能会是这样的 posix API:

```C
ssize_t write(int fd, const void *buf, size_t count);
```

这期间存在巨大的差异。导致 GCC 原生并不兼容 Windows，实际上，即使我们通过某种方法得到一个能在 Windows 下运行的 GCC，因为相应的 glibc 调用的仍然是 posix API，所以链接得到的程序仍然无法在 Windows 下运行。

就我的经验来说，有两种思路可以让 GCC 在 Windows 下编译出可执行文件：

> 这两个系是我自己瞎编的，不要当真。

- `Cygwin` 系: 打包 Win API，提供一个类 posix API 的兼容层 (通常是一个动态链接库 .dll 文件)，glibc 仍然调用 posix API，但是这个 posix API (如 cygwin1.dll) 会调用 Win API。

- `MinGW` 系: 修改头文件、库文件、运行时，使得 glibc 调用的是 Win API。

## 在 Win 下使用 GCC 的历史

如果你对历史不感兴趣，那么你可以点击 [这里](中场总结GCC) 跳过这一节。

### Cygwin

> Cygwin 可能是最早的一种方法

Cygwin 是一个在 Windows 上运行的流行 GNU 和其他开源工具的发行版。它的核心部分是 Cygwin 库，它提供了这些程序所需要的 POSIX 系统调用和环境。

> Cygwin 包含了来自开源世界的数千个软件包，包括大多数 GNU 工具、许多 BSD 工具、一个 X 服务器和一整套 X 应用程序。开发者可以找到大量允许你编写使用 POSIX API 的 Windows 控制台或 GUI 应用程序的工具、头文件和库。Cygwin 允许轻松地移植许多 Unix 程序，而无需对源代码进行大量更改。这包括配置和构建大多数可用的 GNU 或 BSD 软件，甚至包括 Cygwin 发行版本身包含的软件包。可以从提供的 Unix shell（如 bash、tcsh 或 zsh）中来使用它们。

1995 年，Cygnus 工程师 Steve Chamberlain 观察到 Windows NT 和 95 使用 COFF 作为它们的目标文件格式，而 GNU 已经包含了对 x86 和 COFF 的支持，以及 C 库 newlib。他认为可以重新定位 GCC 并生成一个交叉编译器，可以在 Windows 上运行。这被证明是可行的，很快就开发出了一个原型。这便是 Cygwin 的起源。

这个项目现今的leader是 Corinna Vinschen，网站是 <https://cygwin.com/>

#### 什么是 Cygwin?

Cygwin 是:

- 一个大型的 GNU 和开源工具集合，它提供了类似于 Linux 发行版的功能，可以在 Windows 上使用 GNU 和其他开源工具。（如 Bash、make、g++、git、vim 等等）
- 一个 DLL (cygwin1.dll)，它提供了大量的 POSIX API 功能。

#### 什么不是 Cygwin?

Cygwin 不是:

- 一种在 Windows 上运行原生 Linux 应用程序的方法。如果你想让它在 Windows 上运行，你必须从源代码重新构建你的应用程序。
- 一种让原生 Windows 应用程序自动感知 UNIX® 功能（如signal、pty 等）的方法。同样，如果你想利用 Cygwin 的功能，你需要从源代码构建你的应用程序。

### MinGW

MinGW ("Minimalist GNU for Windows"), 是一个免费开源的软件开发环境，用于创建 Microsoft Windows 应用程序。

它出现的时间相当早,在 1998 年就已经诞生了雏形

> 在 1998 年，Colin Peters 编写了最初的版本，那时它只包含了一个 Cygwin 版本的 GCC。 Jan-Jaap van der Heijden 创建了一个 Windows 本地版本的 GCC，并添加了 binutils 和 make。Mumit Khan 后来接管了开发工作。

在 2000 年，该项目迁移到 SourceForge，并在 2005 年 9 月被选为 SourceForge 的月度项目。

在 2018 年，由于与 SourceForge 关于邮件列表管理的分歧，MinGW 迁移到了 OSDN。

相比 [Cygwin](#cygwin), 这个项目已经式微，原来的官网 mingw.org 已经无法访问，取而代之的是 OSDN 上的 <https://osdn.net/projects/mingw>

尽管还有缓慢的更新，但是它的各方面都已经落后了，如今基本也不会有人推荐

平常我们说的和遇到的 MinGW，一般指的是 MinGW-w64

### MinGW-w64

在 2007 年，原来的 MinGW 的一个分支 MinGW-w64 出现了，以支持 64 位和新的 API。从那时起，它就被广泛的使用和分发。

MinGW-w64 是原来的 mingw.org 项目的一个分支。它在 2007 年 fork 了原来的项目，以支持 64 位和新的 API。从那时起，它就被广泛的使用和分发。

#### 一个小故事

原来的 MinGW 开发进展缓慢，它的开发者甚至不考虑添加 64 位目标生成支持。一个雄心勃勃的家伙，Kai Tietz，于是 fork 了原来的项目，因为他的公司需要在 Windows 上构建 64 位目标。这就是 MinGW-w64 项目的诞生。

尽管最初的目标只是添加 64 位支持，但开发人员在许多方面改进了工具链，并解决了大量其他问题。从那时起，MinGW-w64 项目已经发展壮大，现在在质量方面远远领先于 MinGW。

当 MinGW-w64 提议 MinGW 加入他们的行列来共同合作时，MinGW 的开发人员给出了不好的反应，并拒绝了合作。结果，今天就有两个名字容易引起混淆的项目，但在质量和支持方面的差异是显而易见的。

#### **MinGW-w64 并不包含 gcc 编译器**

实际上，我们到现在也可以看到，我们说的 MinGW-w64，其实严格来说是不包含 gcc 编译器的，MinGW-w64 项目主要提供的是 修改过的 头文件、库文件、运行时等等。但是大多数的 personal build 都会包含 gcc 编译器，以及其它诸多工具，甚至还会包含 LLVM/Clang 等等。这也就意味着，这些 build 不一定要有 gcc，只有 LLVM/Clang 也是存在的

#### MinGW-w64的众多Build

事实上，MinGW-w64 项目本身并不是一个软件发行版。它几乎只提供源码，基本所有的 MinGW-w64 的用户都是使用其他人编译好的 personal build。

- 官网推荐的 personal build (win 平台下)有:

  - [MinGW-builds](https://github.com/niXman/mingw-builds-binaries) 由 `niXman` 等人维护, 提供 GCC with MinGW-W64 ，并且提供了一个在线图形化安装包
  - [WinLibs (强烈推荐)](https://winlibs.com/)，由 `Brecht Sanders` 提供，同时有包括 GCC + LLVM + MinGW-w64 的版本，和不包括 LLVM/Clang 的版本，只提供压缩包 (维护者认为这样更 portable)
  - [LLVM-MinGW](https://github.com/mstorsjo/llvm-mingw) 一个基于LLVM/Clang/LLD 的 mingw-w64 工具链，显然 **不包含 gcc**

- 其它的比较及时的 build 但是没在官网上列出来:
  - [Equation Solution](http://www.equation.com/servlet/equation.cmd?fa=fortran) 提供一个自解压程序，可以用压缩软件打开来手动解压，或者是自动安装，值得一提的是，它提供一个快照版，提供相当新的 gcc 编译器(现在是 2023 年，gcc 14)，不过稳定性不做保证，而且其实 WinLibs 也提供了一个快照版

- 其它平台的 MinGW-w64 build

  是的，MinGW-w64 并不包含 gcc，而是一套头文件、库文件、运行时，这也就意味着你可以在其它平台上，如 Linux、Cygwin、docker、MSYS2 下来使用，交叉编译出可以在 windows 下原生运行 ( 不需要附加 dll ) 的程序
  
  官网推荐了这些 <https://www.mingw-w64.org/downloads/>

- 理论上更新最及时的 build

  - [MSYS2](https://www.msys2.org/) 虽然严格来说 MSYS2 包含更多的东西，但是它提供了一个几乎是最新的 MinGW-w64 的 build

- 更新缓慢的 build:

  - [SourceForge 上的(官方?) build](https://sourceforge.net/projects/mingw-w64/files/) 版本很老，GCC 的版本最新是 8.1，然而如今 2023 年，GCC 的版本已经到 13 了，很多教程似乎都指向这里，而且如果硬要有一个 `官方 build`,那也只能是这个了
  - [tdm-gcc](https://jmeubank.github.io/tdm-gcc/) 由`John E. / TDM` 一人维护，Code::Blocks 内置的就是这款，其上一次更新是 2021 年，gcc 10.3 , 比较慢了，值得一提的是，TDM-GCC 相比其它的 build 有一个不同之处
    > 它和其它编译套装有些不同。最重要的是，它将默认的 GCC 运行时库更改为静态链接，并使用共享内存区域处理异常。
  
  - [MinGW Distro - nuwen.net](https://nuwen.net/mingw.html) 同样，上一次更新在 2021 年，包含了 GCC 11.2.0 和 Boost 等许多库

### MSYS2

MSYS2 是 MinGW-w64 的姊妹项目。（是的，它们俩几乎是一家人）

> 还记得前文说过， MinGW-w64 官方已经很久没有更新二进制源码分发了吗？据说就是因为社区现在的重心都在 MSYS2 上，而 MSYS2 中就会有最及时的 MinGW-w64 build

MSYS2 是 MSYS 的独立重写，基于现代的 Cygwin 和 MinGW-w64，旨在与 native Windows 软件更好地互操作。

这个名字是 Minimal SYStem 2 的缩写，旨在提供支持，以便使用 bash shell、Autotools、版本控制系统等来使用 MinGW-w64 工具链构建本机 Windows 应用程序。并移植了 Pacman (来自 Arch Linux) 作为包管理系统来提供简单的软件包安装

#### 与 Cygwin的关系

Cygwin 是 Windows 上的 POSIX 平台（Win32 子系统），运行在用户模式下。它在运行时需要一个 POSIX 兼容层。它不是 Linux 的仿模拟器，也不是 WSL。

我们希望 MSYS2 被视为 Cygwin 的一个补充分支（甚至希望被 Cygwin 的开发人员接受！），我们仍然希望 MSYS2 有一天可以作为 Cygwin 的特殊模式运行（通过 DLL 插件机制）。

#### 与MinGW-w64

MinGW 是 Minimalist GNU for Windows 的缩写。MinGW 的想法是为 Windows 提供一个开发平台，用于构建跨平台应用程序。重要的部分是:

一个 FOSS Windows 特定的头文件和导入库，它们使得可以使用 Windows API，
一个补充库和一个运行时，填补了一些空白。但这个术语通常包括跨平台的 GNU 开发工具:

- GNU Compiler Collection (GCC),
- GNU Binutils (assembler, linker, archive manager),
- GNU Debugger (GDB),
- and miscellaneous utilities.

至少有两个项目在实现这个想法:

- 原始的 MinGW 项目，有时被称为 mingw.org
- MinGW-w64 项目，它本身并不是一个软件发行版。有多个 mingw-w64 工具链的构建版本，以及使用 MinGW-w64 构建的多个软件发行版。

### **MinGW 和 MinGW-w64 不是同一个项目**

MinGW 是一个软件发行版和开发平台。它附带了 MSYS，一个旧的 Cygwin 分支。MSYS2 和 MinGW-w64 项目与 MSYS 和 MinGW 无关，除了名称和共同目标之外。

MSYS2 是 MSYS 和 MinGW 的精神继承者。MSYS 虽然确实有用，但是它真的很老了，而且妨碍了开发人员。MSYS2 是为了取代原来的 MSYS 而创建的，同时避免了它的问题。

## 中场总结 GCC

如果你的代码使用 posix api，想得到linux兼容性比较高的程序，那么就稍加修改，使用 msys-2.0.dll或者cygwin1.dll

如果你没有这些需求，那用 MinGW-w64 搭配一款编译器 (gcc 或者 clang)

最简单的方法就是找一个靠谱、及时的社区 build

推荐 [WinLibs (强烈推荐)](https://winlibs.com/)，提供一整套工具链 (GCC + LLVM + MinGW-w64 已经一些 GNU 套件)

或者你也可以在 MSYS2 中下载 MinGW-w64，更新最及时，毕竟它们一家人

> 值得一提的是在 cygwin 或者 MSYS2中 gcc 一般会找到两个版本，不带 MinGW 后缀的就是通过调用 msys2 或者 cygwin 的 dll的，带 MinGW 后缀的自然就是后面又链接的 MinGW-w64的库，显然，少了一层模拟层，效率会高不少

如果想在 Windows 上用 bash sed grep awk 等等一系列强大的工具，那么cygwin和msys2还是非常有必要装一个的。什么？你要用 WSL2？那好吧，不过 IO 效率恐怕会是个问题

## Win 下 Clang 的两种编译器后端

Win 下的 Clang 有两种编译器后端：

- MSVC
- GCC，严格来说是，一般是 MinGW-w64

如果想使用前者的话，下载 Visual Studio Installer，在负载里面勾选上就好，然后在 VS 的项目设置里把编译前端改为 Clang，这里就不赘述了，网上的教程很全

如果是后者的话，我们当然可以从 LLVM 开始自己构建，不过最简单的还是去找 MinGW-w64 社区构建的懒人包，比如 LLVM-MinGW 或者 WinLibs，参见[这里](MinGW-w64的众多Build)

如果你想自己构建，那么可以参考 [这里](https://clang.llvm.org/get_started.html)

## posix、线程模型、ABI 以及其他

当你仔细观察 MinGW-w64 的 Build 的名字，你会发现许多名词

### x86_64 vs i686

前者是 64 位，后者是 32 位

### posix vs win32 vs MCF

这里的指的是线程库
Windows 上的 GCC 可以使用以下线程库构建:

- POSIX (最好的兼容性)
- WIN32 (原生 Windows 线程，但是缺少 POSIX 线程 / pthread.h)
MCF (since GCC 13, see also: MCF Gthread Library)
- MCF (从 GCC 13 开始支持了,参见 [MCF Gthread Library](https://github.com/lhmouse/mcfgthread/) )

### sjlj vs dwarf vs seh

这里的指的是异常处理

- sjlj (setjmp/longjmp) 32 位和 64 位都能用即使不抛出exception，也会造成较小的性能损失（在exception大的代码中约为15％） – 允许exception遍历例如窗口callback
- dwarf (DW2，dwarf-2): 只有32位可用, 没有永久的运行时间开销, 需要整个调用堆栈被启用，这意味着exception不能被抛出，例如Windows系统DLL。
- SEH: (zero overhead exception) 只可用于64位

这张图片说的不错，来源为 [这里](https://img2022.cnblogs.com/blog/871381/202208/871381-20220824185140178-1269533179.png)

![sjlj vs dwarf vs seh](https://cdn.statically.io/gh/Jenway/J-figure-Bed/main/post/2023/life/kita.jpg)

### MSVCRT 与 UCRT

前者很老了，后者是新的而且更好，但是后者只有 Windows 10 及以上才有

在 Microsoft Windows 上有两种不同的 C 标准库

**MSVCRT** (Microsoft Visual C++ Runtime) 在所有的 Windows 版本都是可用的，但是它因为历史原因已经很落后，不支持 C99 标准并且缺失了一些 特性

- 它不支持 C99 标准，比如 printf() 家族，但是...
- MinGW-w64 提供了一些替代函数，使得在许多情况下都可以兼容 C99
- It doesn't support the UTF-8 locale
- 它不支持 UTF-8 本地化
- 由于内部结构和数据类型不同，使用 MSVCRT 链接的二进制文件不应该与使用 UCRT 链接的二进制文件混合。 (更严格地说，不同目标的目标文件或静态库不应该混合。使用不同 CRT 构建的 DLL 可以混合，只要它们不跨 DLL 边界共享 CRT 对象，例如 FILE*。) 对于 MSVC 编译的二进制文件也适用相同的规则，因为 MSVC 默认使用 UCRT 。
- 在所有的 Windows 版本都是可用的

**UCRT** (Universal C Runtime) 是一个较新的版本，它也是 Microsoft Visual Studio 的默认版本

与 MSVC 的兼容性更好，无论是在构建时还是在运行时。它只在 Windows 10 及以上默认提供，对于旧版本，你必须自己提供它，或者确保用户已经安装了它。

## 总结

- Cygwin 提供了一个类 posix API 的兼容层 (通常是一个动态链接库 .dll 文件)，glibc 仍然调用 posix API，但是这个 posix API (如 cygwin1.dll) 会调用 Win API。
- MinGW 基本已经成为历史了，MSYS 也是
- MinGW-w64 提供了一套头文件、库文件、运行时，使得 glibc 调用的是 Win API。
- MinGW-w64 基本只发布源码，二进制的发布大多都是社区的 personal build
- Brent Sanders 的 WinLibs 是一个很赞的 personal build，它提供了 GCC + LLVM + MinGW-w64 以及一些 GNU 套件
- MinGW-w64 并不包含 gcc 编译器，但是大多数的 personal build 都会包含 gcc 编译器，以及其它诸多工具，甚至还会包含 LLVM/Clang 等等。
- MSYS2 是 Cygwin 的独立重写，基于现代的 Cygwin 和 MinGW-w64，旨在与 native Windows 软件更好地互操作。
- MSYS2 是 MinGW-w64 的姊妹项目，它提供了一个包管理器，可以方便的安装最新的 MinGW-w64
- Windows 下 Clang 有两种编译器后端：MSVC 和 GCC (MinGW-w64)
- Cygwin: Get that Linux feeling - on Windows
- MinGW-w64: A Complete Runtime Environment for gcc & LLVM for 32 and 64 bits Windows
- MSYS2: Software Distribution and Building Platform for Windows

## 参考资料

<https://en.wikipedia.org/wiki/MinGW>
<https://mingw-w64.org/>
<https://stackoverflow.com/questions/19425482/windows-c-compiler-with-full-c11-support-should-work-with-qt>
<https://jmeubank.github.io/tdm-gcc/>
<https://github.com/niXman/mingw-builds-binaries>
<https://github.com/mstorsjo/llvm-mingw>
<https://winlibs.com/>
<https://nuwen.net/mingw.html>
<http://www.equation.com/servlet/equation.cmd?fa=fortran>
<https://www.cnblogs.com/feipeng8848/p/15227688.html>
<https://www.msys2.org/docs/environments/#msvcrt-vs-ucrt>
<https://www.msys2.org/docs/what-is-msys2/>
<https://www.msys2.org/wiki/History/>

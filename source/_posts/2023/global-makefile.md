---
title: "make hello" -- 全局 Makefile 模式匹配
tags:
  - make
  - makefile
hidden: false
abbrlink: 4a5195d4
date: 2023-09-25 23:49:19
catagories: 技术杂谈
categories: 开发记录
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这个博客将会介绍如何编写全局的 makefile 模式匹配，用来替换默认的隐式规则。

最终你可以直接使用 `make hello` 来编译 `hello.c` 文件、`hello.tex` 文件等等，而不用再写更长的编译命令。

同时，你还可以自定义这里的编译器，编译选项等等，甚至增加新的模式匹配。

## 内置隐式规则 (Built-in Implicit rules )

实际上，你很可能已经使用过内置的隐式规则了，假如当前目录下有一个 `hello.c` 文件，那么你可以直接使用 `make hello` 来编译它，这就是一个隐式规则。

隐式规则可以自动推导出目标文件的依赖关系，比如 `hello.o` 依赖于 `hello.c`，并且可以自动推导出命令，比如 `gcc -c hello.c -o hello.o`。如果是 `.cpp` 文件，那么命令就是 `g++ -c hello.cpp -o hello.o`。

> 某些标准的方式经常用于重新制作目标文件。例如，一种常见的制作目标文件的方式是使用 C 编译器从 C 源文件制作目标文件。
>
> 隐式规则告诉 make 如何使用惯用的技术，这样当你想使用它们时，你就不必详细地指定它们。例如，有一个隐式规则用于 C 编译。文件名决定了要运行哪些隐式规则。例如，C 编译通常需要一个 .c 文件并生成一个 .o 文件。因此，当它看到这种文件名组合时，make 就会应用 C 编译的隐式规则。
>
> 内置的隐式规则在它们的配方中使用了几个变量，这样，通过改变变量的值，你可以改变隐式规则的工作方式。例如，变量 CFLAGS 控制着 C 编译的隐式规则给 C 编译器的标志。
> 你可以通过编写模式规则来定义自己的隐式规则。后缀规则是一种更有限的定义隐式规则的方法。模式规则更通用、更清晰，但是后缀规则是为了兼容性而保留的。
> -- 参见 [GNU make manual -- Implicit-Rules](https://www.gnu.org/software/make/manual/html_node/Implicit-Rules.html)

### 模式规则 ( Pattern Rules )

模式匹配 (Pattern Match) 是 makefile 中的一种特殊规则，它可以匹配所有的目标文件。

> 你可以通过编写模式规则来定义自己的隐式规则。一个模式规则看起来像一个普通的规则，除了它的目标包含了一个 `%` 字符 ( 只有一个 )。目标被认为是匹配文件名的模式；`%` 可以匹配任何非空的子字符串，而其他字符只能匹配它们自己。前提条件同样使用 `%` 来显示它们的名称与目标名称的关系。
>
> 因此，模式规则 `%.o : %.c` 表示如何从另一个文件 `stem.c` 制作任何文件 `stem.o`。
>
> 请注意，在模式规则中使用 `%` 进行扩展时，会在任何变量或函数扩展之后进行，这些变量或函数扩展是在读取 makefile 时进行的。

参见 [GNU make manual -- Pattern-Rules](https://www.gnu.org/software/make/manual/html_node/Pattern-Rules.html)

## 我为什么需要手动编写模式匹配

我需要手动编写隐式规则的原因很简单，我现在在`windows`下使用 Brecht Sanders 的 WinLibs (mingw-winlibs-llvm-ucrt-mcf), 它提供了一个 MinGW-make.exe，但是它的隐式规则有点问题。

例如，当源文件为 `.c` 时，它默认调用 `cc`,当然，我可以整个 alias 什么的，但是假如是 `.cpp` ，他会直接调用错误的路径。

而我平常是习惯，当我在写单文件时直接手动写个 `make hello`，而不是写更长的编译命令。

而且，make 自带的隐式规则是不支持 latex 的，所以我需要自己编写一个隐式规则来支持 latex。

### makefile 的具体内容

> ! 请不要直接复制这个 makefile，或者至少在复制后确保你得到的 makefile 是采用的 tab 缩进，而不是空格缩进。
>
> 这非常重要，因为 makefile 的语法是依赖于 tab 缩进的，如果你使用空格缩进，那么 makefile 就会报错。

```makefile
# this file is build due to some bugs related to MinGW make
# this is a global makefile for make

CC = gcc
CFLAGS = -Wall -Wextra -pedantic -fexec-charset=GBK -g -O2 -std=c17
# CFLAGS = -Wall -Werror -Wextra -pedantic -fexec-charset=GBK -g -O2 -std=c17  

CPP = g++
CPPFLAGS = -Wall -Wextra -pedantic -fexec-charset=GBK -g -O2 -std=c++17
# CPPFLAGS = -Wall -Wextra -Werror -pedantic -fexec-charset=GBK -static-libstdc++ -g -O2 -std=c++17

PDFLATEX = pdflatex
# e.g. when type make hello, it will build hello.c
# and the output file will be hello

% : %.c
 $(CC) $(CFLAGS) -o $@ $<

# for c++ file

% : %.cpp
 $(CPP) $(CPPFLAGS) -o $@ $<

# for latex file
% : %.tex
 $(PDFLATEX) $@ $<
```

### 环境变量 MAKEFILES

现在我们有了一个全局的 makefile，但是我们还需要做一些事情，就是将这个 makefile 添加到环境变量中。

添加一个名为 `MAKEFILES` 的环境变量，它的值就是这个 makefile 的路径。

> ! 你必须用这个 `MAKEFILES` 这个名字，否则 make 是不会读取的。

#### The Variable MAKEFILES

如果环境变量 `MAKEFILES` 被定义了，那么 make 就会将它的值作为一个 makefile 的列表，这个列表中的每一个元素都是一个 makefile 的路径。这一点和 `include` 指令是一样的，make 会在这些路径中搜索这些 makefile。除此之外，make 也不会从这些 makefile 中读取默认的目标，也不会报错。

`MAKEFILES` 的主要用途是在递归调用 make 时进行通信。通常情况下，不应该在顶层调用 make 之前设置环境变量，因为最好不要从外部干扰 makefile。但是，如果你在没有指定 makefile 的情况下运行 make，那么 `MAKEFILES` 中的 makefile 可以做一些有用的事情，比如定义搜索路径。

有些用户会在登录时自动在环境中设置 `MAKEFILES`，并编写 makefile 以期望这样做。这是一个非常糟糕的想法，因为这样的 makefile 在其他用户运行时将无法工作。最好的办法是在 makefile 中编写显式的 include 指令。参见 Including Other Makefiles。

> 参加 [GNU make manual -- The Variable MAKEFILES](https://www.gnu.org/software/make/manual/html_node/MAKEFILES-Variable.html)

这个 makefile 的结构很简单，首先是定义了一些变量，然后是隐式规则。

#### 通配符 ( wildcard ) 与自动变量 ( automatic variable )

`% : %.c` 这里的 `%` 是通配符 ( wildcard )，它可以匹配所有的目标文件。

参见 [GNU make manual -- Pattern-Match](https://www.gnu.org/software/make/manual/html_node/Pattern-Match.html)

`$@` 和 `$<` 是自动变量 ( automatic variable )，$@` 代表了目标文件，`$<` 代表了依赖文件。

`$@` 和 `$<` 是 makefile 中的特殊符号，你可以在 [GNU make manual -- automatic-variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html) 中查看更多的特殊符号。

### 全局 makefile for latex

等等，你是不是还看到了一个奇怪的东西，就是最后的那个 `% : %.tex`，这是我为了编译 latex 文件而写的，因为我不想每次都写 `pdflatex hello.tex hello.pdf`。

添加了这个隐式规则之后，我就可以直接使用 `make hello` 来编译 `hello.tex` 文件了，是不是很方便。

这也暗示了一种使用方法，你可以根据自己的需求，编写自己的隐式规则，让你的全局 makefile 更加强大。

关于 latex 这里的灵感，是来自于 [Stackoverflow -- is-there-a-way-to-define-global-makefile-implicit-rules](https://stackoverflow.com/questions/69115581/is-there-a-way-to-define-global-makefile-implicit-rules)。

## 最终效果

其实，这里并不算是隐式规则了，而是我们编写了一个全局的模式规则，这个模式规则可以匹配所有的目标文件。

不过，就效果而言，它和隐式规则是一样的，你可以直接使用 `make hello` 来编译 `hello.c` 文件。

同时，这样的好处是，你可以在全局 makefile 中定义一些全局的变量，比如编译器，编译选项等等。

你甚至还可以定义自己的规则，比如编译 latex 文件等。

```bash
$ make hello
gcc -Wall -Wextra -pedantic -fexec-charset=GBK -g -O2 -std=c17 -o hello hello.c
```

实际上，这种做法是完全符合官方的遇见的

> You can override a built-in implicit rule (or one you have defined yourself) by defining a new pattern rule with the same target and prerequisites, but a different recipe.

参见 [GNU make manual -- Canceling-Rules](https://www.gnu.org/software/make/manual/html_node/Canceling-Rules.html)

## 参考资料

- [GNU make manual -- Automatic-Variables]( https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
- [GNU make manual -- The Variable MAKEFILES](https://www.gnu.org/software/make/manual/html_node/MAKEFILES-Variable.html)
- [Stackoverflow -- is-there-a-way-to-define-global-makefile-implicit-rules]( https://stackoverflow.com/questions/69115581/is-there-a-way-to-define-global-makefile-implicit-rules)
- [GNU make manual -- Implicit-Rules]( https://www.gnu.org/software/make/manual/html_node/Implicit-Rules.html)
- [GNU make manual -- Pattern-Rules]( https://www.gnu.org/software/make/manual/html_node/Pattern-Rules.html)
- [GNU make manual -- Pattern-Match]( https://www.gnu.org/software/make/manual/html_node/Pattern-Match.html)
- [GNU make manual -- Canceling-Rules](https://www.gnu.org/software/make/manual/html_node/Canceling-Rules.html)

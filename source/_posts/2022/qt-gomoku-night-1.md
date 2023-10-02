---
title: 用 Qt 写五子棋的夜晚 一
tags:
  - Qt
  - C++
hidden: false
abbrlink: 8db9eb9
date: 2022-12-02 18:12:36
catagories: 开发记录
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这篇 Blog 将会记录我用 Qt 写五子棋的过程，以及遇到的一些问题和解决方法。

大一上的计算导论的结课大作业，是要求我们用 C/C++ 写一个五子棋游戏。

## 简单的控制台版本

我们可以十分简单的用控制台来实现一个五子棋，这种 UI 常被称为 TUI (Text-based User Interface)。

我们需要用到一些特殊字符，它们被称为 ANSI 转义序列，可以用来控制控制台的输出。

> ANSI转义序列（ANSI escape sequences）是一种带内信号的转义序列标准，用于控制视频文本终端上的光标位置、颜色和其他选项。在文本中嵌入确定的字节序列，大部分以ESC转义字符和`[`字符开始，终端会把这些字节序列解释为相应的指令，而不是普通的字符编码。

这里列一个表格，方便以后查阅：

| 转义序列 | 含义 |
| --- | --- |
|`\e[1;1H` |将光标移动到终端的第一行第一列（即屏幕的左上角位置）|
| `\e[2J` | 清屏 |
| `\e[?25l` | 隐藏光标 |
| `\e[?25h` | 显示光标 |

|颜色序列|含义|
| RESET | `\x1b[0m`|
| RED | `\x1b[31m` |
| GREEN | `\x1b[32m` |
| YELLOW | `\x1b[33m` |
| BLUE | `\x1b[34m` |
| MAGENTA | `\x1b[35m` |
| CYAN | `\x1b[36m` |
| WHITE | `\x1b[37m` |

### 简单的实现

With ANSI escape sequences, we can easily draw a simple board of Gomoku.

```c
#include <stdio.h>

// ANSI颜色代码
#define ANSI_COLOR_RESET "\x1b[0m"
#define ANSI_COLOR_RED "\x1b[31m"
#define ANSI_COLOR_BLUE "\x1b[34m"
// ANSI 转义序列
#define ANSI_CURSOR_HOME "\e[1;1H"
#define ANSI_CLEAR_SCREEN "\e[2J"
// 定义棋盘大小
#define BOARD_SIZE 15
// 定义棋盘数组，0表示空，1表示黑子，2表示白子
int board[BOARD_SIZE][BOARD_SIZE] = {0};

// 清空屏幕
void clearScreen() {
    printf(ANSI_CURSOR_HOME);
    printf(ANSI_CLEAR_SCREEN);
}

// 绘制棋盘
void drawBoard() {
    clearScreen();
    printf("五子棋游戏\n\n");
    printf("  ");
    for (int i = 0; i < BOARD_SIZE; i++) {
        printf("%2d ", i + 1);
    }
    printf("\n");
    for (int i = 0; i < BOARD_SIZE; i++) {
        printf("%2d", i + 1);
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == 0) {
                printf(" . ");
            } else if (board[i][j] == 1) {
                printf(ANSI_COLOR_BLUE " X " ANSI_COLOR_RESET);
            } else if (board[i][j] == 2) {
                printf(ANSI_COLOR_RED " O " ANSI_COLOR_RESET);
            }
        }
        printf("\n");
    }
    printf("\n");
}
```

接下来就是无聊的循环，输入判断了，输赢判断了。

有的人或许会想要引入鼠标，这样的话，在 Windows 平台下，就要使用 `Windows.h` 了，这个头文件是 Windows API 的一部分，这里就不展开了。

## 让我们进入 GUI 的世界吧

### Install Qt

Qt 采用了 LGPL (Lesser General Public License) 协议，这意味着我们可以免费使用 Qt，但是我们的代码也必须开源。

不过，从 Qt 5.15 开始， Qt 不再提供离线安装包，我们需要通过 Qt 的在线安装程序来安装 Qt。

如果是用在线安装的方式安装 Qt，我们需要注册一个 Qt 账号，这个账号是免费的，注册地址是：[https://login.qt.io/register](https://login.qt.io/register)

### 几种 Qt 安装的方式

除了直接下载 Windows 平台的 Qt，我们还可以在 MSYS2 中安装 Qt.

如果在 MSYS2 中安装, 默认的包管理器是 pacman。

### 记得安装对应的编译器

如果下载的是 MinGW 版本的 Qt，那么我们需要安装对应的编译器。

如果下载的是 MSVC 版本的 Qt，那么我们需要安装对应的 MSVC。

### 几种 开发 Qt 的方式

- Qt Creator
- Visual Studio + Qt Visual Studio Tools

虽然很想用 VScode 来开发 Qt，但是在这方面，VScode 确实不怎么够用。

这里我的主要开发环境是 Qt Creator，作为 Qt 官方的 IDE，Qt Creator 在开发 Qt 应用上的体验是很不错的。

你可以使用拖拽的方式来设计 UI，也可以使用代码的方式来设计 UI。

当然了，Qt Creator 的 Debug 功能还是要弱一点，所以我还是会使用 VS 来 Debug。

### 构建方式

Qt 有两种构建方式，一种是使用 qmake，另一种是使用 CMake。

这里我下载的 Qt 并不是很新的版本，Qt Creator 默认会使用 qmake 来构建项目。

### 项目结构

这个项目的结构是这样的：

``` bash
.
├── build-qt-gomoku-Desktop_Qt_5_15_2_MinGW_64_bit-Debug
│   ├── icon
│   │   └── icon.ico
│   ├── .gitignore
│   ├── README.MD
│   ├── logo.rc
│   ├── icon.qrc
│   ├── gomoku.pro
│   ├── gomoku.pro.user
│   ├── main.cpp
│   ├── mainwindow.h
│   ├── mainwindow.cpp
│   ├── mainwindow.ui
│   ├── start.h
│   ├── start.cpp
│   ├── start.ui
│   ├── gameover.h
│   ├── gameover.cpp
│   ├── gameover.ui
│   ├── history.h
│   ├── history.cpp
│   ├── history.ui
│   ├── historyboard.h
│   ├── historyboard.cpp
│   ├── historyboard.ui

```

## 事件 (Event System)

在 Qt 中，事件是一些从抽象类 QEvent 派生出来的对象，它们代表了在应用程序中发生的事情，或者是应用程序需要知道的外部活动的结果。事件可以被任何 QObject 子类的实例接收和处理，它们对于小部件来说尤其重要。

### 事件是如何被传递的

当一个事件发生时，Qt 会创建一个事件对象来代表它，这个事件对象是 QEvent 的子类的实例，然后通过调用 QObject 的 event() 函数来将这个事件传递给 QObject 的实例。

这个函数并不会处理事件本身，它会根据事件的类型来调用一个特定类型的事件处理器，并根据事件是否被接受或者被忽略来发送一个响应。

有些事件，比如 QMouseEvent 和 QKeyEvent，来自于窗口系统；有些，比如 QTimerEvent，来自于其他的源；有些来自于应用程序本身。

### 事件的类型

多数事件类型都有特殊的类，比如 QResizeEvent, QPaintEvent, QMouseEvent, QKeyEvent, 和 QCloseEvent。每个类都继承自 QEvent 并且添加了特定的事件处理函数。比如，QResizeEvent 添加了 size() 和 oldSize() 函数来让小部件可以发现它们的尺寸是如何被改变的。

有些类支持多个事件类型。QMouseEvent 支持鼠标按钮的按下，双击，移动，和其他相关的操作。

每个事件都有一个关联的类型，定义在 QEvent::Type 中，这可以作为一个方便的运行时类型信息的来源，来快速的确定一个事件对象是从哪个子类构造出来的。

为了满足程序多样化和复杂的反应，Qt 的事件传递机制是十分灵活的。

### 事件处理器

一个事件被处理的通常方式是通过调用一个虚函数。比如，QPaintEvent 通过调用 QWidget::paintEvent() 来被处理。这个虚函数负责适当的反应，通常是重绘小部件。如果你没有在你的虚函数的实现中完成所有必要的工作，你可能需要调用基类的实现。

比如，下面的代码处理了自定义复选框小部件上的鼠标左键点击，同时将其他的按钮点击传递给基类 QCheckBox：

``` cpp
void MyCheckBox::mousePressEvent(QMouseEvent *event)
{
    if (event->button() == Qt::LeftButton) {
        // handle left mouse button here
    } else {
        // pass on other buttons to base class
        QCheckBox::mousePressEvent(event);
    }
}
```

如果你想要替换基类的函数，你必须自己实现所有的东西。然而，如果你只想要扩展基类的功能，那么你只需实现你想要的，调用基类来处理那些默认行为。

有时，没有这样的事件特定的函数，或者事件特定的函数不够用。最常见的例子涉及 Tab 键的按下。通常，QWidget 拦截这些来移动键盘焦点，但是一些小部件却需要 Tab 键。

这些对象可以重新实现 QObject::event()，通用的事件处理器，要么在通常的处理之前或之后做他们的事件处理，要么完全替换这个函数。如果一个功能很多的小部件，它既处理 Tab 键事件，又处理一个应用程序特定的自定义事件，可能包含以下事件()函数：

``` cpp
bool MyWidget::event(QEvent *event)
{
    if (event->type() == QEvent::KeyPress) {
        QKeyEvent *ke = static_cast<QKeyEvent *>(event);
        if (ke->key() == Qt::Key_Tab) {
            // special tab handling here
            return true;
        }
    } else if (event->type() == MyCustomEventType) {
        MyCustomEvent *myEvent = static_cast<MyCustomEvent *>(event);
        // custom event handling here
        return true;
    }

    return QWidget::event(event);
}
```

注意，QWidget::event() 仍然被调用，以处理所有没有处理的情况，返回值表示一个事件是否被处理；一个 true 值阻止事件被发送到其他对象。

### 事件过滤器

有时，一个对象需要查看，甚至是拦截，被传递给另一个对象的事件。比如，对话框通常想要过滤一些小部件的按键；比如，修改回车键的处理。

QObject::installEventFilter() 函数通过设置一个事件过滤器来实现这个功能，这个过滤器对象会在它的 QObject::eventFilter() 函数中接收到目标对象的事件。一个事件过滤器可以在目标对象之前处理事件，允许它检查和丢弃事件。一个已经存在的事件过滤器可以通过 QObject::removeEventFilter() 函数来移除。

当过滤器对象的 eventFilter() 实现被调用时，它可以接受或者拒绝事件，并且允许或者拒绝事件的进一步处理。如果所有的事件过滤器都允许事件的进一步处理（通过返回 false），事件会被发送到目标对象本身。如果其中一个停止处理（通过返回 true），目标和任何后续的事件过滤器都不会看到这个事件。

``` cpp
bool FilterObject::eventFilter(QObject *object, QEvent*event)
{
    if (object == target && event->type() == QEvent::KeyPress) {
        QKeyEvent *keyEvent = static_cast<QKeyEvent*>(event);
        if (keyEvent->key() == Qt::Key_Tab) {
            // Special tab handling
            return true;
        } else
            return false;
    }
    return false;
}
```

上面的代码展示了另一种拦截 Tab 键按下事件的方法。在这种情况下，过滤器处理了相关的事件，并且返回 true 来阻止它们被进一步处理。所有其他的事件都会被忽略，过滤器返回 false 来允许它们被发送到目标小部件，通过任何其他安装在它上面的事件过滤器。

也可以通过在 QApplication 或者 QCoreApplication 对象上安装事件过滤器来过滤整个应用程序的事件。这样的全局事件过滤器会在对象特定的过滤器之前被调用。这是非常强大的，但是它也会减慢整个应用程序中每个事件的传递；通常应该使用其他的技术。

### 传递事件

许多应用程序想要创建和发送它们自己的事件。你可以通过构造合适的事件对象并且使用 QCoreApplication::sendEvent() 和 QCoreApplication::postEvent() 来发送它们，就像 Qt 自己的事件循环一样。

sendEvent() 立即处理事件。当它返回时，事件过滤器和/或对象本身已经处理了事件。对于许多事件类，有一个叫做 isAccepted() 的函数，它告诉你最后一个被调用的处理器是否接受或者拒绝了事件。

postEvent() 将事件发布到队列中以供稍后分发。下一次 Qt 的主事件循环运行时，它会分发所有发布的事件，使用一些优化。比如，如果有几个 resize 事件，它们会被压缩成一个。对于 paint 事件也是一样的：QWidget::update() 调用 postEvent()，这样可以避免闪烁并且通过避免多次重绘来提高速度。

postEvent() 也被用于对象初始化，因为发布的事件通常会在对象初始化完成后很快被分发。当实现一个小部件时，重要的是要意识到事件可以在它的生命周期的早期被传递，所以在它的构造函数中，一定要在它接收到事件之前尽早初始化成员变量。

要创建自定义类型的事件，你需要定义一个事件号，它必须大于 QEvent::User，并且你可能需要继承 QEvent 来传递关于你的自定义事件的特定信息。查看 QEvent 文档来获取更多细节。

## 参考

- [ANSI转义序列](https://zh.wikipedia.org/wiki/ANSI%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)
- [The Event System | Qt core 6.5.3](https://doc.qt.io/qt-6/eventsandfilters.html)

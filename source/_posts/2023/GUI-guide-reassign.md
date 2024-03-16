---
title: 很不专业的 GUI 框架乱谈
tags:
  - GUI
hidden: true
abbrlink: '42862714'
catagories: 伪计算机史学家
date: 2023-12-28 22:35:53
---

<meting-js
    server="netease"
    type="song"
    autoplay="false"
    id="509106602">
</meting-js>

书接上文，趁着水认知实习报告的功夫，重新修订一下之前的 GUI 框架有关的博客

> 图形用户界面 (Graphical User Interface, GUI), 又称图形用户接口,是一种人与计算机通信的界面显示格式，允许用户使用鼠标等输入设备操纵屏幕上的图标或菜单选项，以选择命令、调用文件、启动程序或执行其它一些日常任务。在图形用户界面，用户看到和操作的都是图形对象，应用的是计算机图形学的技术。

关于 GUI ,度娘百科如是说道。

做图形界面，一般而言是要借助某个 GUI 开发框架来开发... 什么, 你要直接调用操作系统原生 API ? 额 ...好像也不是不行?

> 但是，真的要那样做吗...

## Windows 平台上的 图形界面开发

让我们先只关注于 Windows 平台上的 图形界面开发

### 从Win32 API 开始说起

```QUOTE
提问：有 Win32 API 那有没有 Win64 API 呢?

回答：并没有。Win32并不是指 32 位 Windows，而是现代 NT 内核 Windows 的统称。
```

Windows应用程序编程接口 ( Windows Application Programming Interface) ,是 Windows 操作系统提供给应用程序编程的接口。

Win32 API 并不只是图形接口，实际上 Win32API包含用户界面、Windows环境 (Shell)、用户输入和消息传送、用户输入和消息传送、诊断、图形和多媒体、设备、系统服务、安全和标识、应用程序安装和服务、系统管理员和管理、网络和 Internet等等一系列接口，具体可以在微软官网的[Windows API 索引](https://learn.microsoft.com/zh-cn/windows/win32/apiindex/windows-api-list)中找到。

一个可能的简单示例是这样的

``` C
#ifndef UNICODE
#define UNICODE
#endif 

#include <windows.h>

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow)
{
    // Register the window class.
    const wchar_t CLASS_NAME[]  = L"Sample Window Class";
    
    WNDCLASS wc = { };

    wc.lpfnWndProc   = WindowProc;
    wc.hInstance     = hInstance;
    wc.lpszClassName = CLASS_NAME;

    RegisterClass(&wc);

    // Create the window.

    HWND hwnd = CreateWindowEx(
        0,                              // Optional window styles.
        CLASS_NAME,                     // Window class
        L"Learn to Program Windows",    // Window text
        WS_OVERLAPPEDWINDOW,            // Window style

        // Size and position
        CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,

        NULL,       // Parent window    
        NULL,       // Menu
        hInstance,  // Instance handle
        NULL        // Additional application data
        );

    if (hwnd == NULL)
    {
        return 0;
    }

    ShowWindow(hwnd, nCmdShow);

    // Run the message loop.

    MSG msg = { };
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return 0;
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;

    case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);

            // All painting occurs here, between BeginPaint and EndPaint.

            FillRect(hdc, &ps.rcPaint, (HBRUSH) (COLOR_WINDOW+1));

            EndPaint(hwnd, &ps);
        }
        return 0;

    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}
```

一眼看去 ，WinAPI 最大的特点莫过于它独特的变量命名法，这种向变量名称添加前缀以提供有关变量的其他信息的做法被称为匈牙利表示法 (符号的发明者查尔斯·西蒙尼是匈牙利人，由此得名) 。

使用 Win32 和 COM API 以 C++ 编写桌面程序，可以带来的自由度想必是极高的，当然，代价就是轮子都得自己造

将这些 API 不断的抽象封装，让我们可以避免重复造轮子，节省时间~~与头发~~

### MFC => 将 Win32 API 以类的形式进行封装

微软基础类 (Microsoft Foundation Classes , MFC)是一个用于在C++环境下编写应用程序的一个框架和引擎，针对大部分 Win32 和 COM API 提供面向对象的包装。

MFC 将大部分Win32 API进行封装，调用一个MFC函数，就相当于调用了很多Win32API。使用方便，但是隐藏了细节，在 MFC 时代 C++ 还处于 发展的早期阶段，因此，MFC算是十分经典~~老~~的技术，MFC 体现了它那个时代面向对象的趋势

> 面向对象和趋势联系在一起，果然很有年代感啊.

那么，怎么用 MFC 来写图形界面呢? 可以看看 《深入浅出MFC》 之类的书来试一试。

这里给出一个网络上的例子

```C++
#pragma once
#include <afxwin.h>//MFC需要包含的头文件
class MyApp : public CWinApp
{
public:
  //程序入口
  virtual BOOL InitInstance();
};
//窗口框架类
class MyFrame : public CFrameWnd
{
public:
  MyFrame();//窗口构造函数
  //使用消息映射声明宏
  DECLARE_MESSAGE_MAP();
  afx_msg void OnLButtonDown(UINT nFlags, CPoint point);//鼠标左键按下的处理
  afx_msg void OnChar(UINT nChar, UINT nRepCnt, UINT nFlags);//键盘声明
  afx_msg void OnPaint();//绘图声明
};
#include "mfc.h"
MyApp app;//应用程序的对象，有且仅有一个
BOOL MyApp::InitInstance()
{
  //创建窗口
  //MyFrame* frame = new MyFrame;
  m_pMainWnd = new MyFrame;
  //更新显示
  m_pMainWnd->ShowWindow(SW_SHOWNORMAL);
  m_pMainWnd->UpdateWindow();
  //m_pMainWnd = frame;//保存指向应用程序的主窗口的指针
  return TRUE;//返回正常的初始化
}
//消息映射分界宏
BEGIN_MESSAGE_MAP(MyFrame, CFrameWnd)
ON_WM_LBUTTONDOWN()//鼠标左键按下宏
ON_WM_CHAR()//键盘按下消息处理宏
ON_WM_PAINT()//绘图映射入口宏
END_MESSAGE_MAP()
//窗口框架的默认构造函数
MyFrame::MyFrame()
{
  Create(NULL, TEXT("MFC WINDOW"));
}
//鼠标左键按下的实现
void MyFrame::OnLButtonDown(UINT nFlags, CPoint point)
{
  CString str;
  //格式化字符串
  str.Format(TEXT(":::: x = %d, y = %d"), point.x, point.y);
  MessageBox(str);
}
//键盘事件处理实现
void MyFrame::OnChar(UINT nChar, UINT nRepCnt, UINT nFlags)
{
  TCHAR buf[1024];
  wsprintf(buf, TEXT("按下了 %c "), nChar);
  MessageBox(buf);
}
//绘图事件实现
void MyFrame::OnPaint()
{
  CPaintDC dc(this);//画到当前窗口
  //画文字
  dc.TextOutW(100, 100, TEXT("hello world!"));
  dc.Ellipse(10, 10, 100, 100);
}
```

引用知乎上的一段话

> [MFC最流行的时代是 VC6 时代的 MFC4.2，那个年代大约是 1996年。MFC的最后一个更新版本是 2010 年的 MFC10，至今已经十一年之久。如果你研究 MFC，你可能面对的是 25 年前的代码，以及一个 十一年前微软官方已经停止维护了的 编程框架。如果现在还能问出 MFC 是不是过时了的问题，那么我觉得，您应当确认一下您学的课程究竟是计算机科学史还是计算机科学。](https://www.zhihu.com/question/60773898/answer/1992193065)

### WTL (Windows Template Library)

Microsoft 基础类 (MFC) 通过 Win32 提供面向 C++ 对象的包装，以便实现本机桌面应用程序的快速开发。 活动模板库 (ATL) 是一个包装库，它简化了 COM 开发，广泛用于创建 ActiveX 控件。

WTL 是一系列 类，拓展了 ATL 以支持为应用程序或各种 UI 组件来实现更加复杂的用户界面，同时保留了 ATL 的优点——轻量快速

从网上随便找的例子

```C++
//stdfax.h:
#define STRICT
#define WIN32_LEAN_AND_MEAN
//#define _WTL_USE_CSTRING
#include <atlbase.h>  
#include <atlstr.h>  
#include <atlapp.h>  
extern CAppModule _Module;
#define _WTL_NO_CSTRING  
#include <atlwin.h>  
#include <atlmisc.h>  
#include <atlcrack.h>  
#include <atlframe.h>  
#include <atlctrls.h>  
#include <atldlgs.h>  
#include <atlwin.h>  
// main.cpp:
#include "stdafx.h"
CAppModule _Module;
int APIENTRY WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
 LPSTR lpCmdLine, int nCmdShow)
{
 _Module.Init(NULL, hInstance);
 MSG msg;

 while (GetMessage(&msg, NULL, 0, 0) > 0)
 {
  TranslateMessage(&msg);
  DispatchMessage(&msg);
 }
 _Module.Term();
 return msg.wParam;
}
while (GetMessage(&msg, NULL, 0, 0) > 0)
 {
  TranslateMessage(&msg);
  DispatchMessage(&msg);
 }
```

### C#/.NET 家族

#### C# 之父

安德斯·海尔斯伯格（Anders Hejlsberg），1960年12月出生于丹麦哥本哈根，曾在丹麦科技大学学习工程学，计算机科学家。Turbo Pascal编译器的主要作者，Delphi、C#和TypeScript之父，.NET(dotnet)创立者。

让我们把时间拉回到1996年，这一年，比尔·盖茨亲自主持了一场挖角行动，年薪三百万美金，并许诺安德斯·海尔斯伯格在微软将得到技术上的足够自由和资源支持。这场事件或许也是微软公司和Borland公司后续官司的导火索。

进入微软公司后，他首先主持了Visual  J++的开发工作，后来由于在Java开发工具授权问题上和Sun公司的纠纷，微软停止了Visual J++的后续开发。

在这之后，作为.Net概念的发起人之一，安德斯·海尔斯伯格被任命为微软.Net的首席架构师，主持.Net的开发工作。

.Net 最开始的版本叫做 .net Framework，版本号从 1.0 到 4.8，之后关闭，在其发展到 4.6 的时候，微软又推出了另一条 .net core 的产品线，2019 年，.NET Core 3.0 发布，这个版本代表着 .NET Core 已经彻底稳定下来，且它的生态圈和社区也发展地非常成熟。2020 年，为了避免产品线的混乱，微软开始统一产品线，关闭了 .NET Framework 这条产品线，并将 .NET Core 产品线更名为 .NET。为了避免与 .NET Framework 4.x 版本号冲突，.NET 产品线直接从版本号 5 开始，即 .NET 5.0，并于这一年 11 月正式发布。

#### Winforms

WinForms 的设计还是对系统的 Win32 API 进行简单的封装，它的界面描绘方式是拖拽的

#### WPF

WPF 的界面描绘方式是 XAML，它是一种基于 XML 的标记语言，用于描述界面，它的设计思想是 (MVVM, Model-View-ViewModel) ，它的目的是将界面逻辑与业务逻辑分离，使得界面逻辑与业务逻辑的开发可以并行不悖，这种设计思想在当今的前端开发中也是非常流行的。

#### UWP，silverlight，Xamarin 等

UWP 已经死掉了，silverlight 原先是为了对标 Flash，随着 Flash 的死亡，它也死掉了，Xamarin 是用 C# 来写移动端应用的，它的目的是让 C# 跨平台，微软现在推的是 MAUI，可以说是 Xamarin 的下一代产品。

#### WINUI3 Blazor MAUI

微软目前力推的框架，MAUI 致力于大前端跨平台，一个全家在移动

> [“我做了好多年 Silverlight 开发，买了5、6部 Windows Phone 手机，写了几十篇 UWP 文章，根据我丰富的经验，我可以肯定 WinUI 是有未来的。”](https://zhuanlan.zhihu.com/p/147499467)

## 各种90年代的 GUI

### Delphi 和 VB

- Delphi
- VisualBasic

这两种方案都是图形化的

以下几项请参见 [#跨平台开发技术(非基于Web)](#跨平台开发技术(非基于Web))

- wxWidgets
- Qt
- GTK
- fltk

## 中章：界面描述语言

现在来谈界面描述，在应用开发中，一个相当有争议性的问题，就是如何描述界面，大体有三种，

代码直接描述、标记语言(比如WPF的XAML、Qt 的ui文件、Android的xml)、HTML

当时间来到 WPF 的时代的时候，业界大力的推广界面标记语言，毕竟你不能强制设计师也学习用代码描述界面吧。

当时间来到诸如 Electron、CEF的时候，业界开始推广用Html来写界面，

> 有没有图形化手动拖拽的?

## 跨平台开发技术(非基于Web)

前面说的大都是 Windows 平台的，但实际上桌面平台还有 Linux 和 Mac OS,关于 Mac开发我不怎么了解，似乎有Objective-c/swift cocoa的组合，单说Linux平台上的话有wxWidgets和GTK+什么的，就不细说了。

- ### Qt

    Qt 几乎是C++领域最流行的跨平台桌面端软件开发框架，自绘引擎

    [也就是说界面上的一个按钮，一个文本框，都是Qt的引擎自己画的，这保证了基于Qt开发的软件界面在不同操作系统上看起来是一模一样的。它提供了大量的与界面无关但与软件开发息息相关的API，比如、网络、文件系统、剪切板等，而且让这些API在不同的操作系统下都有效，这极大的节省了开发人员的时间。](https://zhuanlan.zhihu.com/p/584899460)

    国内最为人熟知的案例莫过于WPS。除了 C++ ，还可以用 PyQt，允许使用 Python 进行开发

- ### GTK

    GTK，也有自绘引擎（Cairo），提供了大量系统相关的API。Ubuntu 上的经典Gnome 桌面即用此来进行开发

    由于GTK是C语言开发的，所以开发风格也很C语言化，这对于部分开发者来说可能觉得繁琐。

- ### wxWidgets

    wxWidgets是1992年英国的一个大学教授开创的跨平台GUI软件，也非常成熟稳定，商业授权非常友好。它没有自绘引擎，而是对不同平台下的界面API做了整合和封装，这样开发者在Windows下开发的软件看起来就是Windows窗口风格、Linux开发的软件看起来就是Linux窗口风格，这对于某些软件来说，正是他们想要的。C++ 开发

- ### FLTK

 FLTK是1998年创建的跨平台开源GUI框架，历史悠久，商业授权友好，而且C++之父也用它，它非常轻量级，支持静态连接，有自己的自绘引擎，用的是OpenGL，

- ### Swing/JavaFX

 Swing /JavaFX 是于 Java 的技术栈来做桌面应用的，依赖 JVM

## DirectUI

！！你可能想知道轮子哥

### Duilib

>是2010年国内一个开发者开发的GUI开发框架，因为底层基于DirectUI开发，所以只支持Windows平台，不支持跨平台，开源协议友好，商用没有任何问题（需要附加Lincence文件），国内有很多大厂基于这个技术做桌面端应用，比如网易、腾讯、百度。

> 这个框架是基于C++开发的，对C++开发者友好。但框架本身还有一些问题，比如对高分屏支持不佳、特殊控件绘制上也有一些小问题，除了界面相关的API外，几乎没有提供系统级的API，作者纯粹是用爱发电来开发这个框架，所以更新不是很及时。

> 相对来说网易基于Duilib开发的分支更完善一些：NIM_Duilib_Framework，添加了高分屏支持、多国语言、整合了多线程处理的支持，但环境搭建相对比较麻烦。如果开发者要用这个框架，一定要用develop分支下的代码，master分支下的代码问题很多，这个框架看上去也是作者一个人努力的成果。

## 富Web技术框架

Flash、html5、wasm、silverlight 、flutter、reactNatvie、blazor

vue react angular

## 基于 Web 技术的跨平台桌面应用开发

基于Chromium + Node.js。

## NW.js
>
> NW.js最早把Chromium和Node绑定到一起，用前端知识做界面，用Node技术访问操作系统，最早叫node-webkit，在2012年创建。NW.js基于MIT开源，可以无忧使用。

>微信小程序开发工具好像是用NW.js开发的，英特尔的一些工具也是用NW.js开发的。

## Electron

> 用 Electron 来做桌面程序开发的优势明显，相当于是完全的网页编程，有 Web 开发经验的前端开发上手非常容易。Web 开发生态广泛，开发成本低，可扩展性强，一些流行的前端框架例如 React、Angular、Vue 都可以和 electron 结合进行开发。另外它也具备和 Qt 一样跨平台的优良特性。对性能要求不高的桌面版程序来说，一份代码同时得到网页版和各个平台的桌面版，开发的效率是其他方案无法比的。可以说，这是大部分人看好的趋势。

换句话说就是，浏览器套壳，开发快，所以还蛮火的，现在相当一部分桌面软件都基于 electron。

比如，网易云音乐...

但是这玩意的内存占用也很大，什么，你说 VSCode 也用 Electron 但性能还不错? 那是因为它们团队一堆牛人用C++改的..

其实在 Electron 之前还有个 CEF，这个还需要 C++ ，比如 QQ 音乐就是这样做的，因为底层C++做的缘故，使用起来要比基于Electron 网易云流畅不少。

当然，Electron 也不一定效率就低，优化的牛逼也是可以的。

> 网上的说法
[Electron面向的开发者是纯前端开发者，会用JavaScript，HTML，CSS，但不会用C++。
CEF面向的开发者是会用C++也会用JavaScript，HTML，CSS的开发者。](https://www.zhihu.com/question/510368054/answer/2304076445)

对了，微软的 Edge 团队还推出了类似的 WebView2 技术，额，前景很光明，吧。

此类的还有 webview/TAURI、Sciter等等。

[话说我这里突然找到一篇很好的文章](https://zhuanlan.zhihu.com/p/547806659)

## 即时渲染桌面软件开发框架

Dear ImGui、Nuklear、 RmIui，在游戏上用的比较多。

## 新一代跨平台开发技术

### Flutter

Google 出品，用 Dart 语言

### MAUI

微软出品，基于.NET ，对 C# 用户友好，

然后这个 MAUI 它就没支持 Linux，好像打算让社区支持?

### Compose Multiplatform

JetBrains搞的跨平台GUI框架，对 Kotlin 语言很友好

## 移动平台跨平台开发

### 移动开发

移动方面的原生开发的话，iOS 用Swift，Android 用 Java/Kotlin ，

当然移动端 也有跨平台的需求，主要是跨 iOS 和 Android

以下摘自[这个网页](https://book.flutterchina.club/chapter1/mobile_development_intro.html#_1-1-1-%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91%E4%B8%8E%E8%B7%A8%E5%B9%B3%E5%8F%B0%E6%8A%80%E6%9C%AF)

时至今日，已经有很多跨平台框架，根据其原理，主要分为三类：

H5 + 原生（Cordova、Ionic、微信小程序）

JavaScript 开发 + 原生渲染 （React Native、Weex）

自绘UI + 原生 (Qt for mobile、Flutter)

### WASM、PWA、小程序

> WebAssembly（缩写为 wasm）是一种使用非 Javascript 代码，并使其在浏览器中运行的方法。这些代码可以是 C、C++ 或 Rust 等。它们会被编译进你的浏览器，在你的 CPU 上以接近原生的速度运行。

## 尾声

## refer

<https://learn.microsoft.com/zh-cn/windows/win32/learnwin32/learn-to-program-for-windows>

<https://learn.microsoft.com/zh-cn/cpp/mfc/mfc-desktop-applications?view=msvc-170>

<https://developer.aliyun.com/article/1171999>

<https://www.zhihu.com/question/23480014>

<https://www.cnblogs.com/willick/p/15038133.html>

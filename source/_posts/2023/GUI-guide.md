---
title: 常见的 (我知道的) GUI 开发框架
tags:
  - GUI
abbrlink: f4100da3
hidden: false
date: 2023-01-28 20:21:53
catagories: 伪计算机史学家
---
<meting-js
    server="netease"
    type="song"
    autoplay="false"
    id="509106602">
</meting-js>

<!-- <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=509106602&auto=0&height=66"></iframe> -->

# 图形用户界面 (Graphical User Interface, GUI)

> 图形用户界面 (Graphical User Interface, GUI), 又称图形用户接口,是一种人与计算机通信的界面显示格式，允许用户使用鼠标等输入设备操纵屏幕上的图标或菜单选项，以选择命令、调用文件、启动程序或执行其它一些日常任务。与通过键盘输入文本或字符命令来完成例行任务的字符界面相比，图形用户界面有许多优点。在图形用户界面，用户看到和操作的都是图形对象，应用的是计算机图形学的技术。

关于 GUI ,度娘百科如是说道。

做 GUI ，就要借助 GUI 开发框架... 什么,直接调用操作系统原生 API ?额 ...

好像也不是不行?
> 真的要那样做吗...

## 从Win32 API 开始说起
>
> 那有没有 Win64 API 呢?

并没有。Win32并不是指 32 位 Windows，而是现代 NT 内核 Windows 的统称。

Windows应用程序编程接口(Windows Application Programming Interface),是 Windows 操作系统提供给应用程序编程的接口。

Win32 API 并不只是图形接口，实际上 Win32API包含用户界面、Windows环境 (Shell)、用户输入和消息传送、用户输入和消息传送、诊断、图形和多媒体、设备、系统服务、安全和标识、应用程序安装和服务、系统管理员和管理、网络和 Internet等等一系列接口，具体可以在微软官网的[Windows API 索引](https://learn.microsoft.com/zh-cn/windows/win32/apiindex/windows-api-list)中找到。

我并不会用，就不班门弄斧了。

理论上，直接调用Win32 API是可以制作图形界面的，但是毕竟是底层API,虽然自由，理论上不管什么功能都可以自己手搓，但是也相当麻烦。

所以，无数的有志程序员先驱们，就将这些 API 不断的抽象封装，让我们可以避免重复造轮子，节省了时间~~与头发~~

## MFC => 将 Win32 API 以类的形式进行封装

微软基础类 (Microsoft Foundation Classes , MFC)是一个用于在C++环境下编写应用程序的一个框架和引擎。

MFC 将大部分Win32 API进行封装，调用一个MFC函数，就相当于调用了很多Win32API。使用方便，但是隐藏了细节。据说，在 MFC 时代 C++ 还处于 发展的早期阶段，总之，MFC算是十分经典~~老~~的技术了。

总之,MFC 体现了它那个时代面向对象的趋势，面向对象和趋势联系在一起，果然很有年代感啊.

那么，怎么用 MFC 来写图形界面呢?

额，我也不会，不过似乎可以看看 《深入浅出MFC》 之类的书来试一试。

引用知乎上的一段话

> [MFC最流行的时代是 VC6 时代的 MFC4.2，那个年代大约是 1996年。MFC的最后一个更新版本是 2010 年的 MFC10，至今已经十一年之久。如果你研究 MFC，你可能面对的是 25 年前的代码，以及一个 十一年前微软官方已经停止维护了的 编程框架。如果现在还能问出 MFC 是不是过时了的问题，那么我觉得，您应当确认一下您学的课程究竟是计算机科学史还是计算机科学。](https://www.zhihu.com/question/60773898/answer/1992193065)

顺带一提,写MFC 用C++。

## 各种90年代(大概)的 UI技术

Delphi、WTL、VB、WPF、wxWidgets、Delphi、Qt、GTK、fltk等等，

不细述了还是，我也不甚了解。

## Windows桌面应用程序开发

这里说的 Windows 桌面应用程序开发，是特指的微软的技术。

其核心大概是，额，C#/.NET?

可以看出微软真的一直在下功夫推广 C#。但是貌似，C# 的处境一直挺尴尬的。

C# 更像Java，而不像C++，而且至少在国内，C# 似乎远远不如 Java 流行，不知道为什么。

不如说微软公司的处境也一直蛮微妙。

围绕 C#/.NET 框架 ，微软推过Winform、WPF、UWP、silverlight、Xamarin、MAUI、WinUI3、等等等等

我作为一个小白，实在是连微软的这些技术具体有哪些都搞不清楚。太吉儿多了!!!

当然了，C++ 微软也是有支持的 比如WinRT(windows runtime) 就用 C++来写。

如果想学习微软这一系列新技术的话，额，大概关键词是 WPF、WinUI3、C#、MAUI、.NET 这些吧。

额，.NET的命名实在是很复杂

关于微软的技术，我站在一个IT新闻爱好者的角度来看，额，挺有未来的。

这里引用知乎上看到的一段话。

> [“我做了好多年 Silverlight 开发，买了5、6部 Windows Phone 手机，写了几十篇 UWP 文章，根据我丰富的经验，我可以肯定 WinUI 是有未来的。”](https://zhuanlan.zhihu.com/p/147499467)

说绝题外话，笔者初中的时候正值微软强推 UWP，当时就想着以后一定要写个 UWP 应用，如今 2023 年了，我还是没有实现这个愿望。以后一定要试试 WinUI3 (它到时候别凉了就行)

当然了，C# 和 .NET 肯定是不会凉的，只不过估计过几年微软就又要推过新技术了吧。

# 界面描述语言

以上都是考古&杂谈之类的，我其实也不甚了解。

现在来谈界面描述，在应用开发中，一个相当有争议性的问题，就是如何描述界面，大体有三种，

代码直接描述、标记语言(比如WPF的XAML、Qt 的ui文件、Android的xml)、HTML

当时间来到 WPF 的时代的时候，业界大力的推广界面标记语言，毕竟你不能强制设计师也学习用代码描述界面吧。

当时间来到诸如 Electron、CEF的时候，业界开始推广用Html来写界面，

最近在学 Dart ，flutter 中又是用代码来描述的，其实也蛮好用的，除了括号有点多...

> 有没有图形化手动拖拽的?

# 部分跨平台开发技术(非基于Web)

前面说的大都是 Windows 平台的，但实际上桌面平台还有 Linux 和 Mac OS,关于 Mac开发我不怎么了解，似乎有Objective-c/swift cocoa的组合，单说Linux平台上的话有wxWidgets和GTK+什么的，就不细说了。

Java 似乎也能来写 GUI ，不过似乎已经过时了。

## Qt

Qt 还是比较活跃的，但它们主要重心貌似还是嵌入式、车载这一方面...

几乎是C++领域最流行的跨平台桌面端软件开发框架，

并非调用系统API，也不是借助浏览器渲染HTML,而是自绘引擎

摘自网络
> [也就是说界面上的一个按钮，一个文本框，都是Qt的引擎自己画的，这保证了基于Qt开发的软件界面在不同操作系统上看起来是一模一样的。它提供了大量的与界面无关但与软件开发息息相关的API，比如、网络、文件系统、剪切板等，而且让这些API在不同的操作系统下都有效，这极大的节省了开发人员的时间。](https://zhuanlan.zhihu.com/p/584899460)

顺便一提，WPS就是 Qt 做的。

除了 C++ ，还有PyQt 可以用 python写。

## GTK

GTK，也有自绘引擎（Cairo），也提供了大量系统相关的API。

主要在Linux操作系统领域流行，

> 另外，由于GTK是C语言开发的，所以开发风格也很C语言化，这对于部分开发者来说可能觉得繁琐。

## wxWidgets

> wxWidgets是1992年英国的一个大学教授开创的跨平台GUI软件，也非常成熟稳定，商业授权非常友好。它没有自绘引擎，而是对不同平台下的界面API做了整合和封装，这样开发者在Windows下开发的软件看起来就是Windows窗口风格、Linux开发的软件看起来就是Linux窗口风格，这对于某些软件来说，正是他们想要的，但要想搞一些花哨的特效就没那么容易了。它同样也提供了大量的系统相关的API供开发者使用。

　　是C++开发的.

## FLTK

> FLTK是1998年创建的跨平台开源GUI框架，历史悠久，商业授权友好，而且C++之父也用它，它非常轻量级，支持静态连接，有自己的自绘引擎，用的是OpenGL，

## Swing/JavaFX

Swing /JavaFX 是基于 Java 的技术栈来做桌面应用的，因为要依赖 JVM

## Duilib

>是2010年国内一个开发者开发的GUI开发框架，因为底层基于DirectUI开发，所以只支持Windows平台，不支持跨平台，开源协议友好，商用没有任何问题（需要附加Lincence文件），国内有很多大厂基于这个技术做桌面端应用，比如网易、腾讯、百度。

> 这个框架是基于C++开发的，对C++开发者友好。但框架本身还有一些问题，比如对高分屏支持不佳、特殊控件绘制上也有一些小问题，除了界面相关的API外，几乎没有提供系统级的API，作者纯粹是用爱发电来开发这个框架，所以更新不是很及时。

> 相对来说网易基于Duilib开发的分支更完善一些：NIM_Duilib_Framework，添加了高分屏支持、多国语言、整合了多线程处理的支持，但环境搭建相对比较麻烦。如果开发者要用这个框架，一定要用develop分支下的代码，master分支下的代码问题很多，这个框架看上去也是作者一个人努力的成果。

# 基于 Web 技术的桌面应用开发

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

# 即时渲染桌面软件开发框架

Dear ImGui、Nuklear、 RmIui之类的，似乎在游戏上用的比较多。

# 比较新的跨平台开发技术

## Flutter

Google 出品，用 Dart 语言

## MAUI

微软出品，基于.NET ，对 C# 用户友好，

说句题外话，.NET core 是开源的，微软这几年似乎一直在拥抱开源..

然后这个 MAUI 它就没支持 Linux，好像打算让社区支持?

## Compose Multiplatform

JetBrains搞的跨平台GUI框架，对 Kotlin 语言很友好

# 尾声，移动方面的开发，以及网页应用等

## 移动开发

移动方面的原生开发的话，iOS 用Swift，Android 用 Java/Kotlin ，

当然移动端 也有跨平台的需求，主要是跨 iOS 和 Android

以下摘自[这个网页](https://book.flutterchina.club/chapter1/mobile_development_intro.html#_1-1-1-%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91%E4%B8%8E%E8%B7%A8%E5%B9%B3%E5%8F%B0%E6%8A%80%E6%9C%AF)

时至今日，已经有很多跨平台框架，根据其原理，主要分为三类：

H5 + 原生（Cordova、Ionic、微信小程序）

JavaScript 开发 + 原生渲染 （React Native、Weex）

自绘UI + 原生 (Qt for mobile、Flutter)

## WASM、PWA、小程序

> WebAssembly（缩写为 wasm）是一种使用非 Javascript 代码，并使其在浏览器中运行的方法。这些代码可以是 C、C++ 或 Rust 等。它们会被编译进你的浏览器，在你的 CPU 上以接近原生的速度运行。

至于 PWA ，读者可以自行了解，国内最终还是小程序打败了 PWA ,也是十分值得思考的事情。

## 尾声

在找资料的过程中，经常看到设计框架、WVVM 等关键词，未来 GUI 开发会怎样? 无法可想，今天的新技术，过十几年或许也会过时，但是框架思想应该是会有一个明晰的发展路线的吧。

刚刚hexo git push 不过去，后来在GitHub里把分支保护给删除了就可以了，然后再把分支保护再加上就行。

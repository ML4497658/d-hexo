---
title: 年轻人的第一个 Hexo 个人博客
tags: Hexo
abbrlink: b2194d8c
date: 2022-09-17 14:03:40
categories: 搭建博客

---

想做个人博客？

我想大部分人只是兴趣使然，毕竟亲手做一件东西总会有满满的成就感，而搭建一个网站听起来也非常有吸引力不是吗？

当然，作为一个新手，如果要从头开始，先学习前端知识，再从零开始构建一个网站的话，那未免流程也太长了吧~

而且，我想很多人，就像我一样，只有一时的热情，如果不很快得到反馈就会颓丧不已，~~当然这种心态是要改正的~~

所以，不妨尝试一点简单的东西吧，比如 Hexo

P.S. 如果想搭建个人博客的话，除了 Hexo 之外，还有很多其他的选择，例如 Hugo 或者是 Wordpress 等。

除了这种静态网站生成器，也可以选择一些在线的博客平台，例如 CSDN、掘金或者是简书等。

国外的话，可以选择 Medium 或者是 Dev.to 等。

## 安装

### 安装前提

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- Node.js (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本)
- Git

### 下载与安装 Node.js

Hexo 是基于 Node.js 开发的 ，所以要安装 Node.js ，没毛病吧？
打开[Node.js下载页面](https://nodejs.org/zh-cn/download/)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode2.png)
下载并安装即可，你可以参照[这个教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)

安装完成后，可以[打开 cmd]( https://jingyan.baidu.com/article/f96699bbf01097894e3c1bc7.html )，输入 npm -v 来试一下，

![这样就表示安装完成了](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode3.png "这样就表示安装完成了")

### 下载与安装 Git

打开[Git 下载页面](https://git-scm.com/download/win)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoGit.png)
下载并安装即可，你可以参照[这个教程](https://zhuanlan.zhihu.com/p/349473508)

安装完成后，可以[打开 cmd]( https://jingyan.baidu.com/article/f96699bbf01097894e3c1bc7.html )，输入 git -v 来试一试，

![这样就表示安装完成了](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoGit2.png "这样就表示安装完成了")

### 设置环境变量

[添加Node.js到环境变量](https://jingyan.baidu.com/article/fec4bce2950133f2618d8b02.html)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode4.png)

顺带提一句，所设置环境变量的地址应是**Node.js的安装地址**

如果在安装的过程中一路默认，那么**大概率**这个地址是 " *C:\Program Files\nodejs* "

[添加Git到环境变量](https://www.jianshu.com/p/fee5baf756c8)

### 安装 Hexo

找一个你觉得合适的地方[新建一个文件夹](https://jingyan.baidu.com/article/22a299b5f994719e19376abb.html)，

名字随意，比如 `loli` 之类的 ，但是**不建议用中文**

[在你新建的文件夹打开 cmd](https://blog.csdn.net/weixin_44679832/article/details/123942274)

``` PowerShell
npm install -g hexo-cli
```

成功的话大概会这样![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexo2.png)

## 启动 Hexo

继续输入命令

``` PowerShell
hexo init blog
cd blog
hexo g
hexo s
```

有必要说明的是，以后可以直接在刚才 Hexo 生成的 blog 文件夹中打开 CMD ,然后输入 hexo -g 和 hexo -s 即可

在浏览器地址栏输入 `http://localhost:4000` 即可看到你的博客

这就是你的博客啦

![这就是你的博客啦](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/HEXO3.png)

## 写文章

### 生成一个 .md 文件

在 CMD 中输入如下内容

``` PowerShell
hexo new myPost
```

需要说明的是 ***myPost*** 可以随便写，但是**不建议用中文！**

大概 CMD 里会差不多这样显示

 D:\blog\blog>hexo new myPost
 INFO  Validating config
 INFO  Created: D:\blog\blog\source\_posts\myPost.md

注意 Created: 后面的地址，这就是刚才新建的文章的地址

这个 myPost.md 就是我们新建的文章。

### markdown语法？

Markdown是一种轻量级标记语言，通常用于编写文档，包括博客文章、笔记、文档、网页内容等。它的设计目标是简单、易读、易写，允许作者专注于内容而不是格式，然后可以将文本文件转换成HTML或其他格式。

你可以在这个 [Markdown语法教程](https://www.runoob.com/markdown/md-tutorial.html) 中学习 Markdown 语法

### 编辑文章

打开刚才新建的文章，你会看到类似如下内容

```markdown
---
title: myPost
date: 2022-09-17 14:03:40
tags:
---
```

这就是文章的头部，你可以在这里设置文章的标题、日期、标签等等

在这个头部下面，就是文章的内容了，你可以在这里写文章，尽情运用 Markdown 语法吧！

### 从 markdown 到 html

当我们在终端中执行 `hexo generate` 或者是 `hexo g` 命令的时候，Hexo 会将我们的 markdown 文件转换成 html 文件。

如果你仔细观察文件夹，你会发现在 `blog\public\posts` 文件夹中多了一个 html 文件，这就是我们刚才新建的文章的 html 文件。

里面的内容由 Hexo 自动生成，我们不需要手动修改。

### 看一下效果

这个时候，如果安装了 `hexo-browsersync` 插件的话，这个插件会自动热重载，也就是说，你只需要在浏览器中刷新一下，就可以看到，你刚才写的文章已经在博客中显示了。

点击文章标题，就可以看到文章的内容了，就像浏览任何其它博客一样。

![这就是你的博客啦](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/HEXO4.png)

## 安装主题

其实默认的主题也蛮好看的~

不过大多数人都会换一个主题，毕竟这样才能体现出个性嘛~

### 挑选喜欢的主题

正如同手机会有主题商店，Hexo 也有主题商店，你可以在[Hexo主题商店](https://hexo.io/themes/)中挑选喜欢的主题

### 安装喜欢的主题

以我喜欢的主题 [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 为例，

当你在 Hexo 主题商店中找到喜欢的主题后，你可以点击主题的链接，进入主题的 GitHub 页面

一般来说，你只需要跟随 GitHub 页面中的说明，就可以安装主题了

最后的效果，自然就是和 主题商店 中的预览一样了

![漂亮的 butterfly 主题](https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/theme-butterfly-readme.png)

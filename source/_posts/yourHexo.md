---
title: 年轻人的第一个 Hexo 个人博客
tags: Hexo
cover: 'https://cdn.staticaly.com/gh/Jenway/J-figure-Bed/main/eva4.jpg'
abbrlink: b2194d8c
date: 2022-09-17 14:03:40
categories: 搭建博客

---

#  想做个人博客？

我想大部分人只是兴趣使然，毕竟亲手做一件东西总会有满满的成就感，而搭建一个网站听起来也非常有吸引力不是吗？

当然，作为一个新手，如果要从头开始，先学习前端知识，再从零开始构建一个网站的话，那未免流程也太长了吧~

而且，我想很多人，就像我一样，只有一时的热情，如果不很快得到反馈就会颓丧不已，~~当然这种心态是要改正的~~

所以，不妨尝试一点简单的东西吧 ~~其实也不简单~~

有必要说明的是，如果想搭建个人博客的话，除了 Hexo ，还有很多不同的方法，比如 Hugo啊，或者是Wordpress

但是我们这里只说 Hexo ，~~因为我只用过 Hexo~~ 

## 必要的准备

- 一台 搭载 Windows 系统的电脑（不是说别的不行，因为别的我不会）
- 安装 NodeJs
- 安装 Git
- Github pages 或者是其他的#部署平台#

## 安装 Node.js

### 下载与安装

Hexo 是基于 Node.js 开发的 ，所以要安装 Node.js ，没毛病吧？
打开[Node.js下载页面](https://nodejs.org/zh-cn/download/)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode2.png)
下载并安装即可，你可以参照[这个教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)

安装完成后，可以[打开 cmd]( https://jingyan.baidu.com/article/f96699bbf01097894e3c1bc7.html )，输入 npm -v 来试一试，

![这样就表示安装完成了](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode3.png "这样就表示安装完成了")

### 设置环境变量

[添加Node.js到环境变量](https://jingyan.baidu.com/article/fec4bce2950133f2618d8b02.html)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoNode4.png)

顺带提一句，所设置环境变量的地址应是**Node.js的安装地址**

~~变量名称理论上可以随便写~~

如果在安装的过程中一路默认，那么**大概率**这个地址是 " *C:\Program Files\nodejs* "

## 安装 Git

### 下载与安装

打开[ Git 下载页面](https://git-scm.com/download/win)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoGit.png)
下载并安装即可，你可以参照[这个教程](https://zhuanlan.zhihu.com/p/349473508)

安装完成后，可以[打开 cmd]( https://jingyan.baidu.com/article/f96699bbf01097894e3c1bc7.html )，输入 git -v 来试一试，

![这样就表示安装完成了](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoGit2.png "这样就表示安装完成了")

### 设置环境变量

[添加Git到环境变量](https://www.jianshu.com/p/fee5baf756c8)

大概已经添加了吧~

所设置环境变量的地址应是**Git的安装地址**


## 安装 Hexo

找一个你觉得合适的地方[新建一个文件夹](https://jingyan.baidu.com/article/22a299b5f994719e19376abb.html)，

名字随意，比如 loli 之类的 ，但是**不要用中文！**

[在你新建的文件夹打开 cmd](https://blog.csdn.net/weixin_44679832/article/details/123942274)

**依次**输入以下命令

>cnpm install -g hexo-cli

>hexo init blog

成功的话大概会这样![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexo2.png)

当然了，可能会有奇奇怪怪的错误，可以[自行上网搜索](https://cn.bing.com/search?q=hexo+init+%e6%8a%a5%e9%94%99&qs=RI&pq=hexo+init&sk=RI2&sc=8-9&cvid=FD54AB534D3A43DF8EA3655DFE3A209E&FORM=QBRE&sp=3)

## 启动 Hexo

继续输入命令

>cd blog

>hexo g

>hexo s

**有必要说明的是，以后可以直接在刚才 Hexo 生成的 blog 文件夹中打开 CMD ,然后输入 hexo -g 和 hexo -s**

在浏览器地址栏输入 <http://localhost:4000>

这就是你的博客啦

![这就是你的博客啦](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/HEXO3.png)


## 写文章

### 生成一个 .md 文件

在 CMD 中输入如下内容

> hexo new myPost

需要说明的是 ***myPost*** 可以随便写，但是**不要用中文！**

大概 CMD 里会差不多这样显示

	D:\blog\blog>hexo new myPost
	INFO  Validating config
	INFO  Created: D:\blog\blog\source\_posts\myPost.md

注意 Created: 后面的地址，这就是刚才新建的文章的地址

这个 myPost.md 就是我们新建的文章。

### markdown语法？

md 是

## 安装主题

其实默认的主题也蛮好看的~

不过大多数人都会换一个主题。

### 挑选喜欢的主题

### 安装
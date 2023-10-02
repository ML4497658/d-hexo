---
title: 部署你的第一个 Hexo Blog
tags: Hexo
hidden: false
abbrlink: 5f538bc8
date: 2022-09-18 16:34:23
categories: 搭建博客
---

在上一篇 Blog 《年轻人的第一个 Hexo Blog》中，我们已经成功的搭建了一个 Hexo 环境，撰写了博文，挑选了喜欢的主题，并且成功的在本地运行了起来。

有了本地的博客，下一步就是要让它上天 :dash: ，啊不，联网。:earth_asia:

After all，只在本地的博客，和普通的笔记:wavy_dash:有什么区别呢。

这篇 Blog 就是要教你如何把你的 Hexo Blog 部署到互联网上。

那么，我们现在有什么?

- 一份 `Hexo` 博客的源码
- 一份生成好的网页 (with `Hexo -g`)

那么，我们需要做的似乎就是找到一个托管网站，把我们生成好的网页部署上就可以了。

这里的链条是:

- 本地写作
- 本地生成 (`hexo -g` aka `hexo -generate` )
- 部署到托管网站 (`hexo -d` aka `hexo -deploy`)

问题来了 :arrow_down:

## 选择什么托管网站呢？

一般而言有以下几种选择:

- Github Pages
- Netlify
- Vercel
- Coding Pages
- Gitee Pages

我们这里选择 Github Pages。

## 连接到互联网

要使用 Github Pages，我们首先需要一个 Github 账号。

要注册一个 Github 账号，我们就需要连接到互联网。

鉴于 Github 在国内的访问速度，我们可能需要特殊的访问方式。

一般而言，我们可以使用以下方式:

- 代理，此处省略
- 修改 hosts 文件，此处省略
- steamcommunity302，来自羽翼城大佬的工具
- GitHub520

## Github pages 部署

现在我们已经有了 Github 账号，也可以访问 Github 了，那么我们就可以开始部署了。

### 创建一个仓库

我们需要在 Github 上创建一个仓库，用来存放我们的博客。

这个仓库的名字必须是 `username.github.io`，其中 `username` 是你的 Github 用户名。

### 部署

修改 `_config.yml` 文件，将 `deploy` 部分修改为:

``` yml
deploy:
  type: git
  repo: http://github.com/username/username.github.io.git
  branch: master
```

然后执行 `hexo d` 命令，就可以将我们的博客部署到 Github Pages 上了。

> 这里的 `hexo d` 命令，是 `hexo deploy` 的简写。

## 搭建一个图床 && CDN

博客当然不能只有文字，还需要图片。

我们可以使用 Github 作为图床，但是 Github 的访问速度并不是很快，所以我们需要一个 CDN。

### Github 作为图床

利用 Github 作为图床的原理很简单，就是将图片上传到 Github 仓库中，然后通过链接的方式引用。

例如，我们创建一个仓库，名字为 `J-figure-Bed`，然后将图片上传到这个仓库中的 `background` 文件夹中，那么我们就可以通过以下方式引用:

``` markdown
![picture!](https://github.com/Jenway/J-figure-Bed/blob/main/background/banner.jpg?raw=true)
```

也即，通过 `https://github.com/username/repo/blob/main/file?raw=true` 的方式引用。

或者，我们可以通过 `https://raw.githubusercontent.com/username/repo/main/file` 的方式引用。

这两种方式的区别在于，前者是通过 Github 的网页来访问，后者是通过 Github 的 CDN 来访问。

然而，这样的方式有一个问题，就是 Github 的访问速度并不是很快，所以我们需要一个 CDN。

著名的 CDN 有:

- [jsdelivr](https://www.jsdelivr.com/)，通过 `https://cdn.jsdelivr.net/gh/user/repo@version/file` 的方式引用
- [jsdelivr](https://www.jsdelivr.com/)，通过 `https:/fastly.jsdelivr.net/gh/user/repo@version/file` 的方式引用
- [githack](https://raw.githack.com/)，通过 `https://rawcdn.githack.com/user/repo/tag/file` 的方式引用
- [staticaly](https://statically.io/)，通过 `https://cdn.statically.io/gh/:user/:repo/:tag/:file` 的方式引用
- [cloudflare](https://www.cloudflare.com/)，通过 ` ` 的方式引用
- [qiniu](https://www.qiniu.com/)，通过 ` ` 的方式引用

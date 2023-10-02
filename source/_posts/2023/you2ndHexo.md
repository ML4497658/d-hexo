---
title: 精简记录 -- 年轻人的第二个 Hexo 博客
tags:
  - Hexo
  - blog
hidden: false
abbrlink: dbe0b09e
date: 2023-02-16 09:06:56
top_img:
cover:
categories: 搭建博客

---

<meting-js
    server="netease"
    type="song"
    autoplay="false"
    id="27876224">
</meting-js>

这一次我将重新构建 Hexo 博客环境，不是新手教程，而是更为精简的记录。

## 起因

先前的博客环境存在诸多问题:

- 包环境很乱,npm 报一堆版本错误
- 设置文件混乱，有的在主题文件夹中，有的在博客根目录下
- 采用注入 js 进行了一些修改，但是在主题文件中，升级主题时会被覆盖
- 我忘了我是怎么把 Live 2d 看板娘设置的，找了半天没有找到设置

## 目标

- 尽量不动主题文件，保证升级稳定
- 注入 js 单独放在 source/js/ 目录下，不使用 butterfly 自带的 js 注入(因为需要放在主题文件夹中)
- 配置文件集中在博客根目录下

## Install && Path

包管理器 make a better life！

这里我选择在 windows 下，实际上在 WSL2 中或许会更好一些

既然是在 windows 下，那么就用 `scoop` 吧

不知道为什么，nvs 我设置完环境变量之后还是没有生效，所以我重启了一遍就好了

```PowerShell
scoop install nodejs
scoop install git
```

`Scoop` 会帮你配 Path,太贴心了，就算失败也可以手动配

## 安装 Hexo && Node modules 🐙

Windows Terminal 真的很好用，我用的是 `oh-my-posh` 主题

```PowerShell
npm install -g hexo-cli
hexo init blog
cd blog
yarn install
```

## git 仓库 && 安装主题

再次选择了 Butterfly，并且把它作为子模块

在博客根目录下复制一个 `_config.hexo-theme-butterfly.yml` 来重载主题配置

```PowerShell
git init
git submodule add https://github.com/jerryc127/hexo-theme-butterfly.git .\themes\hexo-theme-butterfly
mv .\themes\hexo-theme-butterfly\_config.yml .\_config.hexo-theme-butterfly.yml
```

然后，修改 `gitignore` ，其实 `Hexo init` 似乎会自动帮你生成一个

``` gitignore
node_modules/
public/
.deploy*/

.DS_Store
Thumbs.db
db.json
package-lock.json
*.log
**/.obsidian/
_multiconfig.yml
```

然后

```PowerShell
git add *
git commit -m '迁徙到hexo6代'
```

仓库建起来了，✌:coffee:

## 修改 post 模板

修改一下 `scaffolds/post.md`，加入 top_img 和 cover 等等属性，还有一个便于注入 音乐的地方

``` markdown
---
title: {{ title }}
date: {{ date }}
tags: [1, 2]
top_img:
cover:
hidden: false
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->
```

## 注入 js

将想要注入的 js 文件全部放在 source/js 下

在 scripts/ 下新建一个 injector.js 来调用, 这个做法是参考 [Hexo-Theme-Fluid 主题作者写的教程](https://hexo.fluid-dev.com/posts/hexo-injector/)

injector.js 的样式如下

``` javascript

hexo.extend.injector.register(
    "head_end",
    '<link rel="stylesheet" href="/css/footerTransp.css?1">',
    "default"
);


hexo.extend.injector.register(
    "body_end",
    `<script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>`,
    "default"
);

```

你可以在这里注入任何你想要的 css/js，本地或者网络上的都可以，这里我注入了 `live2d-widget` 的默认款 js，以及一个本地的 css 文件，用来让 footer 透明

## Hexo 插件安装

列举一下我用的插件

| 插件名 | 作用 | 备注 |
| --- | --- | --- |
| hexo-bilibili-bangumi | 展示追番 |  |
| hexo-renderer-markdown-it | markdown 渲染 |  |
| hexo-wordcount | 字数统计 |  |
| hexo-algolia | algolia 搜索 |  |

其实装过一次之后，这些都会被写入 package.json 中，所以之后在其它地方 clone 仓库的时候，直接用 `yarn install` 来安装就好了

## 搜索

安装 algoglia

## 字数统计

npm install hexo-wordcount --sav

## bili

npm install hexo-bilibili-bangumi --save

好像和自带的 lazyload 有冲突

## 关于hexo-browsersync

似乎，新版的 Hexo 已经不需要这个插件了，不用它也有热重载的效果，而且，搞得我之前一直依赖错误的罪魁祸首，似乎就是这个插件，不建议安装，如果你在本地运行的时候，发现了一些奇怪的问题，可以试试卸载这个插件

npm 关于这个插件的警告是这样的

> Depends on vulnerable versions of ua-parser-js

### npm un hexo-renderer-marked -S

 npm i hexo-renderer-markdown-it -S

 npm i markdown-it-emoji markdown-it-task-lists -S

 ``` yaml
 markdown:
  render:
    html: true # 在 markdown 文本中支持 html tag 标签
    xhtmlOut: false # 需要 xtml 文档，使用 <br /> 替代 <br>
    breaks: true # 用 <br> 开始新的一行
    linkify: true # 自动将 可能是链接的内容转换成链接
    typographer: true # 印刷标识转换
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-emoji 
    - markdown-it-task-lists
  anchors:
    level: 2
    collisionSuffix: ''
    permalink: false,
    permalinkClass: 'header-anchor'
    permalinkSymbol: ''
    case: 0
    separator: ''
 ```

## Hexo 博客生成永久链接

## Hexo algolia 搜索

 npm install hexo-algolia -save

 当配置完成，在站点根目录下执行一下命令来更新上传 Index。请注意观察命令的输出。

PLAINTEXT
$ export HEXO_ALGOLIA_INDEXING_KEY=Search-Only API key # 使用 Git Bash

### set HEXO_ALGOLIA_INDEXING_KEY=Search-Only API key # 使用 Windows CMD 命令行

这个插件要把 algolia 的 api 设置为环境变量调用
所以我就加到了 Github 仓库的 secrets 里面了
$ hexo clean
$ hexo algolia

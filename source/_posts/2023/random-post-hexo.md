---
title: 非常特立独行的随机 cover 实现
tags:
  - hexo
  - GitHub Actions
hidden: false
abbrlink: cb50296f
date: 2023-10-01 02:05:37
catagories: 技术杂谈
categories: 网站建设
---

<!-- <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js> -->

这篇文章将会介绍一种非常特立独行的 hexo 博客的随机 cover 实现方式。

我们先来看看，网络上流传的一些 hexo 博客的随机 cover 实现方式：

1. 修改主题的配置文件，在默认 cover 的设置里多加几张图
2. 调用网络上的随机图片 API，然后通过主题的默认 cover 来实现
3. 和第二种类似，但是通过自己写个 .php 来实现一个随机图片 API 接口，这种一般需要自己的服务器

这些方法都不太适合我

## 为什么不适合我

首先，我不想在主题的配置文件里写一堆图片链接，这样太麻烦了，这样看来，随机图片 API 是个不错的选择，但是问题是。

额，我没有服务器啊。

或许你会说，那为什么不用网络上的随机图片 API 呢？

> 人的 XP 是各不相同的，不一定符合我的审美

### 更深层次的需求原因

如果是用随机图片 API 的话，那么实际上达到的效果会是，每次刷新播客的首页，都会使得 cover 图片发生变化，虽然这样也是种很不错的效果，但是我对随机封面的需求来源其实和效果倒是没有太大关系：

主要原因是我懒得给每个文章都配一张封面图。

更重要的是，毕竟在国内，所以图床一般用 CDN 加速，但是现在的情况，不知道哪一天，CDN 突然凉了，难不成我还要一个个去改图片链接？

## 我的解决方法

这里借鉴了网络上的手写随机图片 API 的思路，提供一个 txt 文件，里面存放着图片的链接，然后通过随机数获取其中的一条链接。

### Github 图床方面

我们这里借助 GitHub Actions 来实现当我们 push 一张图片到仓库的时候，自动更新 txt 文件。

简单写个 python 脚本，然后通过 GitHub Actions 来跑。

这个脚本的内容如下:
  
  ```python
  import os

dir = './cover'
pic_prefix = 'http://fastly.jsdelivr.net/gh/jenway/J-figure-bed@master/cover/'

def get_file_list(dir):
    file_list = []
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith('.jpg') or file.endswith('.png'):
                file = pic_prefix + file
                file_list.append(file)
                print("file: " + file + " added")
    return file_list

# save file_list as img.txt

file_list = get_file_list(dir)
with open('img.txt', 'w') as f:
    for file in file_list:
        f.write(file + '\n')

print("file list generated")
  ```

而 GitHub Actions 的配置文件如下:

  ```yml
  name: Update Txt File

on:
  push:
    branches:
      - master  # 根据你的主分支名称调整

jobs:
  update-txt:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4.1.0

    - name: Update Txt File
      run: |
        python script.py
        # 推送更新到仓库
        git config user.name "GitHub Actions"
        git config user.email "actions@github.com"
        git add .
        git commit -m "Update img.txt file"
        git push origin master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```

### Hexo 配置方面

相比于在最终的博客界面调用随机图片 API，我更希望在 hexo 生成博客的时候，就把随机的封面图片链接写入到文章的 front-matter 里，这样的话，在一段时间内，每篇文章的封面都是固定的，不会因为刷新页面而变化。

我们这里要用到 hexo 的一些 api

#### hexo console

hexo console api 可以让我们自定义一些 hexo 的命令，这里我们要用到的是 `hexo.extend.console.register`

```javascript
hexo.extend.console.register('random_list', 'Generate img.json for random cover', {
    desc: 'Generate img.json for random cover',
    usage: 'Usage: hexo random_list',
    options: [
        {
            name: '-i, --img',
            desc: 'img.txt file path. Default: source/_data_/img.txt'
        }, {
            name: '-m, --md',
            desc: 'Markdown file directory path. Default: source/_posts'
        }, {
            name: '-o, --output',
            desc: 'Output file path. Default: source/img.json'
        }
    ]
}, function (args) {
    const imgFilePath = args.i || args.img || 'source/_data/img.txt';
    const mdDirPath = args.m || args.md || 'source/_posts';
    const outputFilePath = args.o || args.output || 'source/_data/random_cover.json';
    generateCovers(imgFilePath, mdDirPath, outputFilePath);
});
```

可以看到，这个命令接受三个参数，分别是 img.txt 文件的路径，markdown 文件的路径，以及输出文件的路径。

最终实现的效果就是，我们在 hexo 的根目录下，执行 `hexo random_list` 命令，就会在 `source/_data` 目录下生成一个 `random_cover.json` 文件，这个文件里存放着为每篇文章路径与随机生成的对应封面图片链接。

具体的代码实现请参见我的 [Github 仓库](https://github.com/Jenway/hexoBlog/blob/master/scripts/generate_random_list.js) 这里只列出一些关键点。

- 防止重复的方法比较粗暴，当选择过一张图片后，就直接从数组里删除，这样就可以保证每次随机的图片都不会重复。
- 程序会对文件进行粗略判断，非 post 类型的文件，以及 "hidden: true" 的文件，都会被忽略。

#### hexo filter

现在我们已经有了一个 `random_cover.json` 文件，里面存放着每篇文章的封面图片链接，那么我们就可以通过 hexo 的 filter api 来实现，每次生成文章的时候，都把对应的封面图片链接写入到文章的 front-matter 里。

> 过滤器 ( Filter ) 用于修改特定文件，Hexo 将这些文件依序传给过滤器，而过滤器可以针对文件进行修改，这个概念借鉴自 WordPress。

hexo filter 的 api 有几个参数，我们这里选择的参数是 before_post_render，即在文章开始渲染前执行

我们在每篇文章开始渲染前，对其进行判断，如果需要随机封面的话，就把对应的封面图片链接写入到文章的 front-matter 里。

```javascript
// random cover
fs = require('fs')
path = require('path')
src_json_path = 'source/_data/random_cover.json'

function applyRandomCover(data) {
    if (data.layout === 'post') {
        const json = fs.readFileSync(src_json_path, 'utf-8');
        const imgList = JSON.parse(json);
        const sourceKey = 'source/' + data.source.replace(/\\/g, '/');
        if (imgList.hasOwnProperty(sourceKey)) {
            data.cover = imgList[sourceKey];
            console.log(`Applied cover to ${sourceKey}: ${
                data.cover
            }`);
        }
    }
    return data;
}

hexo.extend.filter.register('before_post_render', applyRandomCover, 0)
```

### Github Actions 配置方面

细心的你肯定已经发现了，图床 txt 文件在图床仓库里，为什么 hexo 仓库里就直接调用了呢？

答案比较粗暴：直接下载就好了

一开始我有想过，把图床仓库作为 hexo 仓库的子模块，但是这样的话，每次 hexo 仓库更新的时候，都要更新子模块，这样的话，和把图片直接放到 hexo 仓库里，没有什么区别，而如果采取 Git-LFS 来防止 hexo 仓库过大，又会使得 CDN 无法缓存加速，所以最终还是决定直接下载。

嘛，在 Github Actions 里下载文件还是很方便的，也不用考虑 GitHub 404，嘿嘿

只需要在 "hexo generate" 执行之前，加上一个任务就好了

```yml
  - name: 下载图床link && 生成随机 cover
    run: |
        wget https://raw.githubusercontent.com/Jenway/J-figure-Bed/master/img.txt -O source/_data/img.txt
        hexo random_list
```

## 最终效果

这次折腾实现了以下几个目标

- 随机封面，不用手动在文章里写封面图片链接了
- 和 CDN 解耦，不用担心 CDN 凉了的问题，只要保证 Github 图片链接不变，就可以随时切换 CDN

其实还可以进一步完善，比如将博文里的图片也用类似的方法，写作时只写一个类似本地路径的东西，然后在 hexo 生成的时候，自动替换成 图床链接，这样的话，就可以实现博文里的图片也可以随时切换 CDN 了。

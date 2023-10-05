---
title: Hexo on air! 持续集成，托管与 CDN 加速
tags:
  - Hexo
  - 博客部署
hidden: false
abbrlink: 74154e8b
date: 2023-02-15 21:28:43
categories: 搭建博客

---

 <meting-js
    server="netease"
    type="song"
    autoplay="true"
    id="18126594">
</meting-js>

这篇博客将承接上一篇精简部署，快速走一遍 Github Pages 托管后，着重介绍 通过 Github Actions 进行持续集成，Vercel、Netlify、Cloudflare Pages 等托管平台，以及 CDN 加速的配置。

## Deploy to Github Pages

关于 Github Pages 的部署，可以参考 [Hexo 官方文档](https://hexo.io/zh-cn/docs/github-pages)。

网上的教程也很多，这里直接给出一个简单的配置。

```yaml
# _config.yml
deploy:
  type: git
  repo: https://www.github.com/username/username.github.io.git
  branch: master
```

## CI by Github Actions

我们可以通过 Github Actions 来实现持续集成。

这种方式的好处是，我们可以在本地写好博客，然后通过 Github Actions 自动部署到 Github Pages 上。

因此，你不需要担心在不同的电脑上写博客的问题，只需要将博客的源码推送到 Github 上，Github Actions 就会自动部署。

毕竟，每次手动配 npm 环境，然后 `hexo d` 也是挺麻烦的。

### 配置 Github Actions

Github Actions 是 Github 提供的持续集成(CI/CD, Continuous Integration/Continuous Delivery)服务。

我们可以通俗的理解为，Github Actions 可以在我们推送代码到 Github 仓库时，自动配置 Hexo 环境，生成网站，然后部署到 Github Pages 上。

你需要在 Github 上新建一个仓库，来存储你的博客源码。

> 如果你很熟悉这些，你也完全可以在一个仓库中，用不同的分支来存储源码和部署后的静态文件。

让我们来看看配置文件的内容。

#### 开头

```yaml
# .github/workflows/autodeploy.yml
name: 自动部署
on:
    commit:
        branches:
            - master
```

这里比较好理解，这个配置文件的名字叫 `自动部署` ,当有改动推送到 master 分支时，启动 Action。

#### 环境配置与安装依赖

```yaml

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - name: 检查分支
              uses: actions/checkout@v4
              with:
                  ref: master
                  submodules: recursive

            - name: 安装 Node
              uses: actions/setup-node@v3
              with:
                  node-version: latest

            - name: 安装 Hexo
              run: |
                  export TZ='Asia/Shanghai'
                  npm install hexo-cli -g
```

`jobs` 是 Actions 的核心，这里我们定义了一个 `deploy` 任务，平台为 `ubuntu` 的最新版本 ( latest )。

接下来，我们

- 调用了 `actions/checkout@v4` 来 check out 分支 `master`，并且递归的获取子模块。
- 调用了 `actions/setup-node@v3` 来安装最新版本的 Node.js
- 执行 npm 的命令来安装 Hexo

在这里我们可以看到两点:

- 可以调用其他人写好的 Action，这里 acitons/checkout 和 actions/setup-node 都是 Github 官方提供的 Action。
- 可以通过 `run` 来直接执行命令，就像在终端里一样。

#### 生成 Hexo

``` yaml
            - name: 缓存 Hexo
              id: cache-npm
              uses: actions/cache@v3
              env:
                  cache-name: cache-node-modules
              with:
                  path: node_modules
                  key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
                  restore-keys: |
                      ${{ runner.os }}-build-${{ env.cache-name }}-
                      ${{ runner.os }}-build-
                      ${{ runner.os }}-

            - name: 安装依赖
              if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
              run: |
                  npm install

            - name: 生成静态文件
              run: |
                  hexo clean
                  hexo generate

            - name: 部署到Github
              uses: JamesIves/github-pages-deploy-action@v4
              with:
                  token: ${{ secrets.DEPLOY_TOKEN }}
                  repository-name: username/username.github.io
                  branch: master
                  folder: public
                  commit-message: "${{ github.event.head_commit.message }} Updated By Github Actions"
```

在这一步，我们使用 `npm install` 来安装需要的 npm 包。

如果你不理解 `缓存 Hexo` 这一步，可以翻阅 [缓存依赖项以加快工作流程 - Github 文档](https://docs.github.com/cn/actions/guides/caching-dependencies-to-speed-up-workflows)。

然后，就是熟悉的 `hexo clean` 和 `hexo generate` 了。

可以看到，这里我直接使用了 JamesIves 编写的 github-pages-deploy-action

> 当你使用这个 Action 时，你需要在仓库的 `Settings` -> `Secrets` 中添加一个名为 `DEPLOY_TOKEN` 的 secret，这个 token 可以在 Github 的 `Settings` -> `Developer settings` -> `Personal access tokens` 中生成。

请注意这楼里的 `repository-name` 和 `branch` 需要修改为你自己的仓库名和分支名。

当然，你也可以写一个自己的 Action，这里就不展开了。

## Deploy to Vercel、Netlify、Cloudflare Pages

实际上，很不幸的是，这几个貌似都快被 GFW 墙了。

托管到更专业的平台是有好处的：

- 免费的 HTTPS 与 TLS 证书
- 更快的访问速度 (当然，这也取决于你的访问者在哪里)
- CDN 加速
- 添加自己的域名
- 搜索引擎抓取收录的概率更高

这里我们以 Netlify 为例，介绍一下部署的过程。

> 可惜， Vercel 被墙了

首先，我们需要注册一个 Netlify 账号。点击 [这里](https://app.netlify.com/signup) 注册。

点击 `New site from Git`，选择 Github，然后选择你的博客仓库。

接下来，你需要配置一些参数。

### 配置参数

#### Build command

这里我们需要填写 `hexo generate`。

#### Publish directory

这里我们需要填写 `public`。

#### Advanced build settings

这里我们需要填写

```bash
npm install
```

## 自己的域名

以下的操作需要你有一个自己的域名。

### 如何有一个自己的域名

你可以在：

- [阿里云](https://wanwang.aliyun.com/domain/)
- [腾讯云](https://cloud.tencent.com/product/dnspod)
- [Godaddy](https://www.godaddy.com/zh)
- [Namecheap](https://www.namecheap.com/)
- [Cloudflare](https://www.cloudflare.com/)
- [Gandi](https://www.gandi.net/zh-hans)
- [Name.com](https://www.name.com/)

等等平台购买域名。

#### Cloudflare 提供 DNS 解析

使用 Cloudflare 加速，这需要你有一个域名。

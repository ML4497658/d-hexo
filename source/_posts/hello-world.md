---
title: 年轻人的第二个 Hexo 博客
---

# 重新构建 Hexo 博客

## 起因

先前的博客源码存在诸多问题:
- 包环境很乱,npm 报一堆版本错误
- 设置文件混乱，有的在主题文件夹中，有的在博客根目录下
- 注入 js 有的修改了主题文件，不利于主题升级
- 我忘了我是怎么把 Live 2d 看板娘设置的，找了半天没有找到设置

## 目标

- 尽量不动主题文件，保证升级稳定
- 全程用 git 记录
- 注入 js 单独放在 source/js/ 目录下，不使用 butterfly 自带的 js 注入(因为需要放在主题文件夹中)
- 配置文件集中在博客根目录下

# 过程记录

## 安装 Git

### 下载与安装

打开[ Git 下载页面](https://git-scm.com/download/win)
![如图](https://cdn.jsdelivr.net/gh/Jenway/J-figure-Bed/hexoGit.png)
下载并安装即可，你可以参照[这个教程](https://zhuanlan.zhihu.com/p/349473508)

### 设置环境变量

[添加Git到环境变量](https://www.jianshu.com/p/fee5baf756c8)

## 重新安装 Node.js

为了避免出现上次博客的坏情况(指 Node.js 版本在 16 我想升级结果出一堆错误)

这次采用了 nvs (Node Version Switcher)来管理 Node.js 版本

步骤如下:

### `Windows`

#### 删除以前的 Node.js

#### 下载安装 nvs
- winget 安装 (Windows 11 默认有) ,在终端输入:
> winget install jasongin.nvs
- 如果你有 chocolatey 也可在终端输入这个:
> choco install nvs
- 也可以直接下载安装
> https://github.com/jasongin/nvs/releases

#### 配置环境变量

打开系统变量 添加该项

|变量名 | 值|
|:---:|:---:|
|NVS_HOME | %ProgramData%\nvs|


#### 重启！

不知道为什么，nvs 我设置完环境变量之后还是没有生效，所以我重启了一遍就好了

#### 安装 Node.js

在终端中输入以下命令

安装最新版本的 node:

```
nvs add lts
```

将其添加到环境变量

```
nvs link lts
```
接下来 可以输入 `node -v` 检查一下，终端的输出应该是版本号
在 2023 年二月份的结果如下
```
$ node -v
> v18.14.0
```
### 其它系统

参见 https://github.com/jasongin/nvs

## 安装 Hexo

终端输入

`npm install -g hexo-cli` 

## 初始化博客

找个合适的地方打开终端或者 cd 过去。

[打开 终端](https://blog.csdn.net/weixin_44679832/article/details/123942274)

`hexo init blog` 

`cd blog`

# WARNING

博主开摆了，接下来的不面向纯新手了~

## 安装主题

再次选择了 Butterfly

`git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly` 

将 主题的 .git 文件夹暂时放在博客文件夹外，避免 git commit 时冲突

## 博客源码 git 初始化

`git init`

然后，修改 .gitignore (若没有就新建)

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
.deploy_git*/
.idea
themes/**/.git
```

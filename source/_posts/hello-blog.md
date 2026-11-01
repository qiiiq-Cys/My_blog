---
title: 从零搭一个自己的博客：Hexo + GitHub Pages + utterances
date: 2026-11-01 21:50:00
categories: 折腾
tags:
  - Hexo
  - GitHub Pages
  - 博客
description: 一份给自己留的备忘录——这套博客是怎么跑起来的，以及以后怎么发文章。
---

这是第一篇，写给自己看：把整条链路讲清楚，以后忘了回来翻。

<!-- more -->

## 整件事的分工

三个工具各干一件事，互不干扰：

| 环节 | 工具 | 干什么 |
| --- | --- | --- |
| 写作与生成 | Hexo | 把 Markdown 编译成静态网站（HTML/CSS/JS） |
| 托管 | GitHub Pages | 免费存放静态文件，给一个公开网址 |
| 评论 | utterances | 用 GitHub Issues 当评论区 |

关键理解：**GitHub Pages 只会“发文件”，不会“跑程序”**。所以博客上不可能有数据库、不能跑后端代码。评论之所以能做，是因为 utterances 用一个 JS 脚本在前端请求 GitHub 的 API，评论内容实际存在 Issues 里——绕了一圈，还是静态的。

## 本地是怎么跑的

Hexo 的目录分工：

```text
My_blog/
├── source/            # 你写的东西
│   ├── _posts/        # 文章（.md）
│   ├── _drafts/       # 草稿，本地预览才可见
│   ├── about/         # 独立页面
│   ├── tags/          # 标签聚合页
│   └── categories/    # 分类聚合页
├── scaffolds/         # 新建文章时的模板
├── themes/            # 主题（这里用 npm 装的 NexT，放在 node_modules）
├── _config.yml        # 站点主配置
├── _config.next.yml   # 主题配置（只写要改的项）
└── public/            # 编译产物（自动生成，不进 Git）
```

常用命令：

```bash
hexo server      # 本地预览：http://localhost:4000
hexo new "标题"   # 新建文章
hexo generate    # 生成静态文件到 public/
hexo deploy      # 推送到 GitHub
hexo clean       # 清缓存（改配置没生效时用）
```

`hexo deploy` 内部做的事：把 `public/` 里的内容 commit 到仓库的 `main` 分支再 push。所以**生成的东西从不进你的源码分支**，两边是分开的。

## 写文章时能用什么

标题用 `##`，加粗用 `**`，这些不说了。几个值得记的：

引用：

> 写作是把想不清楚的事情，逼自己写清楚的过程。

代码块带语言标记，会有高亮和复制按钮：

```javascript
console.log('hello, blog')
```

折叠内容（适合放长代码或答案）：

<details>
<summary>点开看更多</summary>

这里的文字默认隐藏。

</details>

## 评论是怎么挂上去的

utterances 的脚本长这样，被塞进每篇文章页的模板里：

```html
<script src="https://utteranc.es/client.js"
        repo="qiiiq-Cys/My_blog"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

它做的事：读当前页面的 `pathname`，去 `qiiiq-Cys/My_blog` 的 Issues 里找标题匹配的那条；找不到就等你第一条评论时自动创建。

所以：

- **删评论 = 去对应 Issue 里删 comment**
- **关掉某篇文章的评论 = 在该篇文章 front-matter 里写 `comments: false`**
- 首次有人评论时，GitHub 会给仓库 owner 发通知

## 提醒自己

- 改 `_config.yml` 后一定要重启 `hexo server`，热更新不重读配置
- 换了仓库名或域名，`url` 和 `root` 必须同步改，否则样式全丢
- 文章文件名尽量别改，`pathname` 变了评论就对不上了

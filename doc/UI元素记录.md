# UI 元素记录

本文档记录站点中所有添加的 UI 元素的位置、作用与交互逻辑。

---

## 全局布局

### Header（顶部导航）

- **位置**：所有页面顶部，`src/components/Header.astro`
- **作用**：站点名称（链接到首页）、主导航（首页、项目、作品、博客、关于）
- **交互**：
  - 桌面端：导航链接横排显示，点击跳转对应页面
  - 移动端（≤768px）：导航默认收起，右侧显示汉堡按钮；点击按钮展开/收起导航（通过 `aria-hidden` 与 `aria-expanded` 控制）

### Footer（页脚）

- **位置**：所有页面底部，`src/components/Footer.astro`
- **作用**：展示「首页」「关于」链接与版权文案
- **交互**：链接点击跳转，悬停时强调色高亮

---

## 首页

### 个人介绍区（intro）

- **位置**：首页顶部，`src/pages/index.astro`
- **作用**：标题「个人网站」与副标题「项目展示 · 作品集 · 技术博客」
- **动效**：首屏以 `fadeInUp` 动画入场

### 三块内容区（SectionBlock）

- **位置**：首页中部，依次为「项目」「作品」「博客」
- **作用**：每块展示该分类下的若干条摘要（Card），底部有「查看全部」链接到对应列表页
- **动效**：三块依次错落入场（`animation-delay`）

### Card（卡片）

- **位置**：首页三块内、项目列表、作品列表、博客列表
- **作用**：展示单条目的标题与描述，点击整卡跳转详情
- **交互**：悬停时边框高亮、卡片轻微上移（`transform: translateY(-2px)`）

---

## 列表页

### 项目列表（/projects/）

- **位置**：`src/pages/projects/index.astro`
- **作用**：以卡片网格展示所有项目，按 `order` 排序

### 作品列表（/works/）

- **位置**：`src/pages/works/index.astro`
- **作用**：以卡片网格展示所有作品，按 `order` 排序

### 博客列表（/blog/）

- **位置**：`src/pages/blog/index.astro`
- **作用**：以卡片网格展示所有博客，按发布时间倒序

---

## 详情页

### 项目详情（/projects/[slug]/）

- **位置**：`src/pages/projects/[slug].astro`
- **作用**：展示单个项目的标题、描述、链接（若有）、正文（Markdown 渲染）

### 作品详情（/works/[slug]/）

- **位置**：`src/pages/works/[slug].astro`
- **作用**：展示单件作品的标题、描述、正文（Markdown 渲染）

### 博客详情（/blog/[slug]/）

- **位置**：`src/pages/blog/[slug].astro`
- **作用**：展示单篇博客的标题、发布日期、标签、正文（Markdown 渲染）

---

## 关于页

### 关于（/about/）

- **位置**：`src/pages/about.astro`
- **作用**：静态文案，用于个人简介与联系方式（内容可自行修改）

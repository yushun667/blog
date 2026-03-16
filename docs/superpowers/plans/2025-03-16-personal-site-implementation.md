# 个人网站（GitHub Pages）实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在仓库中实现博客 + 项目 + 作品展示的 React 静态站，并配置部署到 GitHub Pages（yushun667/blog）。

**Architecture:** 使用 Vite 构建 React 应用，React Router 负责路由；博客/项目/作品内容存放在 `content/` 下（Markdown + JSON），构建时通过 `import.meta.glob` 或脚本解析为数据供页面使用；部署采用 GitHub Actions 构建后推送到 `gh-pages` 分支；图标与 LOGO 路径在配置与 doc 中集中说明以便替换。

**Tech Stack:** React 18、Vite、React Router DOM、gray-matter + 任选 Markdown 渲染库（如 react-markdown）、CSS 变量 + 全局/组件样式。

**Spec:** `docs/superpowers/specs/2025-03-16-personal-site-design.md`

---

## 文件结构

| 路径 | 职责 |
|------|------|
| `index.html` | Vite 入口 HTML，含 favicon/logo 等 link 引用 |
| `package.json` | 依赖与脚本（dev、build） |
| `vite.config.js` | Vite 配置：base（GitHub Pages 为 `/blog/`）、build 输出 |
| `public/favicon.ico` | 站点 favicon（占位即可，替换说明见 doc） |
| `public/logo.svg` | 站点 LOGO（占位即可） |
| `public/icons/` | 可选；社交等图标或后续用图标库 |
| `src/main.jsx` | React 挂载、Router 包裹 |
| `src/App.jsx` | 路由定义（/、/blog、/blog/:slug、/projects、/works、/about、* → NotFound） |
| `src/index.css` | 全局样式、CSS 变量（色彩、字体、间距） |
| `src/config/site.js` | 站点常量：basePath、logo 路径、站点名等（图标/LOGO 引用集中于此或注释） |
| `src/components/Layout.jsx` | 布局：Header + 主内容区 + Footer |
| `src/components/Header.jsx` | 顶部导航、LOGO 链接到首页 |
| `src/components/Footer.jsx` | 页脚、可选社交链接 |
| `src/components/Card.jsx` | 通用卡片（博客摘要、项目、作品项） |
| `src/pages/Home.jsx` | 首页：简介 + 博客/项目/作品入口 |
| `src/pages/Blog.jsx` | 博客列表页，从内容层取列表数据 |
| `src/pages/BlogPost.jsx` | 单篇文章页，根据 slug 取文章渲染 |
| `src/pages/Projects.jsx` | 项目列表页 |
| `src/pages/Works.jsx` | 作品展示页 |
| `src/pages/About.jsx` | 关于页（头像、简介、联系） |
| `src/pages/NotFound.jsx` | 404 页 |
| `src/lib/content.js` | 内容层：解析 content/ 下 Markdown/JSON，导出 getPosts、getPostBySlug、getProjects、getWorks 等 |
| `content/posts/*.md` | 博客文章，frontmatter：title、date、summary、tags |
| `content/projects.json` 或 `content/projects/*.md` | 项目数据 |
| `content/works.json` 或 `content/works/*.md` | 作品数据 |
| `doc/操作手册.md` | 项目操作说明（运行、构建、部署、目录说明） |
| `doc/静态资源与品牌替换说明.md` | 图标与 LOGO 路径、规格、替换步骤（与设计 §8 一致） |
| `.github/workflows/deploy.yml` | CI：push main → npm ci && npm run build → 推 dist 到 gh-pages |

---

## Chunk 1: 项目脚手架与路由

### Task 1.1: 初始化 Vite + React 项目

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`（占位路由）

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "blog",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.js（含 base 以适配 GitHub Pages）**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/blog/',
})
```

- [ ] **Step 3: 创建 index.html（根目录）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>个人网站</title>
  <link rel="icon" type="image/svg+xml" href="/blog/favicon.svg" />
  <link rel="apple-touch-icon" href="/blog/apple-touch-icon.png" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

注意：若使用 HashRouter，base 仍为 `/blog/`，favicon 路径与 public 中文件对应。

- [ ] **Step 4: 创建 src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
```

- [ ] **Step 5: 创建 src/App.jsx（仅路由骨架）**

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Projects from './pages/Projects'
import Works from './pages/Works'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 6: 创建占位组件与页面**

创建以下文件，每个只导出简单占位内容（如 `<div>页面名</div>`），保证路由可渲染：
- `src/components/Layout.jsx`：`export default function Layout({ children }) { return <div><header>Header</header><main>{children}</main><footer>Footer</footer></div> }`
- `src/pages/Home.jsx`、`Blog.jsx`、`BlogPost.jsx`、`Projects.jsx`、`Works.jsx`、`About.jsx`、`NotFound.jsx`

- [ ] **Step 7: 创建 src/index.css（空或仅 body 重置）**

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; }
```

- [ ] **Step 8: 安装依赖并验证**

Run: `cd /Volumes/SSD_1T/develop/blog && npm install`  
Run: `npm run build`  
Expected: 构建成功，无报错。  
Run: `npm run preview`（可选），在浏览器打开带 `/blog/` 的地址，点击导航到各路由，确认不报错。

- [ ] **Step 9: 提交**

```bash
git add package.json package-lock.json vite.config.js index.html src/
git commit -m "chore: 初始化 Vite + React 与路由骨架"
```

---

## Chunk 2: 内容层与博客

### Task 2.1: 内容目录与 Markdown 解析依赖

**Files:**
- Create: `content/posts/` 目录
- Create: `content/posts/hello.md`（示例文章，含 frontmatter）
- Modify: `package.json`（添加 gray-matter、react-markdown 等）

- [ ] **Step 1: 添加依赖**

在 package.json 的 dependencies 中增加：`"gray-matter": "^4.0.3"`, `"react-markdown": "^9.0.1"`（或使用 marked 等，任选其一）。  
Run: `npm install`

- [ ] **Step 2: 创建示例博客 content/posts/hello.md**

```markdown
---
title: 第一篇文章
date: 2025-03-16
summary: 这是摘要
tags: [随笔]
---

正文内容 **加粗**。
```

- [ ] **Step 3: 实现内容层 src/lib/content.js**

实现逻辑：使用 Vite 的 `import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw', import: 'default' })` 读取所有 md 文件原始字符串，用 gray-matter 解析，得到 `{ slug, title, date, summary, tags, body }` 列表；导出 `getPosts()`（按 date 倒序）、`getPostBySlug(slug)`。slug 可由文件名去掉 .md 得到。若 Vite 不支持 content 目录在根下，可将 content 放在 src 内或通过 vite 的 publicDir/配置保证能 glob 到。

（若 `import.meta.glob` 无法直接指向项目根下 content，替代方案：在 vite 构建时用脚本扫描 content/posts 生成 src/data/posts.json，再在 content.js 中 import 该 JSON。）

- [ ] **Step 4: 在 Blog 与 BlogPost 页面使用内容层**

- `src/pages/Blog.jsx`：调用 `getPosts()`，渲染列表（标题、摘要、日期、链接到 `/blog/:slug`）。
- `src/pages/BlogPost.jsx`：用 `useParams()` 取 slug，`getPostBySlug(slug)`；若无则渲染 404 或重定向；正文用 react-markdown 渲染。

- [ ] **Step 5: 验证**

Run: `npm run build`。打开 preview 后访问 /blog 与 /blog/hello，确认列表与文章内容正确。

- [ ] **Step 6: 提交**

```bash
git add content/ src/lib/content.js src/pages/Blog.jsx src/pages/BlogPost.jsx package.json package-lock.json
git commit -m "feat: 内容层解析 Markdown 博客与博客列表/文章页"
```

---

## Chunk 3: 项目与作品数据

### Task 3.1: 项目与作品数据源与页面

**Files:**
- Create: `content/projects.json`（或 content/projects/*.md，按设计选一种）
- Create: `content/works.json`（或 content/works/*.md）
- Modify: `src/lib/content.js`（导出 getProjects、getWorks）
- Modify: `src/pages/Projects.jsx`、`src/pages/Works.jsx`

- [ ] **Step 1: 定义 projects 与 works 数据结构**

例如 projects: `[{ id, title, summary, tech, link, date }]`，works: `[{ id, title, image, description }]`。在 content.js 或单独 data 文件中从 JSON 读取（import 或 fetch 静态 JSON）；若用 Markdown 则与博客类似用 glob + gray-matter。

- [ ] **Step 2: 创建 content/projects.json、content/works.json 示例各一条**

- [ ] **Step 3: 在 content.js 中实现 getProjects()、getWorks()**

- [ ] **Step 4: Projects 与 Works 页面渲染列表**

Projects 页：展示项目卡片（标题、简介、技术栈、链接）。Works 页：展示作品卡片（图、标题、说明）。图片路径使用 public 或 content 下路径，与 base 一致。

- [ ] **Step 5: 验证与提交**

Run: `npm run build` 与 preview，确认 /projects、/works 正常。  
`git add content/ src/lib/content.js src/pages/Projects.jsx src/pages/Works.jsx && git commit -m "feat: 项目与作品数据与列表页"`

---

## Chunk 4: 布局、首页、关于与 404

### Task 4.1: 站点配置与布局组件

**Files:**
- Create: `src/config/site.js`（basePath、siteName、logoPath、faviconPath 等，与设计 §8 一致）
- Modify: `src/components/Header.jsx`：使用 site 配置的 logo 路径、站点名、导航链接
- Modify: `src/components/Footer.jsx`：版权、可选社交链接（图标路径从 site 或 public/icons 引用）
- Modify: `src/components/Layout.jsx`：引入 Header、Footer，主内容区包住 children

### Task 4.2: 首页与关于、404

**Files:**
- Modify: `src/pages/Home.jsx`：简短介绍 + 三个入口卡片/链接（博客、项目、作品）
- Modify: `src/pages/About.jsx`：头像（使用 public/avatar.jpg 或配置路径）、简介、联系方式
- Modify: `src/pages/NotFound.jsx`：友好 404 文案与返回首页链接，样式与全站一致

- [ ] **Step 1: 创建 src/config/site.js**

集中导出：`basePath: '/blog'`、`siteName: '个人网站'`、`logoPath: '/blog/logo.svg'`、`faviconPath: '/blog/favicon.svg'`、`avatarPath: '/blog/avatar.jpg'` 等（与设计 §8 表一致）。注释说明：替换图标/LOGO 时覆盖 public 下对应文件即可。

- [ ] **Step 2: 实现 Header、Footer、Layout**

- [ ] **Step 3: 实现 Home、About、NotFound**

- [ ] **Step 4: 占位静态资源**

在 public 下放置占位 favicon.svg、logo.svg（可简单 SVG 或 1x1 透明图），避免 404。若有 apple-touch-icon、avatar，同样占位或文档说明“替换时放入”。

- [ ] **Step 5: 验证与提交**

`npm run build` 与预览，检查首页、关于、404 及 Header/Footer 链接。  
`git add src/config/ src/components/ src/pages/ public/ && git commit -m "feat: 布局、首页、关于与 404，站点配置与占位资源"`

---

## Chunk 5: 样式与杂志/编辑感（frontend-design）

### Task 5.1: 全局样式与 CSS 变量

**Files:**
- Modify: `src/index.css`：定义 CSS 变量（主色、强调色、字体、间距），符合设计 §4（杂志/编辑感）

### Task 5.2: 组件样式与动效

**Files:**
- Modify: `src/components/Card.jsx`：卡片样式、hover 状态
- Modify: 各页面与 Layout：版式、大标题、留白、列表网格；轻量过渡（fade/slide）可选

- [ ] **Step 1: 在 index.css 中设定字体与色彩变量**

例如：`--font-heading`、`--font-body`、`--color-primary`、`--color-accent`、`--space-unit`。选用非通用字体（设计 §4）。

- [ ] **Step 2: 统一卡片与列表版式**

- [ ] **Step 3: 为链接/卡片添加 hover 与必要过渡**

- [ ] **Step 4: 验证与提交**

`git add src/index.css src/components/ src/pages/ && git commit -m "style: 杂志/编辑感全局样式与组件动效"`

---

## Chunk 6: 文档与部署

### Task 6.1: 操作手册与图标替换说明

**Files:**
- Create: `doc/操作手册.md`：项目介绍、本地运行（npm run dev/build）、目录说明、部署流程（见下方 workflow）
- Create: `doc/静态资源与品牌替换说明.md`：与设计 §8 一致——每个图标/LOGO 的路径、规格、替换步骤（覆盖文件或改配置、是否需重新构建）

- [ ] **Step 1: 编写 doc/操作手册.md**

包含：克隆后 `npm install`、`npm run dev` / `npm run build`、public 与 content 目录说明、GitHub Pages 部署方式（使用 Actions 推 gh-pages）。

- [ ] **Step 2: 编写 doc/静态资源与品牌替换说明.md**

列出站点 LOGO、Favicon、Apple Touch Icon、关于页头像、社交图标的路径、推荐尺寸、替换步骤；注明“路径在 src/config/site.js 与 index.html 中集中引用”。

- [ ] **Step 3: 提交**

`git add doc/ && git commit -m "docs: 操作手册与静态资源/品牌替换说明"`

### Task 6.2: GitHub Actions 部署

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建 workflow**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

注意：Vite 的 base 为 `/blog/`，构建出的资源路径会带 `/blog/`；GitHub Pages 若使用 project site（如 yushun667.github.io/blog），则发布目录选 gh-pages 的根即可，页面访问为 `https://yushun667.github.io/blog/`。

- [ ] **Step 2: 提交**

`git add .github/workflows/deploy.yml && git commit -m "ci: 添加 GitHub Actions 部署到 gh-pages"`

---

## 完成检查

- [ ] 本地 `npm run build` 通过，`npm run preview` 下所有路由可访问且样式正常。
- [ ] 设计说明 §8 中列出的图标/LOGO 路径已在 `src/config/site.js` 或 index.html 中集中配置，并在 `doc/静态资源与品牌替换说明.md` 中写清替换方式。
- [ ] 推送 main 后 GitHub Actions 成功，仓库 Settings → Pages 选择 gh-pages 分支，站点可访问。
- [ ] 代码结构符合设计 §6（模块职责清晰）；doc 下已有操作手册与图标替换说明。

---

**Plan complete. Next:** 执行本计划时可使用 superpowers:executing-plans 或 subagent-driven-development；每完成一个 Chunk 可做一次自检或 review，再继续下一 Chunk。

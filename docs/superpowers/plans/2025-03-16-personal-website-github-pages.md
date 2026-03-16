# 个人网站（GitHub Pages）实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 blog 仓库中搭建基于 Astro 的静态个人网站，包含项目展示、作品集、技术博客三块并列首页，具备有辨识度的视觉与动效，并配置部署到 GitHub Pages。

**Architecture:** Astro 4.x 静态站点；博客与项目/作品通过 Content Collections（Markdown）驱动；全局布局与组件复用；样式用 CSS 变量与 frontend-design 规范；构建输出 dist/，由 GitHub Actions 部署。

**Tech Stack:** Astro 4.x、Content Collections、Markdown、CSS（变量 + 动效）、GitHub Actions。

**Spec:** `docs/superpowers/specs/2025-03-16-personal-website-github-pages-design.md`

---

## File Structure

| 职责 | 路径 |
|------|------|
| 配置 | `astro.config.mjs`, `package.json`, `tsconfig.json` |
| 布局 | `src/layouts/BaseLayout.astro` |
| 组件 | `src/components/Header.astro`, `Footer.astro`, `Card.astro`, `SectionBlock.astro`（首页三块） |
| 样式 | `src/styles/global.css`（变量、字体、基础样式） |
| 页面 | `src/pages/index.astro`, `projects/index.astro`, `projects/[slug].astro`, `works/index.astro`, `works/[slug].astro`, `blog/index.astro`, `blog/[slug].astro`, `about.astro` |
| 内容 | `src/content/config.ts`, `src/content/blog/*.md`, `src/content/projects/*.md`, `src/content/works/*.md` |
| 静态资源 | `public/favicon.svg`（占位即可） |
| 部署 | `.github/workflows/deploy.yml` |
| 文档 | `doc/操作手册.md`, `doc/UI元素记录.md`, `doc/占位功能记录.md`（按用户规则） |
| 忽略 | `.gitignore`（含 `dist/`, `node_modules/`, `.env`, `.superpowers/`） |

---

## Chunk 1: 项目初始化与基础配置

- [ ] **Step 1.0: 初始化 Git（若尚未初始化）**

若仓库根目录未执行过 `git init`，则先执行：

```bash
cd /Volumes/SSD_1T/develop/blog
git init
```

- [ ] **Step 1.1: 初始化 Astro 项目**

在仓库根目录执行（当前为空）：

```bash
cd /Volumes/SSD_1T/develop/blog
npm create astro@latest . -- --template minimal --install --no-git --typescript strict --yes
```

若提示目录非空，选 “Continue” 或先确保仅含 `docs/` 等再执行。

- [ ] **Step 1.2: 确认并补充依赖**

确认 `package.json` 含 `astro`。如需 MDX 再追加（本计划先仅 Markdown）：

```bash
npm install
```

- [ ] **Step 1.3: 配置 astro.config.mjs**

修改 `astro.config.mjs`：设置 `site`（如 `https://<username>.github.io` 或 `https://<username>.github.io/blog`）、`base`（若仓库名非 `username.github.io` 则 `base: '/blog/'`）。输出为 static，无需 server 适配器。

- [ ] **Step 1.4: 添加 .gitignore**

创建或合并 `.gitignore`，包含：

```
dist/
node_modules/
.env
.env.*
.superpowers/
```

- [ ] **Step 1.5: 创建 doc 目录与文档骨架**

创建 `doc/操作手册.md`、`doc/UI元素记录.md`、`doc/占位功能记录.md`，各写简短说明（如「待实施计划后更新」），便于后续按用户规则补充。

- [ ] **Step 1.6: 提交**

```bash
git add .
git commit -m "chore: 初始化 Astro 项目与基础配置、doc 骨架"
```

---

## Chunk 2: 布局与全局样式（有辨识度）

- [ ] **Step 2.1: 全局样式与 CSS 变量**

创建 `src/styles/global.css`：
- 定义 CSS 变量：主色、背景、文字、辅助色（参考 frontend-design：避免 Inter/紫色渐变，选有辨识度配色）。
- 引入一款展示字体（Google Fonts 或本地，如 DM Serif Display / 思源宋体等）用于标题，正文用易读无衬线/衬线。
- 基础 reset 与 body 字号、行高。

- [ ] **Step 2.2: BaseLayout**

创建 `src/layouts/BaseLayout.astro`：
- 使用 `<slot />` 包裹主内容。
- 引入 `src/styles/global.css`。
- 包含 `<Header />` 与 `<Footer />` 占位（下一步实现）。

- [ ] **Step 2.3: Header 组件**

创建 `src/components/Header.astro`：
- 站点名称/Logo（可链接到 `/`）。
- 导航链接：首页、项目、作品、博客、关于（对应 `/`, `/projects/`, `/works/`, `/blog/`, `/about/`）。
- 桌面端横排；移动端通过 CSS 或简单 JS 折叠为菜单（汉堡图标 + 展开/收起）。

- [ ] **Step 2.4: Footer 组件**

创建 `src/components/Footer.astro`：
- 版权或简短文案；可选：链接回首页、关于。

- [ ] **Step 2.5: 提交**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: 添加全局样式与布局、Header/Footer 组件"
```

---

## Chunk 3: Content Collections 与示例内容

- [ ] **Step 3.1: 定义 content config**

创建 `src/content/config.ts`，定义三个 collection：
- `blog`：`type: 'content'`, `schema` 含 `title`, `description`, `pubDate`, `tags`（数组）, 可选 `draft`。
- `projects`：`type: 'content'`, `schema` 含 `title`, `description`, `link`（可选）, `tech`（可选数组）, `order`（数字，用于排序）。
- `works`：`type: 'content'`, `schema` 含 `title`, `description`, `image`（可选）, `link`（可选）, `order`。

- [ ] **Step 3.2: 博客示例文章**

在 `src/content/blog/` 下新建至少一篇 `.md`，含 frontmatter（title, description, pubDate, tags）与正文，slug 由文件名生成。

- [ ] **Step 3.3: 项目与作品示例**

在 `src/content/projects/` 与 `src/content/works/` 下各新建至少一项 `.md`，填写上述 schema 字段。

- [ ] **Step 3.4: 提交**

```bash
git add src/content/
git commit -m "feat: 添加 Content Collections 配置与示例内容"
```

---

## Chunk 4: 页面实现

- [ ] **Step 4.1: 首页 index.astro**

创建 `src/pages/index.astro`：
- 使用 BaseLayout。
- 三个区块：项目、作品、博客（可用 `SectionBlock.astro` 或内联），每块展示少量摘要并链接到 `/projects/`、`/works/`、`/blog/`。
- 可加一句个人介绍文案。

- [ ] **Step 4.2: SectionBlock 与 Card 组件**

创建 `src/components/SectionBlock.astro`（接收 title、children/slot、ctaLink、ctaText）。  
创建 `src/components/Card.astro`（标题、描述、链接等，用于列表与首页摘要）。

- [ ] **Step 4.3: 项目列表与详情**

创建 `src/pages/projects/index.astro`：从 `getCollection('projects')` 取数据，按 `order` 或日期排序，用 Card 渲染列表。  
创建 `src/pages/projects/[slug].astro`：`getStaticPaths` 来自 projects collection，渲染单篇 frontmatter + Content。

- [ ] **Step 4.4: 作品列表与详情**

同上，`src/pages/works/index.astro` 与 `src/pages/works/[slug].astro`，数据来自 `works` collection。

- [ ] **Step 4.5: 博客列表与详情**

创建 `src/pages/blog/index.astro`：`getCollection('blog')` 按 `pubDate` 倒序，用 Card 列表。  
创建 `src/pages/blog/[slug].astro`：渲染单篇博客，使用 Astro 的 `<Content />` 或等价方式渲染 Markdown。

- [ ] **Step 4.6: 关于页**

创建 `src/pages/about.astro`：简单关于我/联系方式文案，使用 BaseLayout。

- [ ] **Step 4.7: 验证构建**

```bash
npm run build
```

确认无报错，且 `dist/` 下存在 index.html、projects/、works/、blog/、about 等路径。

- [ ] **Step 4.8: 提交**

```bash
git add src/pages/ src/components/SectionBlock.astro src/components/Card.astro
git commit -m "feat: 实现首页与项目/作品/博客列表与详情、关于页"
```

---

## Chunk 5: 响应式与动效

- [ ] **Step 5.1: 导航移动端折叠**

在 Header 中实现：小屏下导航隐藏，显示汉堡按钮；点击切换显示/隐藏（可用纯 CSS `:target` 或少量 JS）。样式与断点写在 `global.css` 或 Header 内。

- [ ] **Step 5.2: 首屏或区块动效**

在 `global.css` 或首页中为三块区域添加轻微入场动效（如 opacity + transform，animation-delay 错开），优先纯 CSS。

- [ ] **Step 5.3: 卡片/链接悬停反馈**

为 Card 与导航链接添加 hover 状态（颜色或轻微位移/缩放），使用 `transition`。

- [ ] **Step 5.4: 提交**

```bash
git add src/components/Header.astro src/styles/global.css src/pages/index.astro src/components/Card.astro
git commit -m "feat: 响应式导航与首屏、卡片动效"
```

---

## Chunk 6: 部署与文档

- [ ] **Step 6.1: GitHub Actions 工作流**

创建 `.github/workflows/deploy.yml`：
- 触发：push 到 main（或 master，与仓库默认分支一致）。
- 步骤：checkout → 设置 Node → `npm ci` → `npm run build` → 使用 `peaceiris/actions-gh-pages` 或官方 `actions/upload-pages-artifact` + `actions/deploy-pages`，将 `dist/` 部署到 GitHub Pages。
- 若仓库非 `username.github.io`，确保 Astro 的 `base` 已配置为 `'/repo-name/'`。

- [ ] **Step 6.2: 操作手册**

更新 `doc/操作手册.md`：如何克隆、安装依赖、本地开发（`npm run dev`）、如何写/改博客（编辑 `src/content/blog/*.md`）、如何添加项目/作品、如何构建与部署（push 后自动）、GitHub 仓库 Pages 设置要点。

- [ ] **Step 6.3: UI 元素记录**

更新 `doc/UI元素记录.md`：列出所有添加的 UI 元素（Header、Footer、首页三块、Card、导航、关于页等），写明位置、作用、交互逻辑（含移动端折叠、悬停等）。

- [ ] **Step 6.4: 占位功能记录**

若有仅占位未实现的功能，在 `doc/占位功能记录.md` 中登记；若无则写「当前无占位功能」。

- [ ] **Step 6.5: 最终提交**

```bash
git add .github/workflows/deploy.yml doc/
git commit -m "feat: 添加 GitHub Pages 部署工作流与 doc 操作手册、UI 记录"
```

---

## Execution Handoff

完成上述所有步骤后：

- 在仓库 Settings → Pages 中将 Source 设为 “GitHub Actions”。
- 若为新仓库，执行 `git init` 并添加 remote 后 push 到 main，触发首次部署。

**Plan complete and saved to `docs/superpowers/plans/2025-03-16-personal-website-github-pages.md`. Ready to execute?**

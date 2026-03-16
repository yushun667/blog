# 个人网站（GitHub Pages）设计说明

**日期**：2025-03-16  
**状态**：已与用户逐节确认

---

## 1. 目标与范围

- **产品**：个人网站，部署于 GitHub Pages，仅中文。
- **功能**：项目展示、作品集、技术博客，三者平起平坐（首页三块并列，无单一主推）。
- **体验**：有辨识度的视觉与动效，避免通用模板感。

---

## 2. 信息架构与页面结构

| 路径 | 说明 |
|------|------|
| `/` | 首页：项目 / 作品 / 博客 三块并列，可带一句个人介绍 |
| `/projects/` | 项目列表 |
| `/projects/[slug]/` | 单个项目详情 |
| `/works/` | 作品集列表 |
| `/works/[slug]/` | 单件作品详情 |
| `/blog/` | 博客列表（按时间，可带标签/分类） |
| `/blog/[slug]/` | 单篇博客正文 |
| `/about/` | 关于我 / 联系方式 |

- **全局导航**：首页、项目、作品、博客、关于（顶部；移动端可折叠）。
- **URL**：使用英文或拼音 slug，便于分享与 SEO。

---

## 3. 技术架构与项目结构

- **技术选型**：Astro 4.x，静态构建，输出纯 HTML/CSS/JS。
- **内容**：不加 CMS；博客与项目/作品均基于仓库内文件（Markdown 或 JSON）。

**目录结构**：

```
blog/
├── src/
│   ├── layouts/          # 全局布局（站点头尾、导航）
│   ├── components/       # 可复用组件
│   ├── pages/
│   │   ├── index.astro   # 首页
│   │   ├── projects/index.astro, [slug].astro
│   │   ├── works/index.astro, [slug].astro
│   │   ├── blog/index.astro, [slug].astro
│   │   └── about.astro
│   └── styles/           # 全局样式、CSS 变量、主题
├── content/
│   ├── blog/             # .md → Content Collections
│   ├── projects/         # 项目数据
│   └── works/            # 作品数据
├── public/               # 静态资源
├── astro.config.mjs
└── package.json
```

- **博客**：`content/blog/*.md`，Astro Content Collections，自动生成列表与正文。
- **项目/作品**：Content Collections（每项一 .md）或统一 JSON，由列表页与 `[slug].astro` 读取。
- **构建**：`npm run build` → `dist/`；部署由 GitHub Actions 将 `dist/` 推至 GitHub Pages。

---

## 4. 内容与维护

- **写/改博客**：在 `content/blog/` 下新建或编辑 `.md`，frontmatter 含 title、description、pubDate、tags 等，正文为 Markdown。
- **项目/作品**：在 `content/projects/`、`content/works/` 中维护数据或 Markdown。
- **图片**：放在 `public/` 或通过 frontmatter 引用。
- **发布**：改文件 → 提交并 push → GitHub Actions 自动构建并更新 GitHub Pages。

---

## 5. 视觉与交互方向

- **字体**：标题用有辨识度的展示字体，正文用易读的衬线/无衬线；CSS 变量统一管理。
- **色彩**：主色 + 背景/文字对比 + 少量辅助色；避免通用 AI 风配色。
- **动效**：首屏或区块可轻微错落出现；悬停/点击有明确反馈；优先 CSS，必要时少量 JS。
- **布局**：首页三块分区清晰；列表与详情留白充足、阅读友好。
- **响应式**：导航在移动端折叠；栅格/卡片小屏单列。

实现时按 frontend-design 规范落实，并保证与 Astro 静态输出兼容。

---

## 6. 部署

- **方式**：GitHub Actions 在 push 到 main 时执行 `npm run build`，将 `dist/` 部署到 GitHub Pages。
- **配置**：仓库 Settings → Pages → Source 选 “GitHub Actions”；若仓库非 `username.github.io`，需在 Astro 中配置 `site` 与 `base`（如 `base: '/repo-name/'`）。

---

## 7. 后续步骤

- 用户审阅本设计文档并确认。
- 调用 writing-plans 产出实施计划，再进入开发（含 frontend-design 实现与 doc 目录操作手册/UI 记录等）。

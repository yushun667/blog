# 个人网站设计说明

**文档日期**：2025-03-16  
**目标**：博客 + 项目展示 + 作品展示，部署至 GitHub Pages（`git@github.com:yushun667/blog.git`）

---

## 1. 目标与范围

- **用途**：个人网站，包含博客、项目展示、作品展示。
- **技术选型**：React + Vite，构建为静态站点，部署到 GitHub Pages。
- **设计方向**：杂志/编辑感；界面设计遵循 frontend-design 原则（版式、字体、色彩、动效、空间层次）。
- **成功标准**：
  - 在 GitHub Pages 地址可稳定访问。
  - 博客列表与文章页、项目列表、作品展示可正常浏览，风格统一。
  - 新增内容通过编辑 Markdown/数据并重新构建即可发布。

---

## 2. 信息架构与路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：简短介绍 + 入口（博客 / 项目 / 作品），可含一句个人定位。 |
| `/blog` | 博客列表：标题、摘要、日期、可选标签。 |
| `/blog/:slug` | 单篇博客文章页。 |
| `/projects` | 项目列表：名称、简介、技术栈、链接；可选 `/projects/:id` 详情。 |
| `/works` | 作品展示：图 + 标题 + 说明，网格或列表，可点详情。 |
| `/about` | 关于页（可选）：简介、照片、联系方式。 |

- 路由采用 **React Router**；部署到 GitHub Pages 时使用 `HashRouter` 或配置 `base` + 404 回退 `index.html`（根据仓库名配置 `base: '/blog/'` 等）。

---

## 3. 内容与数据

- **博客**：每篇文章为仓库内 **Markdown 文件**，带 **frontmatter**（title、date、summary、tags 等）；构建时用 `vite-plugin-md` 或 `gray-matter` 等解析，生成列表数据与文章正文。
- **项目**：可用 Markdown（frontmatter + 正文）或 **JSON** 描述；构建时解析为列表/详情数据。
- **作品**：同上，图片路径相对仓库或 CDN；构建时汇总为数据供组件使用。
- 内容目录建议：如 `content/posts/`、`content/projects/`、`content/works/`，便于扩展标签与分类。

---

## 4. 视觉与版式（杂志/编辑感 + frontend-design）

- **字体**：标题使用有编辑感的衬线或强对比无衬线；正文使用易读字体，与标题形成对比；避免通用 AI 感字体（如 Inter、Roboto）。
- **版式**：大标题、清晰层级、充足留白；列表/卡片对齐与网格统一。
- **色彩**：主色 + 强调色（如深色正文 + 一种强调色用于链接/按钮/标签）；背景以白或浅灰为主，保证可读性。
- **动效**：页面切换与列表出现使用轻量过渡（fade/slide）；链接与卡片 hover 有明确反馈；不喧宾夺主，服务于编辑感。

---

## 5. 技术实现要点

- **栈**：React、Vite、React Router；构建输出到 `dist`。
- **路由**：开发用 `BrowserRouter`；生产部署 GitHub Pages 时用 `HashRouter` 或 `base` + 静态 404 处理。
- **内容管线**：构建时解析 Markdown/JSON，生成静态数据或注入到页面；无运行时 CMS。
- **部署**：GitHub Actions 在 push 到 `main` 时执行 `npm ci && npm run build`，将 `dist` 推送到 `gh-pages` 分支或配置的 Pages 源；仓库 Settings → Pages 选择对应分支/目录。

---

## 6. 模块与职责划分

- **路由与页面**：按路由划分页面组件（Home、Blog、BlogPost、Projects、Works、About），职责单一。
- **内容层**：解析 Markdown/JSON 的脚本或 Vite 插件，与 React 通过数据接口交互，不耦合 UI。
- **UI 组件**：布局（Header、Footer）、卡片、列表、文章正文展示等可复用组件，与数据通过 props 通信。
- **样式**：全局与组件级样式分离；使用 CSS 变量保持色彩与间距一致，便于后续按 frontend-design 调整。

---

## 7. 错误处理与边界

- 未知路由：展示 404 页，风格与全站一致。
- 缺失文章/项目/作品 slug：列表不展示或详情页 404。
- 构建阶段：Markdown 解析失败或 frontmatter 缺失时，构建报错并给出文件/字段提示，便于修正内容。

---

## 8. 图标与 LOGO 替换说明

以下图标与 LOGO 在实现时需统一放置、命名，便于后续替换。**替换方式需在代码与操作手册中写清，此处为设计约定。**

| 资源 | 用途 | 建议路径 | 建议规格与格式 | 替换方式 |
|------|------|----------|----------------|----------|
| **站点 LOGO** | 站点头部、首页品牌区 | `public/logo.svg` 或 `public/logo.png` | SVG 优先（可缩放）；PNG 建议 2x（如 128×128） | 覆盖同路径文件，保持文件名不变；若更名需同步改引用该路径的组件与配置。 |
| **Favicon** | 浏览器标签页图标 | `public/favicon.ico` 或 `public/favicon.svg` | ico 多尺寸（16/32/48）或单 SVG | 覆盖 `public/favicon.*`；若使用多种尺寸（如 apple-touch-icon），在 `index.html` 的 `<link>` 中注明路径，替换时一并更新。 |
| **Apple Touch Icon** | 添加到主屏/分享缩略图 | `public/apple-touch-icon.png` | 180×180 px | 覆盖同路径文件；在 `index.html` 中保留 `<link rel="apple-touch-icon" href="...">`。 |
| **关于页头像/品牌图** | 关于页个人照片或品牌图 | `public/avatar.jpg` 或 `content/about/avatar.jpg` | 按设计（如 1:1，建议 400×400 以上） | 覆盖约定路径；若路径变更需更新关于页组件中的引用与 doc 操作手册。 |
| **社交/功能图标** | 导航、Footer、链接（如 GitHub、邮箱） | `public/icons/` 下按用途命名（如 `icon-github.svg`）或使用图标库 | SVG，单色或双色以适配主题 | 替换 `public/icons/` 内对应文件；若改用图标库，在操作手册中说明库名与图标名/用法。 |

**约定与文档要求：**

- **路径与命名**：实现时所有图标/LOGO 的引用路径必须在代码中集中配置或注释说明（如常量、环境变量或 README），避免散落在多处。
- **操作手册**：在 `doc/` 下维护《静态资源与品牌替换说明》或于《操作手册》中设「图标与 LOGO 替换」小节，记录：① 每个资源的文件路径；② 推荐尺寸与格式；③ 替换步骤（覆盖文件 / 改配置 / 重新构建）；④ 若使用构建时拷贝或哈希文件名，说明生成规则与替换方式。
- **实现检查**：新增或修改任何图标/LOGO 引用时，同步更新上述文档与设计说明。

---

## 9. 后续可扩展

- 博客标签/分类筛选。
- 项目/作品详情页（若首版仅列表）。
- RSS 或 sitemap 生成。
- 多语言（若需要）。

---

**设计确认**：已与用户确认采用方案 1（Vite + React Router + Markdown 内容）及上述信息架构与杂志/编辑感 + frontend-design 界面方向。

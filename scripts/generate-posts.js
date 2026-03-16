/**
 * 构建前脚本：扫描 src/content/posts/*.md，用 gray-matter 解析，输出 src/data/posts.json
 * 供 content.js 使用（避免 Vite glob 路径解析差异）
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const cwd = path.join(__dirname, '..')
const postsDir = path.join(cwd, 'src', 'content', 'posts')
const outPath = path.join(cwd, 'src', 'data', 'posts.json')

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(path.join(cwd, 'src', 'data'), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify({ posts: [] }, null, 2))
  process.exit(0)
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
const posts = files.map((file) => {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const { data, content } = matter(raw)
  const slug = file.replace(/\.md$/, '')
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    body: content
  }
})
posts.sort((a, b) => new Date(b.date) - new Date(a.date))

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify({ posts }, null, 2))

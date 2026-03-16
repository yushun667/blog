/**
 * 内容层：博客列表与单篇由 scripts/generate-posts.js 生成的 posts.json 提供；
 * 项目/作品由 content 下 JSON 或 Markdown 提供（Chunk 3 实现）。
 */
import postsData from '../data/posts.json'

const posts = postsData.posts || []

export function getPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}

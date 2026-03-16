/**
 * 内容层：博客由 posts.json，项目/作品由 JSON 提供。
 */
import postsData from '../data/posts.json'
import projectsData from '../data/projects.json'
import worksData from '../data/works.json'

const posts = postsData.posts || []
const projects = Array.isArray(projectsData) ? projectsData : []
const works = Array.isArray(worksData) ? worksData : []

export function getPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}

export function getProjects() {
  return projects
}

export function getWorks() {
  return works
}

import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../lib/content'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  if (!post) {
    return (
      <div>
        <p>文章不存在</p>
        <Link to="/blog">返回列表</Link>
      </div>
    )
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date.slice(0, 10)}</p>
      <ReactMarkdown>{post.body}</ReactMarkdown>
      <Link to="/blog">返回列表</Link>
    </article>
  )
}

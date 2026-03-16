import { Link } from 'react-router-dom'
import { getPosts } from '../lib/content'

export default function Blog() {
  const posts = getPosts()
  return (
    <div>
      <h1>博客</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
            <span> — {p.date.slice(0, 10)}</span>
            {p.summary && <p>{p.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

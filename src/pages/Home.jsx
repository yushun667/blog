import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>个人网站</h1>
      <p>博客、项目与作品展示。</p>
      <ul>
        <li><Link to="/blog">博客</Link></li>
        <li><Link to="/projects">项目</Link></li>
        <li><Link to="/works">作品</Link></li>
      </ul>
    </div>
  )
}

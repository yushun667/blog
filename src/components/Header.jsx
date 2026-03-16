import { Link } from 'react-router-dom'
import { siteName, logoPath } from '../config/site'

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logoPath} alt="" width="32" height="32" />
        {siteName}
      </Link>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/blog">博客</Link>
        <Link to="/projects">项目</Link>
        <Link to="/works">作品</Link>
        <Link to="/about">关于</Link>
      </nav>
    </header>
  )
}

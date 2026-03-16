/**
 * 通用卡片：博客摘要、项目、作品项等复用。
 */
export default function Card({ title, children, to, ...rest }) {
  const content = (
    <div className="card" {...rest}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  )
  if (to) {
    return <a href={to} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>{content}</a>
  }
  return content
}

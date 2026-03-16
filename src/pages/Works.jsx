import { getWorks } from '../lib/content'

export default function Works() {
  const works = getWorks()
  return (
    <div>
      <h1>作品</h1>
      <ul>
        {works.map((w) => (
          <li key={w.id}>
            <h2>{w.title}</h2>
            {w.image && <img src={w.image} alt={w.title} width="200" />}
            <p>{w.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

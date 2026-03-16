import { getProjects } from '../lib/content'

export default function Projects() {
  const projects = getProjects()
  return (
    <div>
      <h1>项目</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
            {p.tech?.length > 0 && <span>{p.tech.join(' · ')}</span>}
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer">
                链接
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

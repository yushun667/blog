import { avatarPath } from '../config/site'

export default function About() {
  return (
    <div>
      <h1>关于</h1>
      <img src={avatarPath} alt="头像" width="120" height="120" />
      <p>个人简介与联系方式可在此编辑。</p>
    </div>
  )
}

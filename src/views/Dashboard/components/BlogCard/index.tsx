import { Card, Tag } from 'antd'
import { FC } from 'react'
import { IBlog } from '../../../../api/blog'
import { formatDate } from '../../../../utils'
import './index.scss'

interface IProps {
  blog: IBlog
}
const colorList = ['#2F90B9', '#61649F', '#5E5314', '#144A74', '#248067']
const BlogCard: FC<IProps> = (props: IProps) => {
  const { title, blogTags, description, lastUpdateTime } = props.blog
  return (
    <Card className="blog-card">
      <div className="title-time">
        <h3>{title}</h3>
        {lastUpdateTime && <h4>{formatDate(lastUpdateTime)}</h4>}
      </div>
      <p>{description}</p>
      {blogTags.map((tag, i) => (
        <Tag
          key={i}
          className="blog-tag"
          color={colorList[i % colorList.length]}
        >
          {tag.tagName}
        </Tag>
      ))}
    </Card>
  )
}

export default BlogCard

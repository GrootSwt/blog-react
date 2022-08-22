import { Card, Tag } from "antd";
import { FC } from "react";
import { formatDate } from "../../utils";
import './index.scss'

interface IProps {
  title: string
  tags: Array<string>
  description?: string
  time: number
}
const colorList = [
  '#2F90B9',
  '#61649F',
  '#5E5314',
  '#144A74',
  '#248067'
]
const BlogCard: FC<IProps> = (props: IProps) => {
  const { title, tags, description, time } = props
  return (
    <Card className="blog-card">
      <div className="title-time">
        <h3>{title}</h3>
        <h4>{formatDate(time)}</h4>
      </div>
      <p>{description}</p>
      {
        tags.map((tag, i) => (
          <Tag className="blog-tag" color={colorList[i % (colorList.length)]}>{tag}</Tag>
        ))
      }
    </Card>
  )
}

export default BlogCard
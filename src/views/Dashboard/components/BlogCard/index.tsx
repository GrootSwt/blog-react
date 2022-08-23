import { Card, Tag } from 'antd'
import { FC } from 'react'
import { IBlog } from '../../../../api/blog'
import { formatDate } from '../../../../utils'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)
interface IProps {
  blog: IBlog
}
const colorList = ['#2F90B9', '#61649F', '#5E5314', '#144A74', '#248067']
const BlogCard: FC<IProps> = (props: IProps) => {
  const { id, title, blogTags, description, lastUpdateTime } = props.blog
  const navigate = useNavigate()

  const showBlogDetail = async () => {
    if (id) {
      navigate(`/blog/${id}`)
    }
  }

  return (
    <Card className={cx('blog-card')} onClick={showBlogDetail}>
      <div className={cx('title-time')}>
        <h3>{title}</h3>
        {lastUpdateTime && <h4>{formatDate(lastUpdateTime)}</h4>}
      </div>
      <p>{description}</p>
      {blogTags.map((tag, i) => (
        <Tag
          key={i}
          className={cx('blog-tag')}
          color={colorList[i % colorList.length]}
        >
          {tag.tagName}
        </Tag>
      ))}
    </Card>
  )
}

export default BlogCard

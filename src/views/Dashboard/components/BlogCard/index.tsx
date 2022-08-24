import { Card, Modal, notification, Tag } from 'antd'
import { FC } from 'react'
import { IBlog } from '../../../../api/blog'
import { formatDate } from '../../../../utils'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { colorList } from '../../../../api/tag'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../store/hooks'
import { deleteBlog } from '../../../../feature/blogSlice'
const cx = classNames.bind(styles)
interface IProps {
  blog: IBlog
}
const BlogCard: FC<IProps> = (props: IProps) => {
  const { id, title, blogTags, description, lastUpdateTime } = props.blog
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const showBlogDetail = async () => {
    if (id) {
      navigate(`/blog/${id}`)
    }
  }

  const deleteBlogById = () => {
    id &&
      modal.confirm({
        title: '提示',
        content: '是否删除该文章？',
        okText: '删除',
        cancelText: '取消',
        onOk: () => {
          dispatch(deleteBlog(id))
          notification.success({
            className: 'notification',
            duration: 3,
            placement: 'bottomLeft',
            message: '删除成功！',
          })
        },
      })
  }

  return (
    <Card className={cx('blog-card')}>
      <div className={cx('title-time')}>
        <h3 onClick={showBlogDetail}>{title}</h3>
        <span className={cx('time-delete')}>
          {lastUpdateTime && <h4>{formatDate(lastUpdateTime)}</h4>}
          <CloseCircleOutlined
            style={{ color: '#ff4d4f' }}
            onClick={deleteBlogById}
          />
        </span>
      </div>
      <p onClick={showBlogDetail}>{description}</p>
      {blogTags.map((tag, i) => (
        <Tag
          key={i}
          className={cx('blog-tag')}
          color={colorList[i % colorList.length]}
        >
          {tag.tagName}
        </Tag>
      ))}
      {contextHolder}
    </Card>
  )
}

export default BlogCard

import EasyMDE from 'easymde'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { useParams } from 'react-router-dom'
import { clearBlog, getBlogDetail } from '../../feature/blogSlice'
import { useLocation } from 'react-router-dom'
import { IBlog } from '../../api/blog'
import TextArea from 'antd/lib/input/TextArea'
import { Input } from 'antd'
const cx = classNames.bind(styles)

const Blog: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const params = useParams()
  const mdRef = useRef<EasyMDE>()
  const [blogDetail, setBlogDetail] = useState<IBlog>({
    title: '',
    description: '',
    blogTags: [],
    content: '',
  })
  useEffect(() => {
    dispatch(clearBlog())
    document.querySelector('.EasyMDEContainer')?.remove()
  }, [dispatch, location])
  useEffect(() => {
    const mdLoad = async () => {
      const mdEl = document.querySelector('#markdown')
      if (mdEl) {
        mdRef.current = new EasyMDE({
          element: mdEl as HTMLTextAreaElement,
        })
        if (params.id) {
          if (params.id !== 'create') {
            const action = await dispatch(getBlogDetail(params.id))
            if (getBlogDetail.fulfilled.match(action)) {
              if (action.payload.data) {
                setBlogDetail(action.payload.data)
                mdRef.current.value(action.payload.data.content)
              }
            }
          }
        }
      }
    }
    if (!mdRef.current) {
      mdLoad()
    }
  }, [dispatch, params.id])

  const descriptionOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value
    setBlogDetail({ ...blogDetail, description: value })
  }
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setBlogDetail({ ...blogDetail, title: value })
  }
  return (
    <div className={cx('blog-box')}>
      <textarea id="markdown"></textarea>
      <div className={cx('blog-title')}>
        <h3>标题：</h3>
        <Input
          value={blogDetail.title}
          onChange={titleOnChange}
          maxLength={50}
          placeholder={'请输入标题...'}
        ></Input>
      </div>
      <div className={cx('blog-description')}>
        <h3>描述：</h3>
        <TextArea
          rows={5}
          placeholder={'请输入描述信息...'}
          maxLength={200}
          value={blogDetail.description}
          onChange={descriptionOnChange}
        ></TextArea>
      </div>
    </div>
  )
}

export default Blog

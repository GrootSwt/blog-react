import EasyMDE from 'easymde'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import {
  clearBlog,
  getBlogDetail,
  saveBlogDetail,
  switchPreview,
} from '../../feature/blogSlice'
import { useLocation } from 'react-router-dom'
import { IBlog } from '../../api/blog'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Input, InputRef, message, notification, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getTagList } from '../../feature/tagSlice'
import { IBlogTag } from '../../api/blogTag'
import { colorList } from '../../api/tag'
const cx = classNames.bind(styles)

const Blog: FC = () => {
  const dispatch = useAppDispatch()
  const nagivate = useNavigate()

  const location = useLocation()
  const params = useParams()

  const blog = useAppSelector((store) => store.blog.blog)
  const tagList = useAppSelector((store) => store.tag.tagList)
  const isPreview = useAppSelector((store) => store.blog.isPreview)

  const mdRef = useRef<EasyMDE>()
  const inputRef = useRef<InputRef>(null)

  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>()
  const [blogDetail, setBlogDetail] = useState<IBlog>({
    title: '',
    description: '',
    blogTags: [],
    content: '',
  })

  useEffect(() => {
    setBlogDetail(blog)
  }, [blog])

  useEffect(() => {
    if (mdRef.current) {
      if (isPreview) {
        if (!mdRef.current.isPreviewActive()) {
          EasyMDE.togglePreview(mdRef.current)
        }
      } else {
        if (mdRef.current.isPreviewActive()) {
          EasyMDE.togglePreview(mdRef.current)
        }
      }
    }
  }, [isPreview])

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
          toolbar: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'heading',
            'quote',
            '|',
            'code',
            'link'
          ]
        })
        dispatch(getTagList())
        if (params.id) {
          if (params.id !== 'create') {
            const action = await dispatch(getBlogDetail(params.id))
            if (getBlogDetail.fulfilled.match(action)) {
              if (action.payload.data) {
                setBlogDetail(action.payload.data)
                mdRef.current.value(action.payload.data.content)
                EasyMDE.togglePreview(mdRef.current)
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
  const showInput = () => {
    setInputVisible(true)
  }
  useEffect(() => {
    inputVisible && inputRef.current?.focus()
  })
  const removeTag = (tag: IBlogTag) => {
    const blog = JSON.parse(JSON.stringify(blogDetail)) as IBlog
    blog.blogTags = blog.blogTags.filter((a) => a.tagName !== tag.tagName)
    setBlogDetail(blog)
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setInputValue(value)
  }
  const handleInputConfirm = () => {
    if (inputValue) {
      const res = blogDetail.blogTags.find((a) => a.tagName === inputValue)
      if (res) {
        message.error('该标签已存在！')
      }
      const res2 = tagList?.find((a) => a.name === inputValue)
      const blogTag: IBlogTag = {
        tagName: inputValue,
      }
      if (res2) {
        blogTag.tagId = res2.id
      }
      blogTag.blogId = blogDetail.id
      const blog = JSON.parse(JSON.stringify(blogDetail)) as IBlog
      blog.blogTags.push(blogTag)
      setBlogDetail(blog)
    }
    setInputValue('')
    setInputVisible(false)
  }
  const save = () => {
    if (mdRef.current) {
      const blog = JSON.parse(JSON.stringify(blogDetail)) as IBlog
      blog.content = mdRef.current.value()
      dispatch(saveBlogDetail(blog))
      notification.success({
        className: "notification",
        duration: 3,
        placement: 'bottomLeft',
        message: '保存成功！',
      })
    }
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
          readOnly={isPreview}
          placeholder={'请输入标题...'}
        ></Input>
      </div>
      <div className={cx('blog-description')}>
        <h3>描述：</h3>
        <TextArea
          rows={5}
          placeholder={'请输入描述信息...'}
          maxLength={200}
          readOnly={isPreview}
          value={blogDetail.description}
          onChange={descriptionOnChange}
        ></TextArea>
      </div>
      <div className={cx('blog-tag')}>
        <h3>标签：</h3>
        <div className={cx('blog-tag-box')}>
          {blogDetail.blogTags.map((tag, i) => (
            <Tag
              key={i}
              className={cx('blog-tag-item')}
              color={colorList[i % colorList.length]}
              closable={!isPreview}
              onClose={() => removeTag(tag)}
            >
              {tag.tagName}
            </Tag>
          ))}
          {!isPreview && inputVisible && (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              className="tag-input"
              maxLength={20}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!isPreview && !inputVisible && (
            <Tag className="site-tag-plus" onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </div>
      </div>
      {!isPreview && (
        <div className={cx('blog-operation')}>
          <Button onClick={save}>保存</Button>
          <Button
            onClick={() => {
              dispatch(switchPreview(true))
              nagivate('/')
            }}
          >
            返回
          </Button>
        </div>
      )}
    </div>
  )
}

export default Blog

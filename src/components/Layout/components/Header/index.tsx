import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Input } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { IPageableSearchBlogRequestParams } from '../../../../api/blog'
import avatar from '../../../../assets/images/avatar.jpeg'
import { pageableSearch } from '../../../../feature/blogSlice'
import { useAppDispatch } from '../../../../store/hooks'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const cx = classNames.bind(styles)

const startSuffixList: Array<string> = [
  'tag:',
  '标签：',
  'title:',
  '标题：',
  'description:',
  '描述：',
]

const CustomHeader: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParam, setSearchParam] = useState<string>()

  const searchOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchParam) {
        for (const startSuffix of startSuffixList) {
          if (searchParam.startsWith(startSuffix)) {
            const params: IPageableSearchBlogRequestParams = {
              p_page: 1,
              p_size: 20,
            }
            const param = searchParam.substring(startSuffix.length).trim()
            switch (startSuffix) {
              case startSuffixList[0]:
                params.s_tag = param
                break
              case startSuffixList[1]:
                params.s_tag = param
                break
              case startSuffixList[2]:
                params.s_title = param
                break
              case startSuffixList[3]:
                params.s_title = param
                break
              case startSuffixList[4]:
                params.s_description = param
                break
              case startSuffixList[5]:
                params.s_description = param
                break
              default:
                break
            }
            if (params.s_tag || params.s_title || params.s_description) {
              return dispatch(pageableSearch(params))
            }
          }
        }
        const param = searchParam.trim()
        if (param) {
          dispatch(pageableSearch({ p_page: 1, p_size: 20, s_param: param }))
        }
      } else {
        dispatch(pageableSearch({ p_page: 1, p_size: 20 }))
      }
    }
  }

  const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.currentTarget.value)
  }

  const toDashboard = () => {
    navigate('/')
  }

  const toCreateBlog = () => {
    navigate('/blog/create')
  }

  return (
    <Header>
      <Avatar
        src={avatar}
        size="large"
        className={cx('avatar')}
        onClick={toDashboard}
      ></Avatar>
      <Input
        placeholder="标题、描述、标签"
        size="large"
        className={cx('blog-search')}
        value={searchParam}
        onChange={searchOnChange}
        onKeyDown={searchOnKeyDown}
        suffix={<SearchOutlined className={cx('blog-search-suffix')} />}
      ></Input>
      {location.pathname === '/' && (
        <Button
          className={cx('create-blog-btn')}
          type="dashed"
          shape="circle"
          size="middle"
          onClick={toCreateBlog}
          icon={<PlusOutlined />}
        ></Button>
      )}
    </Header>
  )
}

export default CustomHeader

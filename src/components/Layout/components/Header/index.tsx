import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC } from 'react'
import avatar from '../../../../assets/images/avatar.jpeg'
import './index.scss'
const CustomHeader: FC = () => {
  return (
    <Header>
      <Avatar src={avatar} size="large" className="avatar"></Avatar>
      <Input
        placeholder="标题、描述、标签"
        size="large"
        className="blog-search"
        suffix={<SearchOutlined className="blog-search-suffix" />}
      ></Input>
    </Header>
  )
}

export default CustomHeader

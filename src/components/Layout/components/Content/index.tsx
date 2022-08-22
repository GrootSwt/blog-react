import { Content } from 'antd/lib/layout/layout'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
const CustomContent: FC = () => {
  return (
    <Content className="blog-content">
      <Outlet />
    </Content>
  )
}

export default CustomContent

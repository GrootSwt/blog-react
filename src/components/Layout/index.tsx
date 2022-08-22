import { FC } from 'react'
import { Layout } from 'antd'
import './index.scss'
import CustomHeader from './components/Header'
import CustomContent from './components/Content'
const GlobalLayout: FC = () => {
  return (
    <Layout className="blog-layout">
      <CustomHeader></CustomHeader>
      <CustomContent></CustomContent>
    </Layout>
  )
}

export default GlobalLayout

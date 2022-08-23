import { FC } from 'react'
import { Layout } from 'antd'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import CustomHeader from './components/Header'
import CustomContent from './components/Content'
const cx = classNames.bind(styles)

const GlobalLayout: FC = () => {
  return (
    <Layout className={cx('blog-layout')}>
      <CustomHeader></CustomHeader>
      <CustomContent></CustomContent>
    </Layout>
  )
}

export default GlobalLayout

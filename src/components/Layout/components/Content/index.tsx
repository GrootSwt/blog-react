import { Content } from 'antd/lib/layout/layout'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const CustomContent: FC = () => {
  return (
    <Content className={cx('blog-content')}>
      <Outlet />
    </Content>
  )
}

export default CustomContent

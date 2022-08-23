import { Pagination, PaginationProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IPageableSearchBlogRequestParams } from '../../api/blog'
import BlogCard from './components/BlogCard'
import { pageableSearch } from '../../feature/blogSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const DashBoard: FC = () => {
  const dispatch = useAppDispatch()
  const blogList = useAppSelector((state) => state.blog.blogList)
  const pageable = useAppSelector((state) => state.blog.pageable)
  const [params, setParams] = useState<IPageableSearchBlogRequestParams>({
    p_page: 1,
    p_size: 20,
  })
  const pageOnChange: PaginationProps['onChange'] = (nextPage: number) => {
    setParams({ ...params, p_page: nextPage })
  }
  /**
   * 获取博客列表
   */
  useEffect(() => {
    dispatch(pageableSearch(params))
  }, [dispatch, params])
  return (
    <>
      <div className={cx('blog-list')}>
        {blogList &&
          blogList.map((blog, index) => <BlogCard key={index} blog={blog} />)}
      </div>
      {pageable && (
        <Pagination
          current={pageable.page}
          onChange={pageOnChange}
          total={pageable.total}
          className={cx('pagination')}
        />
      )}
    </>
  )
}

export default DashBoard

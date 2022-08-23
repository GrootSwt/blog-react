import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import GlobalLayout from '../components/Layout'
import Blog from '../views/Blog'
import DashBoard from '../views/Dashboard'

const Router: FC = () => {
  const router = useRoutes([
    {
      path: '/',
      element: <GlobalLayout></GlobalLayout>,
      children: [
        {
          index: true,
          element: <DashBoard></DashBoard>,
        },
        {
          path: 'blog/:id',
          element: <Blog></Blog>
        }
      ],
    },
  ])
  return router
}

export default Router

import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import GlobalLayout from '../components/Layout'
import Home from '../views/Home'

const Router: FC = () => {
  const router = useRoutes([
    {
      path: '/',
      element: <GlobalLayout></GlobalLayout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
      ],
    },
  ])
  return router
}

export default Router

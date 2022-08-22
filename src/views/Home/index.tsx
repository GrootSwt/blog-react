import { FC } from 'react'
import { useAppSelector } from '../../store/hooks'
import DashBoard from '../Dashboard'
import Markdown from '../Markdown'

const Home: FC = () => {
  const showDashboard = useAppSelector((store) => store.home.showDashboard)
  if (showDashboard) {
    return <DashBoard></DashBoard>
  } else {
    return <Markdown></Markdown>
  }
}

export default Home

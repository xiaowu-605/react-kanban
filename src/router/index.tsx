import { createBrowserRouter } from 'react-router-dom'
import { BoardPage } from '@/pages/board'
import { Home } from '@/pages/home'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/board',
    element: <BoardPage />,
  },
]

export const router = createBrowserRouter(routes)

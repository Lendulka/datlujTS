import Stage from './components/Stage';
import MainLayout from './pages/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Training from './pages/Training/Training';
import Testing from './pages/Testing/Testing';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Result from './components/Result/Result';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'training',
        element: <Training />,
        children: [
          {
            path: 'stage',
            element: <Stage />,
          },
          {
            path: 'result',
            element: <Result />
          },
        ]
      },
      {
        path: 'testing',
        element: <Testing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
    ]
  }
])

const App: React.FC = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default App


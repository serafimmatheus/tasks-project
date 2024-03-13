import { PageNotFound } from '@/pages/404'
import { AppLayout } from '@/pages/_layouts/appLayout'
import { AuthLayout } from '@/pages/_layouts/authLayout'
import Dashboard from '@/pages/app/Dashboard/dashboard'
import { LoginPage } from '@/pages/auth/login/page'
import TasksCompleted from '@/pages/app/tasksCompleted/tasks-completed'
import { Error } from '@/pages/error'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './Routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,

    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/tasks-completed',
        element: (
          <PrivateRoute>
            <TasksCompleted />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
])

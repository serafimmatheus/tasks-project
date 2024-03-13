import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('@tasks:token')

  return token ? <>{children}</> : <Navigate to='/login' />
}

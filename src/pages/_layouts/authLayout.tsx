import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <Helmet title='Login' />
      <div className='flex min-h-screen flex-col'>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

import Header from '@/components/header'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <Helmet title='Dashboard' />

      <div className='flex min-h-screen flex-col'>
        <Header />

        <div className='flex flex-1 flex-col gap-4 p-4 pt-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export { AppLayout }

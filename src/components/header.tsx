import { LayoutList, Menu, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NavLink } from './nav-link'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ModalUserProfile } from './ModalUserProfile'
import { Dialog, DialogTrigger } from './ui/dialog'

function Header() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('@tasks:token')
    navigate('/login', { replace: true })
  }

  return (
    <div className='border-b'>
      <div className='p-4 flex justify-between max-w-5xl mx-auto w-full items-center'>
        <div className='flex gap-2'>
          <LayoutList />
          Tasks
        </div>

        <div className='sm:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='px-2' variant='link'>
                    Minha Conta
                  </Button>
                </DialogTrigger>

                <ModalUserProfile />
              </Dialog>

              <DropdownMenuSeparator />

              <NavLink to='/'>
                <DropdownMenuItem>Tasks</DropdownMenuItem>
              </NavLink>

              <NavLink to='/tasks-completed'>
                <DropdownMenuItem>Tasks concluidas</DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='hidden sm:flex gap-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='link'>Minha Conta</Button>
            </DialogTrigger>

            <ModalUserProfile />
          </Dialog>

          <NavLink to='/'>Tasks</NavLink>
          <NavLink to='/tasks-completed'>Tasks concluidas</NavLink>

          <Button
            variant='destructive'
            size='icon'
            className='px-2 w-auto gap-1'
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header

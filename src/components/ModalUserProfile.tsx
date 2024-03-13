import { Label } from './ui/label'
import { Input } from './ui/input'
import { useQuery } from '@tanstack/react-query'
import { meAccontProfile } from '@/api/me-acconts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

const schemaUpdateProfile = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email().optional(),
  role: z.string().optional(),
})

type UpdateProfileData = z.infer<typeof schemaUpdateProfile>

export function ModalUserProfile() {
  const { data: currentUser } = useQuery({
    queryKey: ['me-account'],
    queryFn: meAccontProfile,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(schemaUpdateProfile),
    values: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      role: currentUser?.role || '',
    },
  })

  async function handleUpdateProfile(data: UpdateProfileData) {
    console.log(data)
  }

  if (!currentUser) return null

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Editar perfil</DialogTitle>
        {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
      </DialogHeader>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className='flex flex-col gap-8'
      >
        <div className='flex flex-col gap-4'>
          <div className='space-y-1'>
            <Label>Nome</Label>
            <Input className='border-foreground' {...register('name')} />
          </div>

          <div className='space-y-1'>
            <Label>E-mail</Label>
            <Input disabled {...register('email')} />
          </div>

          <div className='space-y-1'>
            <Label>Status</Label>
            <Input
              disabled
              value={currentUser.role === 'admin' ? 'Administrador' : 'Usuário'}
              {...register('role')}
            />
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline' disabled={isSubmitting} type='button'>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} type='submit'>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

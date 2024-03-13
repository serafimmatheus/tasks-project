import { authenticateLogin } from '@/api/authenticateLogin'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>()

  const { mutateAsync: authLogin } = useMutation({
    mutationFn: authenticateLogin,
    onSuccess: () => {
      toast.success('Logado com sucesso!')
      navigate('/', { replace: true })
    },
    onError: () => {
      toast.error('Erro ao logar!')
    },
  })

  async function handleLogin(data: LoginData) {
    await authLogin(data)
  }

  return (
    <div className='max-w-5xl mx-auto w-full flex flex-col gap-5 mt-10'>
      <Card className='md:max-w-md w-full mx-auto'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Faça login para acessar o sistema</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className='flex flex-col gap-2'
          >
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input type='email' id='email' {...register('email')} />
            </div>

            <div>
              <Label htmlFor='password'>Senha</Label>
              <Input type='password' id='password' {...register('password')} />
            </div>

            <CardFooter className='p-0'>
              <Button disabled={isSubmitting} className='mt-3' type='submit'>
                Entrar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

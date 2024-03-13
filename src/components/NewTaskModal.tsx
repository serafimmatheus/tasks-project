import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createdTasks } from '@/api/createdTasks'
import { toast } from 'sonner'
import { fetchTasks } from '@/api/fetchTasks'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

const createTaskSckema = z.object({
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  description: z.string().min(3, 'A descrição deve ter no mínimo 3 caracteres'),
})

type CreateTaskData = z.infer<typeof createTaskSckema>

function NewTaskModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateTaskData>({
    resolver: zodResolver(createTaskSckema),
  })

  const { refetch } = useQuery({
    queryKey: ['tasks-completed'],
    queryFn: fetchTasks,
  })

  const { mutateAsync: createdTasksFn } = useMutation({
    mutationFn: createdTasks,
    onMutate: () => {
      refetch()
    },
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!')
      reset()
    },
    onError: () => {
      toast.error('Erro ao criar tarefa!')
    },

    mutationKey: ['tasks-completed'],
    // onSettled: () => {
    //   refetch()
    // }
  })

  async function handleCreateTask(data: CreateTaskData) {
    await createdTasksFn(data)
  }

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Crie um tarefa nova.</DialogTitle>
        <DialogDescription>
          Crie uma nova tarefa para começar a trabalhar
        </DialogDescription>

        <form
          onSubmit={handleSubmit(handleCreateTask)}
          className='flex flex-col gap-5'
        >
          <div className='flex flex-col items-start gap-1'>
            <Label>Nome</Label>
            <Input {...register('title')} />
          </div>
          {errors.title && (
            <span className='text-red-500'>{errors.title.message}</span>
          )}

          <div className='flex flex-col items-start gap-1'>
            <Label>Descrição</Label>
            <Textarea {...register('description')} className='resize-none' />
          </div>

          {errors.description && (
            <span className='text-red-500'>{errors.description.message}</span>
          )}

          <DialogFooter>
            <DialogClose>
              <Button
                disabled={isSubmitting}
                type='button'
                variant='destructive'
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button disabled={isSubmitting} type='submit' variant='default'>
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  )
}

export default NewTaskModal

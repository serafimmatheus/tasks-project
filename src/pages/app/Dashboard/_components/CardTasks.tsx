import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CheckSquare, Trash2 } from 'lucide-react'

import { TaskData, fetchTasks } from '@/api/fetchTasks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { updatedCompletedTasks } from '@/api/updatedCompletedTask'

import { toast } from 'sonner'
import { fetchTasksCompleted } from '@/api/fetchTasksCompleted'
import { deleteTasks } from '@/api/deleteTasks'

interface CardTasksProps {
  tasks: TaskData
}

function CardTasks({ tasks }: CardTasksProps) {
  const { refetch: refetchTasks } = useQuery({
    queryKey: ['tasks-completed'],
    queryFn: fetchTasks,
  })

  const { refetch: refetchTasksCompleted } = useQuery({
    queryKey: ['tasks-completed'],
    queryFn: fetchTasksCompleted,
  })

  const {
    mutateAsync: updatedCompletedTasksFn,
    isPending: isLoadingUpdatedTask,
  } = useMutation({
    mutationFn: updatedCompletedTasks,
    onMutate: () => {
      refetchTasks()
      refetchTasksCompleted()
    },
    onSuccess: () => {
      toast.success('Tarefa completada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao completar tarefa!')
    },
    mutationKey: ['tasks-completed'],
  })

  const { mutateAsync: deletedTaskFn } = useMutation({
    mutationFn: deleteTasks,
    onMutate: () => {
      refetchTasks()
      refetchTasksCompleted()
    },
    onSuccess: () => {
      toast.success('Tarefa deletada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao deletar tarefa!')
    },
    mutationKey: ['tasks-completed'],
  })

  async function handleCompletedTask() {
    await updatedCompletedTasksFn(tasks.id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{tasks.title}</CardTitle>
      </CardHeader>
      <CardContent className='h-24 overflow-y-auto'>
        <p className='text-sm'>{tasks.description}</p>
      </CardContent>
      <CardFooter className='flex gap-2 pt-2 justify-between'>
        <div>
          {new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }).format(new Date(tasks.createdAt))}
        </div>
        <div className='flex gap-2'>
          <Button
            disabled={isLoadingUpdatedTask}
            onClick={handleCompletedTask}
            variant='outline'
            size='icon'
          >
            <CheckSquare />
          </Button>

          <Button
            disabled={isLoadingUpdatedTask}
            size='icon'
            variant='destructive'
            onClick={() => deletedTaskFn(tasks.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardTasks

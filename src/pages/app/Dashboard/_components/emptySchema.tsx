import { Button } from '@/components/ui/button'

import NewTaskModal from '@/components/NewTaskModal'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export function EmptySchema() {
  return (
    <div className='flex justify-center items-center h-full border p-2'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-2'>Sem tarefas</h1>
        <p className='text-gray-500'>
          Crie uma nova tarefa para começar a trabalhar
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='mt-4'>Criar tarefa</Button>
          </DialogTrigger>

          <NewTaskModal />
        </Dialog>
      </div>
    </div>
  )
}

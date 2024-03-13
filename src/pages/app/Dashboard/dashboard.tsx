import PaginationComponent from '@/components/Pagination'
import CardTasks from './_components/CardTasks'
import SearchTasks from './_components/SearchTasks'
import { EmptySchema } from './_components/emptySchema'
import { useQuery } from '@tanstack/react-query'
import CardSkeleton from './_components/CardSkeleton'
import { fetchTasks } from '@/api/fetchTasks'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import NewTaskModal from '@/components/NewTaskModal'
// import { useSearchParams } from 'react-router-dom'
import { meAccontProfile } from '@/api/me-acconts'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useSearchParams } from 'react-router-dom'

function Dashboard() {
  const { data: fetchTasksData } = useQuery({
    queryKey: ['tasks-completed'],
    queryFn: fetchTasks,
  })

  const { data: fetchMeAccontData } = useQuery({
    queryKey: ['me-account'],
    queryFn: meAccontProfile,
  })

  const [searchQueryParams] = useSearchParams()

  const searchTask = searchQueryParams.get('searchTask')

  const newFetchTasksData = fetchTasksData?.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask?.toLowerCase() || '')
  )

  // const [paramsModal, setParamsModal] = useSearchParams()

  // const openModal = paramsModal.get('modal')

  // function handleOpenModal(value: boolean) {
  //   if (!openModal) {
  //     setParamsModal({ modal: 'false' })
  //   }

  //   setParamsModal({ modal: `${value}` })
  // }

  if (!fetchTasksData) return null

  if (!fetchMeAccontData) return <Skeleton className='w-1/2 h-6' />

  return (
    <div className='max-w-5xl lg:px-4 mx-auto w-full flex flex-col gap-5 relative'>
      <h1 className='text-xl font-bold'>
        Olá,{' '}
        {fetchMeAccontData.name ? (
          fetchMeAccontData?.name?.split(' ')[0]
        ) : (
          <Skeleton className='w-1/2 h-6' />
        )}
        <br />
        <span className='text-muted-foreground text-base font-light'>
          Essas são suas tarefas.
        </span>
      </h1>
      {fetchTasksData?.tasks.length === 0 && <EmptySchema />}

      {fetchTasksData?.tasks.length > 0 && <SearchTasks />}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center'>
        {newFetchTasksData
          ? newFetchTasksData.map((task) => (
              <CardTasks key={task.id} tasks={task} />
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
      </div>

      {fetchTasksData?.tasks.length > 10 && (
        <div>
          <PaginationComponent />
        </div>
      )}

      <div className='fixed right-3 bottom-3 md:right-8 md:bottom-8 xl:right-16 xl:bottom-16'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='icon' className='rounded-full w-16 h-16'>
              <Plus />
            </Button>
          </DialogTrigger>

          <NewTaskModal />
        </Dialog>
      </div>
    </div>
  )
}

export default Dashboard

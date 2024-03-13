import PaginationComponent from '@/components/Pagination'
import CardTasks from '../Dashboard/_components/CardTasks'
import SearchTasks from '../Dashboard/_components/SearchTasks'
import { EmptyTasksCompleted } from './_components/EmptyTasksCompleted'
import { useQuery } from '@tanstack/react-query'
import CardSkeleton from '../Dashboard/_components/CardSkeleton'
import { fetchTasksCompleted } from '@/api/fetchTasksCompleted'
import { useSearchParams } from 'react-router-dom'

function TasksCompleted() {
  const { data: fetchTasksData } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasksCompleted,
  })

  const [searchQueryParams] = useSearchParams()

  const searchTask = searchQueryParams.get('searchTask')

  const newFetchTasksData = fetchTasksData?.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask?.toLowerCase() || '')
  )

  if (!fetchTasksData) return null

  if (!newFetchTasksData) {
    return <CardSkeleton />
  }

  return (
    <div className='max-w-5xl mx-auto w-full flex flex-col gap-5'>
      <h1 className='text-xl font-bold'>Suas tasks completadas</h1>

      {fetchTasksData?.tasks.length === 0 && <EmptyTasksCompleted />}

      {fetchTasksData.tasks.length > 0 && <SearchTasks />}

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
    </div>
  )
}

export default TasksCompleted

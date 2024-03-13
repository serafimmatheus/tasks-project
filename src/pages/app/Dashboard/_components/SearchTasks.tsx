import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const schemaSearchQueryParams = z.object({
  searchTask: z.string().optional(),
})

type SearchQueryParams = z.infer<typeof schemaSearchQueryParams>

function SearchTasks() {
  const [searchQueryParams, setSearchQueryParams] = useSearchParams()

  const searchTask = searchQueryParams.get('task')

  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<SearchQueryParams>({
    resolver: zodResolver(schemaSearchQueryParams),
    defaultValues: {
      searchTask: searchTask || '',
    },
  })

  function handleSearchTask({ searchTask }: SearchQueryParams) {
    setSearchQueryParams((state) => {
      if (searchTask) {
        state.set('searchTask', searchTask)
      } else {
        state.delete('searchTask')
      }

      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSearchTask)}>
      <Label htmlFor='searchTask'>
        Pesquisar uma tarefa
        <div className='flex gap-2'>
          <Input
            type='text'
            placeholder='Search tasks'
            id='searchTask'
            {...register('searchTask')}
            disabled={isLoading}
          />
          <Button
            disabled={isLoading}
            type='submit'
            size='icon'
            variant='secondary'
          >
            <SearchIcon size={20} />
          </Button>
        </div>
      </Label>
    </form>
  )
}

export default SearchTasks

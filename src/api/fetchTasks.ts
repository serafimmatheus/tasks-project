import { api } from '@/lib/axios'

export interface TaskData {
  authorId: string
  createdAt: string
  description: string
  completed: boolean
  id: string
  slug: string
  title: string
  updatedAt: string
}

interface FetchTasksResponse {
  page: number
  perPage: number
  tasks: TaskData[]
}

export async function fetchTasks() {
  const token = localStorage.getItem('@tasks:token')
  const response = await api.get<FetchTasksResponse>('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const tasks = response.data.tasks.filter((task) => task.completed === false)

  return {
    page: response.data.page,
    perPage: response.data.perPage,
    tasks,
  }
}

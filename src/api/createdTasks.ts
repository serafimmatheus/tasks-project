import { api } from '@/lib/axios'

interface CreatedTasksResponse {
  id: string
  title: string
  slug: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
  authorId: string
}

export async function createdTasks(data: Partial<CreatedTasksResponse>) {
  const token = localStorage.getItem('@tasks:token')
  const response = await api.post<CreatedTasksResponse>('/tasks', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

import { api } from '@/lib/axios'

interface MeAccontProfileResponse {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export async function meAccontProfile() {
  const token = localStorage.getItem('@tasks:token')
  const response = await api.get<MeAccontProfileResponse>('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

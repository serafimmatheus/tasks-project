import { api } from '@/lib/axios'
import { setLocalStorage } from '@/lib/localStorage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function authenticateLogin(payload: any) {
  console.log(payload)
  const response = await api.post('/sessions', payload)
  setLocalStorage('@tasks:token', response.data.access_token)

  return response.data
}

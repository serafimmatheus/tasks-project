// import { api } from '@/lib/axios'

export async function updatedCompletedTasks(id: string) {
  const token = localStorage.getItem('@tasks:token')

  // const response = await api.put(`/tasks/${id}/completed`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })

  // return {
  //   message: response.data,
  // }

  fetch(`http://localhost:5555/api/tasks/${id}/completed`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)

      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

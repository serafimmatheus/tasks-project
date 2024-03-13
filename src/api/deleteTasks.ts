export async function deleteTasks(id: string) {
  const token = localStorage.getItem('@tasks:token')

  fetch(`http://localhost:5555/api/tasks/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

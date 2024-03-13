export function EmptyTasksCompleted() {
  return (
    <div className='flex justify-center items-center h-full border p-2'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-2'>Sem tarefas</h1>
        <p className='text-gray-500'>Voce nao tem tarefas completadas</p>
      </div>
    </div>
  )
}

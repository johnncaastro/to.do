import { FormEvent, useContext, useState } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import { Header } from '../components/Header';
import { EditTaskModal } from '../components/EditTaskModal';

import { NotePencil, PencilSimpleLine, Trash } from 'phosphor-react';

export function Home() {
  const { 
    tasks,
    createTask,
    removeTask,
    toggleTaskCompleted } = useContext(TasksContext);

  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameTaskEditted, setNameTaskEditted] = useState('');
  const [idTaskEditted, setIdTaskEditted] = useState(0);

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    createTask(newTask);

    setNewTask('');
  }

  function handleOpenModal(id: number, name: string) {
    setNameTaskEditted(name);
    setIdTaskEditted(id);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className='w-full h-full'>
      <Header />

      <main className='desktop:max-w-[768px] laptop:max-w-[568px] mobile:max-w-[400px] bg-white-300 mx-auto py-12 px-8 rounded-lg mt-[-95px]'>
        <header className='flex mobile:flex-col mobile:gap-4 laptop:flex-row laptop:gap-0 items-center justify-between mb-12'>
          <h2 className='text-2xl font-bold text-gray-700'>
            Minhas tasks
          </h2>

          <form onSubmit={handleCreateTask} className='flex items-center gap-1'>
            <input
              type="text"
              value={newTask}
              placeholder='Adicionar nova task'
              onChange={event => setNewTask(event.target.value)}
              className='w-[250px] rounded h-8 px-5 bg-gray-300'
            />

            <button type="submit" className='bg-green-500 p-[0.4rem] rounded hover:bg-green-700 transition-colors'>
              <NotePencil size={18} color="#fff" weight="thin" />
            </button>
          </form>
        </header>
        {tasks.map(task => {
          return (
            <div key={task.id} className='flex items-center justify-between p-2 rounded-sm mt-1 bg-gray-100'>
              <div className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  id={task.name}
                  className="cursor-pointer"
                  onChange={() => toggleTaskCompleted(task.id)}
                />
                <label htmlFor={task.name} className={task.isComplete ? 'text-base line-through opacity-70 cursor-pointer' : 'text-base cursor-pointer'}>
                  {task.name}
                </label>
              </div>
              <div className='flex items-center gap-3'>
                <button type='button' onClick={() => handleOpenModal(task.id, task.name)} className='hover:border-b-2'>
                  <PencilSimpleLine size={18} color="#184a8b" weight="thin" />
                </button>
                <button type='button' onClick={() => removeTask(task.id)} className='hover:border-b-2'>
                  <Trash size={18} color="#830101" weight="thin" />
                </button>
              </div>
            </div>
          )
        })}
      </main>

      <EditTaskModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        nameTaskEditted={nameTaskEditted}
        setNameTaskEditted={setNameTaskEditted}
        idTaskEditted={idTaskEditted}
      />
    </div>
  )
}
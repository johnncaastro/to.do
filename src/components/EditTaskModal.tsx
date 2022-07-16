import { Dispatch, FormEvent, SetStateAction, useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import Modal from 'react-modal';

import { X } from 'phosphor-react';

interface EditalTaskModalProps {
  isOpen: boolean;
  onRequestClose(): void;
  nameTaskEditted: string;
  setNameTaskEditted: Dispatch<SetStateAction<string>>;
  idTaskEditted: number;
}

export function EditTaskModal({ 
  isOpen,
  onRequestClose,
  nameTaskEditted,
  setNameTaskEditted, idTaskEditted }: EditalTaskModalProps) {

  const { editTask } = useContext(TasksContext);

  function handleEditTask(event: FormEvent) {
    event.preventDefault();

    editTask(nameTaskEditted, idTaskEditted);
    setNameTaskEditted('');

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="bg-zinc-700 opacity-90 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      className="w-full max-w-xl bg-white-500 opacity-100 p-12 relative rounded"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="absolute top-3 right-4 hover:text-zinc-700 transition-colors"
      >
        <X size={24} weight="thin" />
      </button>

      <form>
        <h2 className='text-2xl mb-8'>
          Editar task
        </h2>

        <input
          type="text"
          value={nameTaskEditted}
          onChange={event => setNameTaskEditted(event.target.value)}
          className='w-full h-8 rounded px-2 border-2 border-gray-500'
        />

        <button
          type="submit"
          onClick={handleEditTask}
          className='mt-12 float-right bg-blue-700 text-white-300 py-2 px-6 rounded-3xl hover:bg-blue-500 transition-colors'
        >
          Editar
        </button>
      </form>
    </Modal>
  )
}
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useTasks } from '../hooks/useTasks'
import { NewTaskModal } from './newTaskModal'
import { FilterFormTask } from './filterFormTask'
import { Plus } from 'lucide-react'
import { FilterTaskFormButton } from './filterTaskFormButton'

export function TaskTools() {
  const { tasks } = useTasks()
  const [isOpenModal, setIsOpenModal] = useState(false)

  function closeModal() {
    setIsOpenModal(false)
  }

  return (
    <div className="flex items-center justify-between mobile:mb-12 laptop:mb-6">
      <div className="flex items-center gap-6">
        <div className="bg-blue-500 rounded-full px-3 py-1 text-sm">
          {`${tasks?.length ?? 0} 
            ${tasks !== undefined && tasks.length > 1 ? 'tasks' : 'task'}`}
        </div>
        <div className="mobile:block desktop:hidden">
          <FilterTaskFormButton />
        </div>
        <div className="mobile:hidden desktop:block">
          <FilterFormTask />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Dialog.Root
          open={isOpenModal}
          onOpenChange={() => setIsOpenModal((state) => !state)}
        >
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 text-sm bg-yellow-300 text-blue-700 p-2 rounded-md hover:bg-blue-300 hover:text-white transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Nova task
            </button>
          </Dialog.Trigger>
          <NewTaskModal onCloseModal={closeModal} />
        </Dialog.Root>
      </div>
    </div>
  )
}

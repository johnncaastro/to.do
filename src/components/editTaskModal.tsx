import { FormEvent } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useTasks } from "../hooks/useTasks"
import { Input } from "./input"
import { X } from "lucide-react"

interface NewTaskModalProps {
  taskId: string
  isOpenModal: boolean
  onCloseModal(): void
}

export function EditTaskModal({ isOpenModal, onCloseModal, taskId }: NewTaskModalProps) {
  const { editTask } = useTasks()

  async function handleEditTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    // if(taskItemsInputIsEmpty) {
    //   alert('O campo do item da task não pode estar em branco!')

    //   return
    // }

    // const items = taskItemsInput.map(item => (
    //   { name: item }
    // ))

    // await editTask({
    //   title,
    //   items
    // })

    onCloseModal()
  }

  return (
    <Dialog.Root open={isOpenModal} onOpenChange={onCloseModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-4 py-6 rounded-md w-full max-w-lg bg-blue-700 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl">Editar task</Dialog.Title>
            <Dialog.Close>
              <X
                className="w-6 h-6 hover:text-gray-400 transition-colors duration-200"
              />
            </Dialog.Close>
          </div>
          <form onSubmit={handleEditTask} className="flex flex-col">
            <Input label="Título" name="title" />

            <div className="space-y-4">
              
            </div>

            <button
              type="submit"
              className="flex items-center justify-center bg-yellow-300 text-blue-700 font-semibold p-2 mt-8 rounded-3xl hover:bg-blue-300 hover:text-white transition-colors duration-200"
            >
              Salvar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
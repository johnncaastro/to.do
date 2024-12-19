import { FormEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useTasks } from "../hooks/useTasks"
import { Input } from "./input"
import { X } from "lucide-react"

interface NewTaskModalProps {
  onCloseModal(): void
}

export function NewTaskModal({ onCloseModal }: NewTaskModalProps) {
  const { createNewTask } = useTasks()
  const [taskItemsInput, setTaskItemsInput] = useState([""])

  function handleNewTaskItemInput() {
    setTaskItemsInput((state) => [ ...state, "" ])
  }

  function setTaskItemInputValue(position: number, value: string) {
    const updatedTaskItems = taskItemsInput.map((taskItem, index) => {
      if (index === position) {
        return value
      }

      return taskItem
    })

    setTaskItemsInput(updatedTaskItems)
  }

  function resetFormTaskItemsInputs() {
    setTaskItemsInput([""])
  }

  async function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const title = String(formData.get('title'))

    if(!title || title.trim() === '') {
      alert('Crie um título para a task!');

      return;
    }

    const taskItemsInputIsEmpty = taskItemsInput.some(item => item.trim() === '')

    if(taskItemsInputIsEmpty) {
      alert('O campo do item da task não pode estar em branco!')

      return
    }

    const items = taskItemsInput.map(item => (
      { name: item }
    ))

    await createNewTask({
      title,
      items
    })

    resetFormTaskItemsInputs()
    onCloseModal()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-4 py-6 rounded-md w-full max-w-lg bg-blue-700 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-2xl">Nova task</Dialog.Title>
          <Dialog.Close>
            <X
              className="w-6 h-6 hover:text-gray-400 transition-colors duration-200"
            />
          </Dialog.Close>
        </div>
        <form onSubmit={handleCreateNewTask} className="flex flex-col">
          <Input label="Título" name="title" />

          <button
            type="button"
            onClick={handleNewTaskItemInput}
            className="flex items-center gap-2 self-end bg-yellow-300 text-blue-700 p-2 my-6 w-max h-full rounded-md hover:bg-blue-300 hover:text-white transition-colors duration-200"
          >
            + Novo item
          </button>

          <div className="space-y-4">
            {taskItemsInput.map((taskItem, index) => (
              <Input
                label={`Item ${index + 1}`}
                name={`item-${index + 1}`}
                key={index}
                value={taskItem}
                onChange={e => setTaskItemInputValue(index, e.target.value)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-300 text-blue-700 font-semibold p-2 mt-8 rounded-3xl hover:bg-blue-300 hover:text-white transition-colors duration-200"
          >
            Criar task
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
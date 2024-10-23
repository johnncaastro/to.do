import { FormEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface taskItemInput {
  id: number
  name: string
}

export function NewTaskModal() {
  const [taskItemsInput, setTaskItemsInput] = useState<taskItemInput[]>([
    { id: Math.random(), name: "" }
  ])

  function handleNewTaskItemInput() {
    setTaskItemsInput((state) => [ ...state, { id: Math.random(), name: "" } ])
  }

  function setTaskItemInputValue(position: number, field: string, value: string) {
    const updatedTaskItems = taskItemsInput.map((taskItem, index) => {
      if (index === position) {
        return { ...taskItem, [field]: value }
      }

      return taskItem
    })

    setTaskItemsInput(updatedTaskItems)
  }

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event?.currentTarget)
    const title = formData.get('title')

    console.log({
      title,
      taskItemsInput
    })
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
          <label
            htmlFor="title"
            className="text-gray-400 text-sm mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-blue-500 rounded-md px-2 py-1"
          />

          <button
            type="button"
            onClick={handleNewTaskItemInput}
            className="flex items-center gap-2 self-end bg-yellow-300 text-blue-700 p-2 my-6 w-max h-full rounded-md hover:bg-blue-300 hover:text-white transition-colors duration-200"
          >
            + Novo item
          </button>

          {taskItemsInput.map((taskItem, index) => (
            <input
              type="text"
              key={taskItem.id}
              value={taskItem.name}
              onChange={e => setTaskItemInputValue(index, 'name', e.target.value)}
              className="bg-blue-500 rounded-md px-2 py-1 mb-4"
            />
          ))}

          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-300 text-blue-700 font-semibold p-2 mt-4 rounded-3xl hover:bg-blue-300 hover:text-white transition-colors duration-200"
          >
            Criar task
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
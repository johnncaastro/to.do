import { Check, Plus, Search, SlidersHorizontal, Trash2, X } from "lucide-react"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Dialog from "@radix-ui/react-dialog"
import { FormEvent, useState } from "react"

interface Task {
  id: number
  title: string
  tasks: Array<{
    name: string
    finished: boolean
  }>
}

interface taskItemInput {
  id: number
  name: string
}

export function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
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
    <>
      <header className="flex items-center justify-between mb-10">
        <h1 className="uppercase text-blue-300 font-bold text-3xl">to do</h1>
        <div className="flex items-center gap-2">
          <img 
            src="https://github.com/johnncaastro.png" 
            alt="perfil do github" 
            className="w-12 h-12 rounded-full" 
          />
          <div>
            <span className="text-gray-400 text-xs">Bom dia,</span>
            <p className="text-base font-light">Jonathan Castro</p>
          </div>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-2 h-10 mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button" 
              className="w-max rounded-md p-2 hover:bg-blue-300 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
            <div className="bg-blue-500 rounded-full px-3 py-1">
              2 tasks
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div 
              className="flex flex-1 h-full max-w-md items-center justify-between bg-blue-500 px-2 py-1 rounded-md">
              <input 
                type="text" 
                placeholder="Busque por tasks..." 
                className="bg-transparent outline-none" 
              />
              <Search className="w-6 h-6" />
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button 
                  type="button" 
                  className="flex items-center gap-2 bg-yellow-300 text-blue-700 p-2 h-full rounded-md hover:bg-blue-300 hover:text-white transition-colors duration-200"
                >
                  <Plus className="w-6 h-6" />
                  Nova task
                </button>
              </Dialog.Trigger>
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
            </Dialog.Root>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-300 rounded-lg p-4">
            <h2 className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4">
              Mercado
            </h2>

            <div className="flex items-center gap-2">
              <Checkbox.Root
                id="item-1" 
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-1">
                Arroz
              </label>
              <button
                type="button" 
                className="text-red-300 block ml-auto hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-blue-300 rounded-lg p-4">
            <h2 className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4">Lista de materiais</h2>

            <div className="flex items-center gap-2">
              <Checkbox.Root
                id="item-2"
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-2">
                Caderno
              </label>
              <button
                type="button" 
                className="text-red-300 block ml-auto hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-blue-300 rounded-lg p-4">
            <h2
              className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4"
            >
              Reunião
            </h2>

            <div className="group flex items-center gap-2">
              <Checkbox.Root
                id="item-3"
                checked={isChecked}
                onCheckedChange={() => setIsChecked((state) => !state)}
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-3" className={`${isChecked ? "line-through" : ""}`}>
                Supervisor
              </label>
              <button
                type="button" 
                className="text-red-300 block ml-auto hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

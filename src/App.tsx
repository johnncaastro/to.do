import { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Dialog from "@radix-ui/react-dialog"
import { NewTaskModal } from "./components/newTaskModal"
import { Check, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react"

interface Task {
  id: number
  title: string
  tasks: Array<{
    name: string
    finished: boolean
  }>
}

export function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

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
              <NewTaskModal />
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
                id="item-task-1" 
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-task-1">
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
                id="item-task-2"
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-task-2">
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
                id="item-task-3"
                checked={isChecked}
                onCheckedChange={() => setIsChecked((state) => !state)}
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="item-task-3" className={`${isChecked ? "line-through" : ""}`}>
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

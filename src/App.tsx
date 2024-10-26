import { TasksProvider } from "./hooks/useTasks"
import * as Dialog from "@radix-ui/react-dialog"
import { Tasks } from "./components/tasks"
import { NewTaskModal } from "./components/newTaskModal"
import { Plus, Search, SlidersHorizontal } from "lucide-react"

export function App() {
  return (
    <TasksProvider>
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
        <Tasks />
      </main>
    </TasksProvider>
  )
}

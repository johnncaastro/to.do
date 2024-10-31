import { NewTaskModal } from "./newTaskModal"
import * as Dialog from '@radix-ui/react-dialog'
import { useTasks } from "../hooks/useTasks";
import { SlidersHorizontal, Search, Plus } from "lucide-react";
import { SearchFormTask } from "./searchFormTask";

export function TaskTools() {
  const { tasks } = useTasks()

  return (
    <div className="grid grid-cols-2 h-10 mb-6">
      <div className="flex items-center gap-2">
        <button
          type="button" 
          className="w-max rounded-md p-2 hover:bg-blue-300 transition-colors duration-200"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
        <div className="bg-blue-500 rounded-full px-3 py-1">
          {`${tasks.length} ${tasks.length > 1 ? "tasks": "task"}`}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <SearchFormTask />
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
  )
}
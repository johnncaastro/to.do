import { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Dialog from '@radix-ui/react-dialog'
import { useTasks } from "../hooks/useTasks"
import { Check, Ellipsis } from "lucide-react"
import { EditTaskModal } from "./editTaskModal"

export function Tasks() {
  const {
    tasks,
    filteredTasks,
    changeIsCompleteFieldTaskItem,
    removeTask
  } = useTasks()

  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false)

  function handleOpenEditTaskModal() {
    setIsOpenEditTaskModal(true)
  }
  
  function closeEditTaskModal() {
    setIsOpenEditTaskModal(false)
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks?.map(task => (
          <div key={task.id} className="bg-blue-300 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <h2
                className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4"
              >
                {task.title}
              </h2>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button type="button">
                    <Ellipsis
                      className="w-6 h-6 hover:text-gray-400 transition-colors duration-200"
                    />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    sideOffset={5}
                    className="min-w-28 bg-white rounded-md p-1"
                  >
                    <DropdownMenu.Item className="outline-none">
                    <button
                      type="button"
                      onClick={handleOpenEditTaskModal}
                      aria-hidden={false}
                      className="w-full px-2 rounded-sm hover:bg-blue-300 hover:text-white transition-colors duration-200 text-center"
                    >
                      Editar
                    </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none">
                      <button
                        type="button"
                        onClick={() => removeTask(task.id)}
                        className="w-full px-2 rounded-sm hover:bg-red-300 hover:text-white transition-colors duration-200 text-center"
                      >
                        Excluir
                      </button>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
            {task.items.map(item => (
              <div key={item.name} className="flex items-center gap-2 mb-4">
                <Checkbox.Root
                  id={String(item.id)}
                  checked={item.is_complete}
                  onCheckedChange={() => changeIsCompleteFieldTaskItem(item.id)}
                  className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Checkbox.Indicator>
                    <Check className="w-5 h-5 text-blue-300" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor={String(item.id)} className={`${item.is_complete ? "line-through" : ""}`}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        ))
      ) : (
        tasks?.map(task => (
          <div key={task.id} className="bg-blue-300 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <h2
                className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4"
              >
                {task.title}
              </h2>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button type="button">
                    <Ellipsis
                      className="w-6 h-6 hover:text-gray-400 transition-colors duration-200"
                    />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal container={document.getElementById(task.id)}>
                  <DropdownMenu.Content
                    sideOffset={5}
                    className="min-w-28 bg-white rounded-md p-1"
                  >
                    <DropdownMenu.Item className="outline-none">
                      <button
                        type="button"
                        onClick={handleOpenEditTaskModal}
                        aria-hidden={false}
                        className="w-full px-2 rounded-sm hover:bg-blue-300 hover:text-white transition-colors duration-200 text-center"
                      >
                        Editar
                      </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none">
                      <button
                        type="button"
                        onClick={() => removeTask(task.id)}
                        className="w-full px-2 rounded-sm hover:bg-red-300 hover:text-white transition-colors duration-200 text-center"
                      >
                        Excluir
                      </button>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
  
            {task.items.map(item => (
              <div key={item.name} className="flex items-center gap-2 mb-4">
                <Checkbox.Root
                  id={String(item.id)}
                  checked={item.is_complete}
                  onCheckedChange={() => changeIsCompleteFieldTaskItem(item.id)}
                  className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Checkbox.Indicator>
                    <Check className="w-5 h-5 text-blue-300" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor={String(item.id)} className={`${item.is_complete ? "line-through" : ""}`}>
                  {item.name}
                </label>
              </div>
            ))}

            <EditTaskModal
              isOpenModal={isOpenEditTaskModal}
              onCloseModal={closeEditTaskModal}
              taskId={task.id}
            />
          </div>
        ))
      )}
    </div>
  )
}
import * as Checkbox from '@radix-ui/react-checkbox'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Spinner } from './spinner'
import { useTasks } from '../hooks/useTasks'
import { Check, Ellipsis } from 'lucide-react'

export function Tasks() {
  const { tasks, updateIsCompletedTask, removeTask, openEditTaskModal } =
    useTasks()

  if (tasks === undefined) {
    return (
      <div className="flex justify-center mt-16">
        <Spinner />
      </div>
    )
  }

  if (tasks?.length === 0) {
    return (
      <h2 className="font-semibold text-center text-3xl mt-8">
        Você ainda não criou uma task...
      </h2>
    )
  }

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div key={task.id} className="bg-blue-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox.Root
                id={task.id}
                checked={task.is_complete}
                onCheckedChange={() => updateIsCompletedTask(task.id)}
                className="bg-white w-5 h-5 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                htmlFor={task.id}
                className={`${task.is_complete ? 'line-through' : ''} text-lg cursor-pointer`}
              >
                {task.title}
              </label>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="hover:bg-blue-500 transition-colors duration-200 p-1 rounded-md"
                >
                  <Ellipsis className="w-5 h-5" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  align="end"
                  className="min-w-28 bg-white rounded-md p-1"
                >
                  <DropdownMenu.Item className="outline-none">
                    <button
                      type="button"
                      onClick={() => openEditTaskModal(task.id)}
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
          <span
            className={`${task.task_group.length > 0 ? 'bg-yellow-300 text-blue-700' : 'bg-gray-700 text-gray-400'} block text-xs font-medium rounded-lg w-max px-1 py-0.5 mt-2`}
          >
            {task.task_group.length > 0 ? task.task_group : 'sem grupo'}
          </span>
        </div>
      ))}
    </div>
  )
}

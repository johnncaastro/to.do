import * as Checkbox from "@radix-ui/react-checkbox"
import { useTasks } from "../hooks/useTasks"
import { Check, Trash2 } from "lucide-react"

export function Tasks() {
  const { tasks, toggleTaskItemCompleted } = useTasks()

  return (
    <div className="space-y-4">
      {tasks?.map(task => (
        <div key={task.id} className="bg-blue-300 rounded-lg p-4">
          <h2
            className="bg-yellow-300 text-blue-700 font-medium rounded-lg w-max px-1 py-0.5 mb-4"
          >
            {task.title}
          </h2>

          {task.items.map((item, index) => (
            <div key={item.name} className="group flex items-center gap-2 mb-4">
              <Checkbox.Root
                id={item.name}
                checked={item.isComplete}
                onCheckedChange={() => toggleTaskItemCompleted(task.id, index)}
                className="bg-white w-6 h-6 flex items-center justify-center rounded-md p-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Checkbox.Indicator>
                  <Check className="w-5 h-5 text-blue-300" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={item.name} className={`${item.isComplete ? "line-through" : ""}`}>
                {item.name}
              </label>
              <button
                type="button" 
                className="text-red-300 block ml-auto hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
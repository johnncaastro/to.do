import { useTasks } from '../hooks/useTasks'
import { Select } from './select/select'
import { SelectItem } from './select/selectItem'
import { Search } from 'lucide-react'

export function FilterFormTask() {
  const { tasks } = useTasks()

  const tasksGroups = tasks
    ?.map((task) => {
      return task.task_group
    })
    .filter((group) => group.length > 0)

  return (
    <form className="flex items-center gap-3">
      <span className="text-sm">Filtros:</span>

      <input
        type="text"
        placeholder="Por nome"
        className="bg-blue-500 p-2 rounded-md max-w-36 text-sm"
      />

      <Select placeholder="Por status">
        <SelectItem value="all" text="Todas" />
        <SelectItem value="finished" text="Finalizadas" />
        <SelectItem value="no-finished" text="Não finalizadas" />
      </Select>

      <Select placeholder="Por grupo">
        {tasksGroups?.map((group) => (
          <SelectItem key={group} value={group} text={group} />
        ))}
      </Select>

      <button
        type="submit"
        className="flex items-center gap-2 p-2 rounded-md border-0 text-sm bg-blue-300 hover:bg-blue-300/80 transition-colors duration-200"
      >
        <Search className="w-4 h-4" />
        Filtrar resultado
      </button>
    </form>
  )
}

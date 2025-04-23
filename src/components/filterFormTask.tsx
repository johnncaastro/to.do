import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { useTasks } from '../hooks/useTasks'
import { Select } from './select/select'
import { SelectItem } from './select/selectItem'
import { Search } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

const filterFormTaskSchema = zod.object({
  name: zod.string(),
  status: zod.enum(['all', 'finished', 'no-finished']),
  group: zod.string(),
})

type FilterFormProps = zod.infer<typeof filterFormTaskSchema>

export function FilterFormTask() {
  const { tasks } = useTasks()

  const { handleSubmit, register, control } = useForm<FilterFormProps>({
    resolver: zodResolver(filterFormTaskSchema),
  })

  const tasksGroups = tasks
    ?.map((task) => {
      return task.task_group
    })
    .filter((group) => group.length > 0)

  function handleSearchTasksByFilters(data: FilterFormProps) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchTasksByFilters)}
      className="flex items-center gap-3"
    >
      <span className="text-sm">Filtros:</span>

      <input
        type="text"
        placeholder="Por nome"
        {...register('name')}
        className="bg-blue-500 p-2 rounded-md max-w-36 text-sm"
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              defaultValue="all"
              placeholder="Por status"
            >
              <SelectItem value="all" text="Todos os status" />
              <SelectItem value="finished" text="Finalizadas" />
              <SelectItem value="no-finished" text="Não finalizadas" />
            </Select>
          )
        }}
      />

      <Controller
        name="group"
        control={control}
        render={({ field: { name, onChange, value } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              placeholder="Por grupo"
            >
              {tasksGroups?.map((group) => (
                <SelectItem key={group} value={group} text={group} />
              ))}
            </Select>
          )
        }}
      />

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

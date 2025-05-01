import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { useTasks } from '../hooks/useTasks'
import { Select } from './select/select'
import { SelectItem } from './select/selectItem'
import { Search, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router'

const filterFormTaskSchema = zod.object({
  name: zod.string(),
  status: zod.string().optional(),
  group: zod.string(),
})

type FilterFormProps = zod.infer<typeof filterFormTaskSchema>

export function FilterFormTask() {
  const { tasks } = useTasks()
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')
  const status = searchParams.get('status')
  const group = searchParams.get('group')

  const { handleSubmit, register, control, reset } = useForm<FilterFormProps>({
    resolver: zodResolver(filterFormTaskSchema),
    defaultValues: {
      name: name ?? '',
      status: status ?? 'all',
      group: group ?? '',
    },
  })

  const tasksGroups = tasks
    ?.map((task) => {
      return task.task_group
    })
    .filter((group) => group.length > 0)

  const tasksGroupsWithUniqueValues = new Set(tasksGroups)

  const tasksGroupsArray = Array.from(tasksGroupsWithUniqueValues)

  function handleSearchTasksByFilters({
    name,
    status,
    group,
  }: FilterFormProps) {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      if (group) {
        state.set('group', group)
      } else {
        state.delete('group')
      }

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('status')
      state.delete('group')

      return state
    })

    reset({
      name: '',
      status: 'all',
      group: '',
    })
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
              {tasksGroupsArray?.map((group) => (
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

      <button
        type="button"
        onClick={handleClearFilters}
        className="flex items-center gap-2 p-2 rounded-md border-[1px] border-white text-sm hover:bg-gray-700 transition-colors duration-200"
      >
        <X className="w-4 h-4" />
        Remover filtros
      </button>
    </form>
  )
}

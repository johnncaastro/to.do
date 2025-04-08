/* eslint-disable camelcase */
import * as Dialog from '@radix-ui/react-dialog'
import { useTasks } from '../hooks/useTasks'
import { Input } from './input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { X } from 'lucide-react'

interface NewTaskModalProps {
  onCloseModal(): void
}

const TaskFormValidationSchema = zod.object({
  title: zod.string().trim().min(2, 'Informe o nome da task'),
  task_group: zod.string(),
})

type NewTaskForm = zod.infer<typeof TaskFormValidationSchema>

export function NewTaskModal({ onCloseModal }: NewTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewTaskForm>({
    resolver: zodResolver(TaskFormValidationSchema),
  })
  const { createNewTask } = useTasks()

  async function handleCreateNewTask(data: NewTaskForm) {
    const { title, task_group } = data

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await createNewTask({
      title,
      task_group,
    })

    reset()
    onCloseModal()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-4 py-6 rounded-md w-full max-w-lg bg-blue-700 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-2xl">Nova task</Dialog.Title>
          <Dialog.Close>
            <X className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </Dialog.Close>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateNewTask)}
          className="flex flex-col"
        >
          <Input label="Título" {...register('title')} />
          <p className="text-red-300 mt-2">{errors.title?.message}</p>
          <Input label="Grupo" {...register('task_group')} />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${isSubmitting ? 'bg-white/50' : 'bg-yellow-300'} flex items-center justify-center text-blue-700 font-semibold p-2 mt-8 rounded-3xl ${!isSubmitting ? 'hover:bg-blue-300 hover:text-white' : ''} transition-colors duration-200`}
          >
            Criar task
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'
import { EditTaskModal } from '../components/editTaskModal'

interface Task {
  id: string
  title: string
  created_at: number
  is_complete: boolean
  task_group: string
}

interface TaskFormsInputs {
  title: string
  task_group: string
}

interface TasksContextData {
  tasks: Task[] | undefined
  loadTasks(query?: string): Promise<void>
  createNewTask(data: TaskFormsInputs): Promise<void>
  isOpenEditTaskModal: boolean
  openEditTaskModal(): void
  closeEditTaskModal(): void
  editTask(edittedTask: TaskFormsInputs): void
  updateIsCompletedTask(taskId: string): Promise<void>
  removeTask(taskId: string): Promise<void>
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksContext = createContext<TasksContextData>(
  {} as TasksContextData,
)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined)
  const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false)

  async function loadTasks(query?: string) {
    if (query && query.trim() !== '') {
      const response = await api.get(`/tasks?search=${query}`)

      setTasks(response.data)
    } else {
      const response = await api.get('/tasks')

      setTasks(response.data)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function createNewTask(data: TaskFormsInputs) {
    // eslint-disable-next-line camelcase
    const { title, task_group } = data

    await api.post('/tasks', {
      title,
      // eslint-disable-next-line camelcase
      task_group,
    })

    await loadTasks()
  }

  function openEditTaskModal() {
    setIsOpenEditTaskModal(true)
  }

  function closeEditTaskModal() {
    setIsOpenEditTaskModal(false)
  }

  function editTask(edittedTask: TaskFormsInputs) {
    console.log(edittedTask)
  }

  async function removeTask(taskId: string) {
    await api.delete(`/tasks/${taskId}`)

    const tasksWithoutTaskRemoved = tasks?.filter((task) => task.id !== taskId)

    setTasks(tasksWithoutTaskRemoved)
  }

  async function updateIsCompletedTask(taskId: string) {
    await api.patch(`/tasks/${taskId}/completed`, {})

    const updatedTaskIsCompleteField = tasks?.map((task) => {
      if (task.id === taskId) {
        return { ...task, is_complete: !task.is_complete }
      } else {
        return task
      }
    })

    setTasks(updatedTaskIsCompleteField)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loadTasks,
        createNewTask,
        editTask,
        updateIsCompletedTask,
        removeTask,
        isOpenEditTaskModal,
        openEditTaskModal,
        closeEditTaskModal,
      }}
    >
      {children}
      {isOpenEditTaskModal && (
        <EditTaskModal onCloseModal={closeEditTaskModal} />
      )}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)

  return context
}

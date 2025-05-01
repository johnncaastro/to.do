import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'
import { EditTaskModal } from '../components/editTaskModal'
import { useSearchParams } from 'react-router'

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
  loadTasks(): Promise<void>
  createNewTask(data: TaskFormsInputs): Promise<void>
  isOpenEditTaskModal: boolean
  openEditTaskModal(taskId: string): void
  closeEditTaskModal(): void
  editTask(edittedTask: TaskFormsInputs, taskId: string): void
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
  const [currentTaskId, setCurrentTaskId] = useState('')
  const [searchParams] = useSearchParams()

  const name = searchParams.get('name')
  const status = searchParams.get('status')
  const group = searchParams.get('group')

  async function loadTasks() {
    const response = await api.get('/tasks', {
      params: {
        name,
        status,
        group,
      },
    })

    setTasks(response.data)
  }

  useEffect(() => {
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, status, group])

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

  function openEditTaskModal(taskId: string) {
    setCurrentTaskId(taskId)
    setIsOpenEditTaskModal(true)
  }

  function closeEditTaskModal() {
    setIsOpenEditTaskModal(false)
  }

  async function editTask(editedTask: TaskFormsInputs, taskId: string) {
    await api.put(`/tasks/${taskId}`, editedTask)

    const updateTasksWithEditedTask = tasks?.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: editedTask.title,
          task_group: editedTask.task_group,
        }
      } else {
        return task
      }
    })

    setTasks(updateTasksWithEditedTask)
  }

  async function removeTask(taskId: string) {
    const tasksWithoutTaskRemoved = tasks?.filter((task) => task.id !== taskId)

    setTasks(tasksWithoutTaskRemoved)

    await api.delete(`/tasks/${taskId}`)
  }

  async function updateIsCompletedTask(taskId: string) {
    const updatedTaskIsCompleteField = tasks?.map((task) => {
      if (task.id === taskId) {
        return { ...task, is_complete: !task.is_complete }
      } else {
        return task
      }
    })

    setTasks(updatedTaskIsCompleteField)

    await api.patch(`/tasks/${taskId}/completed`, {})
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
        <EditTaskModal
          currentTaskId={currentTaskId}
          onCloseModal={closeEditTaskModal}
        />
      )}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)

  return context
}

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

interface Task {
  id: string
  title: string
  items: Array<{
    id: number
    name: string
    is_complete: boolean
  }>
  created_at: number
}

interface TaskFormsInputs {
  title: string
  items: Array<{
    name: string
  }>
}

interface TasksContextData {
  tasks: Task[]
  filteredTasks: Task[]
  loadTasks(query?: string): Promise<void>
  createNewTask(data: TaskFormsInputs): Promise<void>
  // editTask(edittedTask: TaskFormsInputs): void
  changeIsCompleteFieldTaskItem(taskId: string, itemId: number): Promise<void>
  removeTask(id: string): Promise<void>
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  async function loadTasks(query?: string) {
    if(query && query.trim() !== '') {
      const response = await api.get(`/tasks?search=${query}`)

      setTasks(response.data)
    } else {
      const response = await api.get('/tasks')

      setTasks(response.data)
      setFilteredTasks([])
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

async function createNewTask(data: TaskFormsInputs) {
  const { title, items } = data

  await api.post('/tasks', {
    title,
    items
  })

  await loadTasks()
}

// function editTask(edittedTask: TaskFormsInputs) {
//   console.log(edittedTask)
// }

async function removeTask(id: string) {
  await api.delete(`/tasks/${id}`)

  const tasksWithoutTaskRemoved = tasks.filter(task => task.id !== id)

  setTasks(tasksWithoutTaskRemoved);
}

async function changeIsCompleteFieldTaskItem(taskId: string, itemId: number) {
  await api.put(`/tasks/item/completed/${itemId}`, {})

  const itemWithUpdatedIsCompleteField = tasks
    .filter(task => task.id === taskId)
    [0].items.map(item => {
      if(item.id === itemId) {
        return { ...item, is_complete: !item.is_complete }
      } else {
        return item
      }
    })

  const newTasks = tasks.map(task => {
    if(task.id === taskId) {
      return { ...task, items: itemWithUpdatedIsCompleteField }
    } else {
      return task
    }
  })

  setTasks(newTasks)
}

  return (
    <TasksContext.Provider value={{ 
      tasks,
      filteredTasks,
      loadTasks,
      createNewTask,
      // editTask,
      changeIsCompleteFieldTaskItem,
      removeTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)

  return context
}
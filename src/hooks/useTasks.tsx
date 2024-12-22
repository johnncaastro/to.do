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
  editTask(edittedTask: TaskFormsInputs): void
  changeIsCompleteFieldTaskItem(taskId: number): Promise<void>
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
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(query.trim())))

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

function editTask(edittedTask: TaskFormsInputs) {
  console.log(edittedTask)
}

async function removeTask(id: string) {
  await api.delete(`/tasks/${id}`)

  const tasksWithoutTaskRemoved = tasks.filter(task => task.id !== id)

  setTasks(tasksWithoutTaskRemoved);

  const removedTaskExistsInTheFilteredTasks = filteredTasks.find(task => task.id === id)

  if(removedTaskExistsInTheFilteredTasks !== undefined) {
    const filteredTasksWithoutTaskRemoved = filteredTasks.filter(task => {
      return task.id !== id
    })
    setFilteredTasks(filteredTasksWithoutTaskRemoved)
  }
}

async function changeIsCompleteFieldTaskItem(itemId: number) {
  await api.put(`/tasks/item/completed/${itemId}`, {})

  await loadTasks()

  // const selectedTaskInTheFilteredTasks = filteredTasks.find(task => task.id === taskId)

  // if(selectedTaskInTheFilteredTasks !== undefined) {
  //   const filteredTasksWithUpdatedIsCompleteField = filteredTasks.map(task => {
  //     if(task.id === taskId) {
  //       return taskWithUpdatedIsCompleteField[0]
  //     }
  
  //     return task
  //   })

  //   setFilteredTasks(filteredTasksWithUpdatedIsCompleteField)
}

  return (
    <TasksContext.Provider value={{ 
      tasks,
      filteredTasks,
      loadTasks,
      createNewTask,
      editTask,
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
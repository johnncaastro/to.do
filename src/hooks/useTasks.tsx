import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

interface Task {
  id: number
  title: string
  items: Array<{
    name: string
    isComplete: boolean
  }>
  createdAt: number
}

type CreateNewTaskInputs = Omit<Task, 'id'>

interface TasksContextData {
  tasks: Task[]
  filteredTasks: Task[]
  loadTasks(query?: string): Promise<void>
  createNewTask(data: CreateNewTaskInputs): void
  editTask(nameTaskEdittedInput: string, idTaskEditted: number): void
  toggleTaskItemCompleted(taskId: number, itemPosition: number): void
  removeTask(id: number): void
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
      const response = await api.get('/tasks', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
        }
      })

      setTasks(response.data)
      setFilteredTasks([])
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function createNewTask(data: CreateNewTaskInputs) {
    const { title, items, createdAt } = data

    const response = await api.post('tasks', {
      title,
      items,
      createdAt,
    })

    setTasks(state => [ response.data, ...state ])
  }

  function editTask(nameTaskEdittedInput: string, idTaskEdittedInput: number) {
    if(!nameTaskEdittedInput || nameTaskEdittedInput.trim() === '') {
      alert('A task precisa ter um nome!')

      return;
    }

    const newTasks = tasks.map(task => task.id === idTaskEdittedInput ? {
      ...task,
      name: nameTaskEdittedInput,
    }: task);

    setTasks(newTasks);
  }

  function removeTask(id: number) {
    const tasksFiltered = tasks.filter(task => task.id !== id)

    setTasks(tasksFiltered);
  }

  function toggleTaskItemCompleted(taskId: number, itemPosition: number) {
    const currentTask = tasks.filter(task => task.id === taskId)
    const newTaskItems = currentTask.map(task => (
      task.items.map((item, index) => {
        if(index === itemPosition) {
          return { ...item, isComplete: !item.isComplete }
        }

        return item
      })
    ))

    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return { ...task, items: newTaskItems[0] }
      }

      return task
    })

    setTasks(newTasks)
  }

  return (
    <TasksContext.Provider value={{ 
      tasks,
      filteredTasks,
      loadTasks,
      createNewTask,
      editTask,
      toggleTaskItemCompleted,
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
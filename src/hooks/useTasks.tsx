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
  createNewTask(data: CreateNewTaskInputs): Promise<void>
  editTask(nameTaskEdittedInput: string, idTaskEditted: number): void
  changeIsCompleteFieldTaskItem(taskId: number, taskItemPosition: number): Promise<void>
  removeTask(id: number): Promise<void>
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
      const response = await api.get('tasks', {
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

  async function removeTask(id: number) {
    await api.delete(`tasks/${id}`)

    const tasksWithoutTaskRemoved = tasks.filter(task => task.id !== id)

    setTasks(tasksWithoutTaskRemoved);

    const taskExistsInTheFilteredTasks = filteredTasks.find(task => task.id === id)

    if(taskExistsInTheFilteredTasks !== undefined) {
      const filteredTasksWithoutTaskRemoved = filteredTasks.filter(task => {
        return task.id !== id
      })
      setFilteredTasks(filteredTasksWithoutTaskRemoved)
    }
  }

  async function changeIsCompleteFieldTaskItem(taskId: number, taskItemPosition: number) {
    const selectedTask = tasks.filter(task => task.id === taskId)
    const taskItemsWithUpdatedIsCompleteField = selectedTask[0].items.map((item, index) => {
      if(index === taskItemPosition) {
        return { ...item, isComplete: !item.isComplete }
      }

      return item
    })

    const taskWithUpdatedIsCompleteField = selectedTask.map(task => {
      return { ...task, items: taskItemsWithUpdatedIsCompleteField }
    })

    await api.put(`tasks/${taskId}`, taskWithUpdatedIsCompleteField[0])

    const updatedTasks = tasks.map(task => {
      if(task.id === taskId) {
        return taskWithUpdatedIsCompleteField[0]
      }

      return task
    })

    setTasks(updatedTasks)

    const selectedTaskInTheFilteredTasks = filteredTasks.find(task => task.id === taskId)

    if(selectedTaskInTheFilteredTasks !== undefined) {
      const filteredTasksWithUpdatedIsCompleteField = filteredTasks.map(task => {
        if(task.id === taskId) {
          return taskWithUpdatedIsCompleteField[0]
        }
  
        return task
      })

      setFilteredTasks(filteredTasksWithUpdatedIsCompleteField)
    }
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
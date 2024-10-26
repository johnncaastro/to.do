import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Task {
  id: number
  title: string
  items: Array<{
    name: string
    isComplete: boolean
  }>
}

interface TasksContextData {
  tasks: Task[];
  createNewTask(taskInput: string): void;
  editTask(nameTaskEdittedInput: string, idTaskEditted: number): void;
  toggleTaskItemCompleted(taskId: number, itemPosition: number): void;
  removeTask(id: number): void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks() {
    const response = await api.get('/tasks')
    const data = await response.data

    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  function createNewTask(taskInput: string) {
    if(!taskInput || taskInput.trim() === '') {
      alert('Crie um nome para a task!');

      return;
    }
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
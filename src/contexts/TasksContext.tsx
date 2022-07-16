import { createContext, ReactNode, useState } from "react";

interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

interface TasksContextData {
  tasks: Task[];
  createTask(taskInput: string): void;
  editTask(nameTaskEdittedInput: string, idTaskEditted: number): void;
  toggleTaskCompleted(id: number): void;
  removeTask(id: number): void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function createTask(taskInput: string) {
    if(!taskInput || taskInput.trim() === '') {
      alert('Crie um nome para a task!');

      return;
    }

    const taskNameRepeated = tasks.find(task => task.name === taskInput);

    if(taskNameRepeated) {
      alert('Já existe uma task com esse nome!');

      return;
    }

    setTasks([
      ...tasks,
      {id: Math.random(), name: taskInput, isComplete: false},
    ])
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

  function toggleTaskCompleted(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }

  return (
    <TasksContext.Provider value={{ 
      tasks,
      createTask,
      editTask,
      toggleTaskCompleted,
      removeTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}
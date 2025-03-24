import { TasksProvider } from './hooks/useTasks'
import { Tasks } from './components/tasks'
import { TaskTools } from './components/taskTools'

export function App() {
  return (
    <TasksProvider>
      <header className="flex items-center justify-between mb-10">
        <h1 className="uppercase text-blue-300 font-bold text-3xl">to do</h1>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/johnncaastro.png"
            alt="perfil do github"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-xs">Bom dia,</span>
            <p className="text-base font-light">Jonathan Castro</p>
          </div>
        </div>
      </header>
      <main>
        <TaskTools />
        <Tasks />
      </main>
    </TasksProvider>
  )
}

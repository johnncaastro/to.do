import { LogOut } from 'lucide-react'
import { Tasks } from '../components/tasks'
import { TaskTools } from '../components/taskTools'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const { user, signOutProvider } = useAuth()

  return (
    <div className="max-w-7xl text-white mx-auto mobile:px-2 laptop:px-4 mobile:py-3 laptop:py-10">
      <header className="flex items-center justify-between mb-10">
        <h1 className="uppercase text-blue-300 font-bold text-3xl">to do</h1>
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar || ''}
            alt="perfil da conta"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-xs">Olá,</span>
            <p className="text-base font-light">{user?.name}</p>
          </div>
          <button
            type="button"
            onClick={signOutProvider}
            className="flex items-center gap-2 p-2 ml-8 rounded-md border-[1px] border-white text-sm hover:bg-gray-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </header>
      <main>
        <TaskTools />
        <Tasks />
      </main>
    </div>
  )
}

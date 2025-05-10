import { BrowserRouter, Route, Routes } from 'react-router'
import { TasksProvider } from '../hooks/useTasks'
import { SignIn } from '../pages/auth/signIn'
import { App } from '../App'

export function Router() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<App />} />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  )
}

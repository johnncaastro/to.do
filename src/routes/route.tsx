import { BrowserRouter, Route, Routes } from 'react-router'
import { TasksProvider } from '../hooks/useTasks'
import { AuthProvider } from '../hooks/useAuth'
import { SignIn } from '../pages/auth/signIn'
import { Home } from '../pages/home'

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

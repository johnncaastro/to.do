import { Home } from "./pages/Home";
import Modal from 'react-modal';
import { TasksProvider } from "./contexts/TasksContext";

Modal.setAppElement('#root');

export function App() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  )
}

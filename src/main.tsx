import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { App } from './App'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="max-w-5xl text-white mx-auto px-4 py-10">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </div>,
)

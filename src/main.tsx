import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { App } from './App'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="max-w-7xl text-white mx-auto mobile:px-2 laptop:px-4 mobile:py-3 laptop:py-10">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </div>,
)

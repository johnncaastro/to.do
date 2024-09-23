import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='max-w-5xl text-white mx-auto px-4 py-10'>
    <App />
  </div>
)

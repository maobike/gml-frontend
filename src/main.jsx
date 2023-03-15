import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import NavBar from './modules/shared/components/NavBar';
import { AppRouter } from './router/AppRouter';
import './styles/style.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <AppRouter/>
    </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {AppProvider, useAppContext} from './components/Context/AppProvider.jsx'
import { TokenProvider } from '../constants/TokenContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
    <TokenProvider>
    <App />
    </TokenProvider>
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

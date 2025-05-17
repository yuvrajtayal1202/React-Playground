import { StrictMode } from 'react'
import  {createRoot}  from 'react-dom/client'
import ReactDOM from "react-dom/client";


import './index.css'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

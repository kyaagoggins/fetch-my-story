import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* This is the main page of the application - this file allows for react app handling 
strict mode corresponds to the entire application stopping if there is an error found 
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

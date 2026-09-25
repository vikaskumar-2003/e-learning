import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import App from './App.jsx'
import { UserContextProvider } from './context/userContext.jsx'

export const server='http://localhost:5000'

createRoot(document.getElementById('root')).render(

   <UserContextProvider>
        <App/>
   </UserContextProvider>
      
   
)

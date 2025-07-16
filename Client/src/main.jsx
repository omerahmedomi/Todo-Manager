import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Todos from './components/Todos.jsx'
import SlidingTabs from './components/SlidingTabs.jsx'
const router=createBrowserRouter([

{
  path:'/',
  element:<App/>
},
{
  path:'/todos',
  element:<Todos/>
},
{
  path:'/test',
  element: <SlidingTabs/>
}



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

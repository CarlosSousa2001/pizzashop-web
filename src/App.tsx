import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import {HelmetProvider, Helmet} from 'react-helmet-async'

export function App() {

  return (
    <HelmetProvider>
      <Helmet titleTemplate='%s | pizza.shop'/>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import {HelmetProvider, Helmet} from 'react-helmet-async'
import { Toaster } from 'sonner'

export function App() {

  return (
    <HelmetProvider>
      <Helmet titleTemplate='%s | pizza.shop'/>
      <Toaster closeButton={true} richColors/>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
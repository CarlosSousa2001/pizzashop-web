import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey='pizzashop-theme' defaultTheme='dark'>
        <Helmet titleTemplate='%s | pizza.shop' />
        <Toaster closeButton={true} richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
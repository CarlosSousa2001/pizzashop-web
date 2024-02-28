import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials:true // cookies que estao no navegador serao enviado automaticamente
})
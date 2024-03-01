import { env } from '@/env'
import axios from 'axios'


export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials:true // cookies que estao no navegador serao enviado automaticamente
})
// essa interceptors executa antes de cada chamada a API e faz esse atraso de dois segundos
if(env.VITE_ENABLE_API_DELAY){
  api.interceptors.request.use(async (config) => {
    await new Promise(resolve => setTimeout(resolve, Math.round(Math.random() * 3000)))

    return config;
  })
}
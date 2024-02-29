import { api } from "@/lib/axios"

interface UpdateProfileBody {
  name: string,
  description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileBody) {

  // atraso o erro da requisição -> preciso comentar a parte da chama da api
  // await new Promise((_, reject)=> {
  //   setTimeout(reject, 2000)
  // })
  const response = await api.put<UpdateProfileBody>('/profile', { name, description })

  return response.data
}
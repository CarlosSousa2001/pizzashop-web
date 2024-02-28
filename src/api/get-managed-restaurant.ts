import { api } from "@/lib/axios";

export interface GetManagerRestaurantResposne {
  id:string,
  name:string,
  createdAt: Date | null,
  updateAt: Date | null,
  description:string | null,
  managerid: string | null
}

export async function getManagerRestaurant(){
  const response = await api.get<GetManagerRestaurantResposne>('/managed-restaurant')

  return response.data
}
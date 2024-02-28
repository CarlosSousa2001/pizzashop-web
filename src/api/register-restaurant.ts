import { api } from "@/lib/axios";

export interface RegisterRestaurant {
  restaurantName: string,
  managerName:string,
  email:string,
  phone:string
}

export async function registerRestaurant({
  restaurantName, managerName, email, phone
}: RegisterRestaurant){
  await api.post('/restaurants', {restaurantName, managerName, email, phone})
}
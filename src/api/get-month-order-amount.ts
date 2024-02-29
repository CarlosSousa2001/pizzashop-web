import { api } from "@/lib/axios";

export interface GetMotnOrdersAmountResponse {
  amount:number,
  diffFromLastMonth:number
}

export async function getMotnOrdersAmount(){
  const response = await api.get<GetMotnOrdersAmountResponse>('/metrics/month-orders-amount')

  return response.data
}
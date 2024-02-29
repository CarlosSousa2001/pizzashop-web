import { api } from "@/lib/axios";

export interface DispatchDetailsProps {
  orderId: string
}


export async function dispatchOrder({orderId}:DispatchDetailsProps){
  await api.patch(`/orders/${orderId}/dispatch`)
}
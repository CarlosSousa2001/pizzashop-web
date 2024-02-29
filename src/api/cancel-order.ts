import { api } from "@/lib/axios";

export interface CancelDetailsProps {
  orderId: string
}


export async function cancelOrder({orderId}:CancelDetailsProps){
  await api.patch(`/orders/${orderId}/cancel`)
}
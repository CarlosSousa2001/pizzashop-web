import { api } from "@/lib/axios";

export interface DeliverDetailsProps {
  orderId: string
}


export async function deliverOrder({orderId}:DeliverDetailsProps){
  await api.patch(`/orders/${orderId}/deliver`)
}
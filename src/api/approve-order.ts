import { api } from "@/lib/axios";

export interface AproveDetailsProps {
  orderId: string
}


export async function approveOrder({orderId}:AproveDetailsProps){
  await api.patch(`/orders/${orderId}/approve`)
}
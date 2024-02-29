import { api } from "@/lib/axios";

export type GetDailyRevenuePeriodResponse = {
  date:string,
  receipt:number
}[]

export interface GetDailyRevenuePeriodQuery {
  from?:Date,
  to?:Date
}

export async function getDailyRevenuePeriod({from, to}:GetDailyRevenuePeriodQuery){
  const response = await api.get<GetDailyRevenuePeriodResponse>(`/metrics/daily-receipt-in-period`,{
    params: {
      from,
      to
    }
  })
  return response.data
}
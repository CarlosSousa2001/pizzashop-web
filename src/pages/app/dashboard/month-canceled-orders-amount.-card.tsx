import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { DollarSign } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"

export function MothCanceledOrdersAmount() {
  const { data: MonthCanceledOrdersAmountFn } = useQuery({
    queryKey: ['metrics', 'month-cancel-amount'],
    queryFn: getMonthCanceledOrdersAmount
  })
  return (
    <Card>
    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-base font-semibold'>Cancelamentos no (mês)</CardTitle>
      <DollarSign className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent className='space-y-1'>
    {MonthCanceledOrdersAmountFn ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>{MonthCanceledOrdersAmountFn.amount}</span>
            <p className='text-xs text-muted-foreground'>
                  {MonthCanceledOrdersAmountFn.diffFromLastMonth < 0 ? (
                      <span className="text-emerald-500 dark:text-emerald-400">{MonthCanceledOrdersAmountFn.diffFromLastMonth}% em relação ao mês passado</span>
                  ): (
                    <span className="text-rose-500 dark:text-rose-500">+{MonthCanceledOrdersAmountFn.diffFromLastMonth}% em relação ao mês passado</span>
                  )}
            </p>
          </>
        ):(
          <MetricCardSkeleton/>
        )}
    </CardContent>
  </Card>
  )
}

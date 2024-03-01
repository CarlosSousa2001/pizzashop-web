import { getDayOrdersAmount } from "@/api/get-day-order-amount"
import { getMotnOrdersAmount } from "@/api/get-month-order-amount"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { DollarSign, Utensils } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"

export function MouthOrdersAmountCard() {


  const { data: MothOrdersAmountFn } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMotnOrdersAmount
  })

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-semibold'>Pedidono (mês)</CardTitle>
        <Utensils className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='space-y-1'>
        {MothOrdersAmountFn ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>{MothOrdersAmountFn.amount.toLocaleString('pt-BR')}</span>
            <p className='text-xs text-muted-foreground'>
                  {MothOrdersAmountFn.diffFromLastMonth >= 0 ? (
                      <span className="text-emerald-500 dark:text-emerald-400">+{MothOrdersAmountFn.diffFromLastMonth}% em relação ao mês passado</span>
                  ): (
                    <span className="text-rose-500 dark:text-rose-500">-{MothOrdersAmountFn.diffFromLastMonth}% em relação ao mês passado</span>
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

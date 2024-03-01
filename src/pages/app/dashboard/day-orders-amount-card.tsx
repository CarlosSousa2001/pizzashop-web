import { getDayOrdersAmount } from "@/api/get-day-order-amount"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { DollarSign, Utensils } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"

export function DaysOrdersAmount() {

  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount
  })
  return (
    <Card>
    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-base font-semibold'>Receita (dia)</CardTitle>
      <Utensils className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent className='space-y-1'>
    {dayOrdersAmount ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>{dayOrdersAmount.amount.toLocaleString('pt-BR')}</span>
            <p className='text-xs text-muted-foreground'>
                  {dayOrdersAmount.diffFromYesterday > 0 ? (
                      <span className="text-emerald-500 dark:text-emerald-400">+{dayOrdersAmount.diffFromYesterday}% em relação a ontem</span>
                  ): (
                    <span className="text-rose-500 dark:text-rose-500">-{dayOrdersAmount.diffFromYesterday}% em relação a ontem</span>
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

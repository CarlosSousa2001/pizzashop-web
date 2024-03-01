import { getMonthRevenue } from "@/api/get-month-revenue"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { DollarSign } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"

export function MouthRevenueCard() {

  const { data: MonthRevenueFn } = useQuery({
    queryKey: ['metrics', 'month-cancel-amount'],
    queryFn: getMonthRevenue
  })
  return (
    <Card>
    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-base font-semibold'>Receita total no (mês)</CardTitle>
      <DollarSign className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent className='space-y-1'>
    {MonthRevenueFn ? (
          <>
            <span className='text-2xl font-bold tracking-tight'>{(MonthRevenueFn.receipt / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
            <p className='text-xs text-muted-foreground'>
                  {MonthRevenueFn.diffFromLastMonth >= 0 ? (
                      <span className="text-emerald-500 dark:text-emerald-400">+{MonthRevenueFn.diffFromLastMonth}% em relação ao mês passado</span>
                  ): (
                    <span className="text-rose-500 dark:text-rose-500">+{MonthRevenueFn.diffFromLastMonth}% em relação ao mês passado</span>
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

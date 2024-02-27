import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Utensils } from "lucide-react"

export function MouthOrdersAmountCard() {
  return (
    <Card>
    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-base font-semibold'>Pedidono (mês)</CardTitle>
      <Utensils className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent className='space-y-1'>
      <span className='text-2xl font-bold tracking-tight'>246</span>
      <p className='text-xs text-muted-foreground'>
        <span className='text-emerald-500 dark:text-emerald-400'>+6% em relação ao mês passado</span>
      </p>
    </CardContent>
  </Card>
  )
}

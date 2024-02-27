import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export function MothCanceledOrdersAmount() {
  return (
    <Card>
    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-base font-semibold'>Cancelamentos no (mês)</CardTitle>
      <DollarSign className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent className='space-y-1'>
      <span className='text-2xl font-bold tracking-tight'>32</span>
      <p className='text-xs text-muted-foreground'>
        <span className='text-emerald-500-500 dark:text-emerald-400'>-2% em relação ao mês passado</span>
      </p>
    </CardContent>
  </Card>
  )
}

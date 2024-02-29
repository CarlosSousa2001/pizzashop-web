import { Button } from "@/components/ui/button"
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, Currency, Search, X } from "lucide-react"
import { OrderDetails } from "./order-details"
import { OrderStatus } from "@/components/order-status"
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'

export interface OrderTableRowPros {
  order:{
    orderId: string,
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered',
    customerName: string,
    total:number
  }
}


export function OrderTableRow({order}: OrderTableRowPros) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size='xs'>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
            <OrderDetails/>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {locale: ptBR, addSuffix: true})}
      </TableCell>
      <TableCell>
         <OrderStatus status={order.status}/>
      </TableCell>

      <TableCell className="font-medium ">{order.customerName}</TableCell>
      <TableCell className="font-medium">{order.total.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</TableCell>
      <TableCell>
        <Button variant='outline' size="xs">
          <ArrowRight className="h-3 w-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant='ghost' size="xs">
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

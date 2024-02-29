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
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "@/api/cancel-order"
import { GetOrdersResponse } from "@/api/get-orders"

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
  // transformando o dialog em em componente controlado: motivo esta no comentario do componente order-details
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient();
  // estou percorrendo todas minhas listas que estao em cache, e quando ele encontrar o item com o id que foi enviado ele vai alterar os status
  const {mutateAsync: cancelOrderFn} = useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, {orderId}){
          const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders']
          })
          ordersListCache.forEach(([cacheKey, cacheData])=>{
              if(!cacheData){
                    return;
              }
              queryClient.setQueryData<GetOrdersResponse>(cacheKey,{
                ...cacheData,
                orders: cacheData.orders.map((order) => {
                  if(order.orderId === orderId){
                      return {...order, status:'canceled'}
                  }
                  return order
                })
              })
          })
      }
  })
   
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size='xs'>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
            <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
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
      <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</TableCell>
      <TableCell>
        <Button variant='outline' size="xs">
          <ArrowRight className="h-3 w-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={()=> cancelOrderFn({orderId:order.orderId})} disabled={!['pending', 'processing'].includes(order.status)} variant='ghost' size="xs">
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

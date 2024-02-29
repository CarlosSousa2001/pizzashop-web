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
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "@/api/cancel-order"
import { GetOrdersResponse } from "@/api/get-orders"
import { approveOrder } from "@/api/approve-order"
import { deliverOrder } from "@/api/deliver-order"
import { dispatchOrder } from "@/api/dispatch-order"

export interface OrderTableRowPros {
  order: {
    orderId: string,
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered',
    customerName: string,
    total: number
  }
}


export function OrderTableRow({ order }: OrderTableRowPros) {
  // transformando o dialog em em componente controlado: motivo esta no comentario do componente order-details
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders']
    })
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        })
      })
    })
  }
  // estou percorrendo todas minhas listas que estao em cache, e quando ele encontrar o item com o id que foi enviado ele vai alterar os status
  const { mutateAsync: cancelOrderFn, isPending: isCacelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    }
  })

  const { mutateAsync: approveOrderFn, isPending: isApproveOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    }
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliverOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    }
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
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
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, { locale: ptBR, addSuffix: true })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium ">{order.customerName}</TableCell>
      <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApproveOrder}
            variant='outline' size="xs">
            <ArrowRight className="h-3 w-3 mr-2" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchOrder}
            variant='outline' size="xs">
            <ArrowRight className="h-3 w-3 mr-2" />
            Em entrega
          </Button>
        )}
           {order.status === 'delivering' && (
          <Button onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliverOrder}
            variant='outline' size="xs">
            <ArrowRight className="h-3 w-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={!['pending', 'processing'].includes(order.status) || isCacelingOrder} variant='ghost' size="xs">
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

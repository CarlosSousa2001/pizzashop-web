import { getOrderDetails } from "@/api/get-order-details"
import { getOrders } from "@/api/get-orders"
import { OrderStatus } from "@/components/order-status"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open
  })

  return (
    // esse dialog no radix tem um problema = mesmo que ele nao apareça na tela ele esta sendo rederizado, ou seja esta sendo feitas requisições o tempo todo
    // Como resolver => transformar esse cara em um componente controlado
    // passo dois: no useQuery usar o enables com o state open, entao quando o modal for aberto e o state for true a função sera executada
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>
      {order && (
        <div className="space-y-6">
          <Table>
            <TableBody>

              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <OrderStatus status={order.status} />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">{order.customer.name}</span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Telefone</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">{order.customer.phone ?? 'Não informado'}</span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">{order.customer.email}</span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Realizado há</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">
                      {formatDistanceToNow(order.createdAt, {
                        locale: ptBR,
                        addSuffix: true
                      })}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>P{item.product.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{(item.priceInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell className="text-right">{((item.priceInCents * item.quantity) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.totalInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}

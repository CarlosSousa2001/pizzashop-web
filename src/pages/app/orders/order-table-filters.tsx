import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional()
})

type OrderFilterData = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {

  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')


  const { register, handleSubmit, control, reset } = useForm<OrderFilterData>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all'
    }
  })

  function handleFilter({ orderId, customerName, status }: OrderFilterData) {
    setSearchParams(state => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }
      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }
      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }
      // estou retornando pra página 1 por que a quantidade de itens retornados vai mudar de acordo com o filtro
      state.set('page', '1')

      return state;
    })
    reset({
      orderId: '',
      customerName: '',
      status: ''
    })
  }

  function handleClearFilters(){
      setSearchParams(state => {
        state.delete('orderId')
        state.delete('customerName')
        state.delete('status')

        state.set('page', '1')

        return state;
      })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" {...register('orderId')} />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register('customerName')} />
      {/* Esse select que vem do radix não é um elemento html nativo, por isso que preciso capturar os dados usando o control */}
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )
        }}
      >
      </Controller>
      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4 mr-2" />
        Filtrar Resultado
      </Button>

      <Button onClick={()=> handleClearFilters()} type="button" variant="outline" size="xs">
        <X className="h-4 w-4 mr-2" />
        Remover filtros
      </Button>
    </form>
  )
}
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


export function Orders() {

  const [searchParams, setSearchParams] = useSearchParams()

  // preciso remover 1 de cada index, ja que eu preciso começar o listagem de 1 e nao do zero
  // preciso fazer isso pois o usuário nao sabe que o array começa em zero
  const pageIndex = z.coerce.number()
  .transform(page => page - 1)
  .parse(searchParams.get('page') ?? '1')

  // eu preciso usar uma chave nessa queryKey dinamica, pois o reactquery nao roda a mesma requsição se foi feita uma anterior e os dados existam em cache
  // 
  const { data: result} = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({pageIndex})
  })

  // estou "criando" essa chave 'page' pra dizer qual params estou manipulando
function handlePadination(pageIndex:number){
  setSearchParams(state => {
    state.set('page', (pageIndex + 1).toString())

    return state
  })
}
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {result && result.orders.map(order => (
                   <OrderTableRow key={order.orderId} order={order} />
              ))}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination onPageChange={handlePadination} pageIndex={result.meta.pageIndex} totalCount={result.meta.totalCount} perPage={result.meta.perPage}/>
          )}
        </div>
      </div>
    </>
  )
}

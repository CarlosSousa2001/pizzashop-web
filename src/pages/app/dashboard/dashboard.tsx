import { Helmet } from 'react-helmet-async'

import { MouthRevenueCard } from './month-revenue-car'
import { MouthOrdersAmountCard } from './moth-orders-amount-card'
import { DaysOrdersAmount } from './day-orders-amount-card'
import { MothCanceledOrdersAmount } from './month-canceled-orders-amount.-card'
import { RevenueChart } from './revenue-chart'
import { PopularProducts } from './popular-products-chart'
export function Dashboard() {
  return (
    <>
      <Helmet title='Dashboard' />
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>

        <div className='grid grid-cols-4 gap-4'>
          <MouthRevenueCard />
          <MouthOrdersAmountCard />
          <DaysOrdersAmount />
          <MothCanceledOrdersAmount />
        </div>

        <div className='grid grid-cols-9 gap-4'>
            <RevenueChart/>
            <PopularProducts/>
        </div>
      </div>
    </>
  )
}
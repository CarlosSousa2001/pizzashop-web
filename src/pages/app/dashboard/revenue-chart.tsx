import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import colors from 'tailwindcss/colors'
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenuePeriod } from "@/api/get-daily-revenue-in-period";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {subDays} from 'date-fns'

export function RevenueChart() {

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from:subDays(new Date(), 7),
    to: new Date() 
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () => getDailyRevenuePeriod({
      from: dateRange?.from,
      to: dateRange?.to
    })
  })

  const chartData = useMemo(()=>{
      return dailyRevenueInPeriod?.map(item => {
        return {
          date: item.date,
          receipt:item.receipt / 100
        }
      })
  },[dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-centergap-3">
        <Label>Período</Label>
        <DatePickerWithRange date={dateRange} onDateChange={setDateRange}/>
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis stroke="#888" axisLine={false} tickLine={false} tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
              <Line type="linear" strokeWidth={2} dataKey="receipt" stroke={colors.violet['500']} />
              <CartesianGrid vertical={false} className="stroke-muted" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

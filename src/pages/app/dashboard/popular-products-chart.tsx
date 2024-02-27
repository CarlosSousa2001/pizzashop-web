import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import colors from 'tailwindcss/colors'
import {ResponsiveContainer, PieChart, XAxis, YAxis, CartesianGrid, Pie, Cell,} from 'recharts'
import { BarChart } from "lucide-react";
export function PopularProducts() {

  const data = [
    {products: 'Pepperonu', amount:40},
    {products: 'Mussarela', amount:23},
    {products: 'Quatro queijos', amount:70},
    {products: 'Portuguesa', amount:20},
    {products: 'Frango', amount:50},,
  ]

  const COLORS = [
    colors.sky[500], colors.amber[500], colors.violet[500], colors.emerald[500],colors.rose[500],
  ]

  return (
    <Card className="col-span-3">
      <CardHeader className=" pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground"/>
        </div>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart data={data} style={{fontSize:12}}>
          <Pie data={data} dataKey="amount" name="roducts" cx="50%" cy="50%" 
          outerRadius={86} 
          innerRadius={64}
          strokeWidth={8}
          fill={colors.emerald['500']}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180
            const radius = 12 + innerRadius + (outerRadius - innerRadius)
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)
          
            return (
              <text
                x={x}
                y={y}
                className="fill-muted-foreground text-xs"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {data[index]?.products.substring(0, 12).concat('...')}(
                  {value})
              </text>
            )
          }}
          >
            {data.map((_, index)=>(
              <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover: opacity-80" />
            ))}
          </Pie>     
        </PieChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from "@/components/ui/progress"

import React from 'react'

interface Props{
    type : String
    formatter: Intl.NumberFormat
    data : GetCategoriesStatsResponseType
}
const CategoriesCard = ({formatter , type , data} : Props) => {
    const filtereData = data.filter((ele)=> ele.type === type)
    const total = filtereData.reduce(
        (acc , ele) => acc + (ele._sum?.amount || 0),
        0
    )
  return (
    <Card className=" h-80 w-full">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type} by category
        </CardTitle>

        <div className="flex items-center justify-between gap-2">
          {filtereData.length === 0 && (
            <div className="flex h-60 w-full flex-col items-center justify-center">
              No data for this selection period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or try adding new{" "}
                {type === "income" ? "Incomes" : "Expenses"}
              </p>
            </div>
          )}

          {filtereData.length > 0 && (
            <ScrollArea className="h-60 w-full px-4">
                <div className="flex flex-col w-full gap-4 p-4">
                    {filtereData.map((item) => {
                        const amount = item._sum.amount || 0
                        const percentage = (amount * 100) / (total || amount)
                        return (
                            <div key={item.category} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-400 ">{item.categoryIcon} {item.category}
                                    <span className="text-xs ml-2 text-muted-foreground ">({percentage.toFixed(0)}%)</span>
                                    </span>
                                    <span className="text-sm text-muted-foreground ">
                                        {formatter.format(amount)}
                                    </span>
                                </div>

                                <Progress value={percentage} 
                                indicator={
                                    type === "income"? "bg-emerald-500" : "bg-red-500"
                                } 
                                />


                            </div>

                        )
                    })}
                </div>
              
              
            </ScrollArea>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export default CategoriesCard
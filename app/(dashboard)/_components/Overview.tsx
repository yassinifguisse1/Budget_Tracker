"use client"
import React, { useState } from 'react'
import {UserSettings} from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { toast } from 'sonner';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import StatsCards from './StatsCards';
import CategoriesStats from './CategoriesStats';

interface Props{
  userSettings: UserSettings
 
}
const Overview = ({userSettings } : Props) => {
  const [dateRange , setDateRange]= useState<{from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })
    return (
    <>
    <div className="container flex items-center flex-wrap justify-between gap-2 py-6">
        <h2 className='text-3xl font-bold'>Overview</h2>
        <div className="flex items-center gap-2">
            <DateRangePicker 
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare = {false}
            onUpdate={(values)=>{
                const {from , to} = values.range
                if(!from || !to) return
                if(differenceInDays(to , from ) > MAX_DATE_RANGE_DAYS){
                    toast.error(
                        `the Selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
                    )
                    return;
                }
                setDateRange({from , to})
            }}
            
            />
        </div>
    </div>
    <div className='container flex flex-col w-full gap-2'>
    <StatsCards 
    userSettings={userSettings}
    from={dateRange.from}
    to={dateRange.to}
    /> 
    <CategoriesStats 
    userSettings={userSettings}
    from={dateRange.from}
    to={dateRange.to}/>
    

    </div>
  
    </>
  )
}

export default Overview
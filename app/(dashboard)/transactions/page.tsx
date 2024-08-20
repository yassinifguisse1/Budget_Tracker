"use client"
import React, { useState }  from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { differenceInDays, startOfMonth } from 'date-fns';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { toast } from 'sonner';
import TransactionTable from './_components/TransactionTable';



const TransactionsPage = () => {
  const [dateRange , setDateRange]= useState<{from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })  

  return (
   <>
    <div className="border-b bg-card">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <div>
          <p className="text-3xl font-bold">Transactions history</p>
        </div>
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `the Selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
      </div>
    </div>
    <div className="container">
      <TransactionTable from={dateRange.from} to={dateRange.to}/>

    </div>
   </>
  );
}

export default TransactionsPage
"use client"
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { DateToUTCDate, GetFormmatterForCurrency } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import CategoriesCard from './CategoriesCard'
import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route'

interface Props{
    userSettings:UserSettings
    from: Date
    to: Date
}
const CategoriesStats = ({userSettings , from , to}:Props) => {

  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });
  const formatter = useMemo(() => {
    return GetFormmatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  return (
    <div className=' first-letter: flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={statsQuery.isFetching} >
        <CategoriesCard 
          formatter={formatter}
          type="income"
          data={statsQuery.data || []}

        />
            
        </SkeletonWrapper  >
        <SkeletonWrapper isLoading={statsQuery.isFetching} >
        <CategoriesCard 
          formatter={formatter}
          type="expense"
          data={statsQuery.data || []} 
        />
            
        </SkeletonWrapper  >
        

        
    </div>
  )
}

export default CategoriesStats
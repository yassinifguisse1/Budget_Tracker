import React, { ReactNode } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from '@/lib/utils'

type SkeletonWrapperType = {
    children : ReactNode,
    isLoading: boolean,
    fullWith?: boolean
}

const SkeletonWrapper = (
    {children , 
    isLoading , 
    fullWith = true}:
    SkeletonWrapperType
    ) => {
    if(!isLoading) return children

  return (
      <Skeleton className={
        cn(fullWith && 'w-full')} >
      <div className=" opacity-0">
        {children}
      </div>
     </Skeleton>
    )
}

export default SkeletonWrapper
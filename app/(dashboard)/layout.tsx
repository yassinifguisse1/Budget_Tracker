import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const layout = ({children}:{children : ReactNode}) => {
  return (
    <div className='relative flex h-screen flex-col '>
        <Navbar/>     
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}

export default layout
import { PiggyBank } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className='flex items-center gap-2 '>
        <PiggyBank className='stronk h-11 w-11 stroke-amber-500 stroke-[1.5] hidden md:block'/>
        <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent leading-tight tracking-tighter">
            BudgetTracker
        </p>
    </Link>
  )
}

export default Logo

"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CreateTransactionDialig from "./_components/CreateTransactionDialig";
import Overview from "./_components/Overview";


const page = async () => {
  const user = await currentUser();
  if(!user){
    redirect('/sign-in')
  }
  const userSettings = await prisma.userSettings.findUnique(
    {
      where: {
        userId: user.id,
        },
    }
  )
  if(!userSettings){
    redirect('/wizard')
  }


  return (
    <div className="h-full bg-background">
      {/* start first part card */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className=" font-bold text-3xl">Hello <span className=" font-bold ml-1">{user?.firstName}! 👋</span></p>
          <div className="flex justify-center items-center gap-2">
            <CreateTransactionDialig 
            trigger={<Button variant={"outline"} className='border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white'>New income 🤑</Button>} 
            type="income"/>

            <CreateTransactionDialig 
            trigger={
            <Button variant={"outline"} className='border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white'>
              New expense 😤
              </Button>} 
            type="expense"/>
          </div>
        </div>
      </div>
      {/* end first part card */}

      {/* start secound part overveiw */}

      <Overview userSettings={userSettings}/>
    </div>
  )
}

export default page
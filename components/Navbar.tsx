'use client'
import React, { useState } from 'react'
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { UserButton } from '@clerk/nextjs';
import {ThemeSwitcherBtn} from './ThemeSwitcherBtn';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';


type NavbarItemType = {
  labe : string,
  link : string,
  clickCallback?: ()=> void;
}
const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
const items = [
  {labe : "Dashboard" , link : "/"},
  {labe : "Transactions" , link : "/transactions"},
  {labe : "Manage" , link : "/manage"},
]

function DesktopNavbar(){
  return(
    <div className='hidden broder-separate border-b bg-background md:block'>
      <nav className='container flex items-center justify-between px-8'>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
            <Logo/>
            <div className='flex h-full'>
              {items.map((item)=>(
                <NavbarItem key={item.labe} labe={item.labe} link = {item.link}/>
              ))}

            </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl='/sign-in'/>
        </div>
      </nav>
    </div>
  )
}

function NavbarItem({labe , link , clickCallback} : NavbarItemType){
  const pathname = usePathname()
  const isActive = pathname === link;
  return(
    <div className='relative flex items-center'>
      <Link href={link} className={cn(buttonVariants({
        variant:"ghost"}),
        "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
        isActive && "text-foreground"
       )} 
       onClick={()=>{
        if(clickCallback)
          {
            clickCallback()
            }
       }}
       >
      {labe}
      </Link>
      {isActive && <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>}
    </div>
  )

}

function MobileNavbar(){
  const [isOpen , setIsOpen] = useState(false)
 
  return (
    <div className="md:hidden block border-separate bg-background">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
            {items.map((item) => (
                  <NavbarItem key={item.labe} labe={item.labe} link={item.link} clickCallback={()=>{setIsOpen(prev => !prev)}}/>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
          <Logo />
        </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcherBtn />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        
      </nav>
    </div>
  );


}
export default Navbar


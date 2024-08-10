'use client'

import { TransactionType } from "@/lib/types"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { 
  Command ,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import CreateCtegoryDialog from "./CreateCtegoryDialog"

interface Props {
    type : TransactionType
}
const CategoryPicker = ({type}:Props) => {
  const [open,setOpen]= React.useState(false)
  const [value , setValue] = React.useState("")

    const categoriesQuery = useQuery<Category[]>({
        queryKey: ['categories' , type],
        queryFn: ()=>
          fetch(`/api/categories?type=${type}`).then(res => {
            if (!res.ok) {
              throw new Error('Failed to fetch categories');
            }
            return res.json();
          }),
        initialData: [],
    })
    const selectCategory = categoriesQuery.data?.find(
      (category: Category) => category.name === value
    )
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {
          selectCategory ?(<CategoryRow category={selectCategory}/>):('Select Category')
          }

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command onSubmit={e=>{
          e.preventDefault()
        }}>
            <CommandInput placeholder="search category... " />
            <CreateCtegoryDialog type={type}/>
            <CommandEmpty>
              <p>Category not found</p>
              <p className="text-xs text-muted-foreground">
                Tip: Create nex category
              </p>
            </CommandEmpty>
            <CommandGroup>
              <CommandList>
                {
                  categoriesQuery.data &&
                  categoriesQuery.data.map((category: Category) => (
                    <CommandItem key={category.name} 
                    onSelect={(currentValue)=>{
                      setValue(currentValue)
                      setOpen((prev) => !prev)
                      }}>
                        <CategoryRow category={category} />

                    </CommandItem>
                  ))
                }
              </CommandList>
            </CommandGroup>

        </Command>
      </PopoverContent>

    </Popover>
  );
}

export default CategoryPicker

function CategoryRow ({category}:{category : Category}){
  return(
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )

}
/* eslint-disable react/no-unescaped-entities */
"use client"

import { ReactNode } from "react"
import {TransactionType} from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FormProvider, useForm } from "react-hook-form"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction"
import {zodResolver} from '@hookform/resolvers/zod'
import { FormLabel,FormControl,FormField,FormItem } from "@/components/ui/form"
import CategoryPicker from "./CategoryPicker"

interface Props {
    trigger : ReactNode
    type : TransactionType
}   


const CreateTransactionDialig = ({trigger , type} : Props) => {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues:{
            type,
            date: new Date(),
        }
    })
    

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Create a new{" "}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>{" "}
            transaction
          </DialogTitle>
          <DialogDescription>
            Make sure to Create a new{" "}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>{" "}
            transaction here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <DialogDescription>
                    Transaction description (optional)
                  </DialogDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <DialogDescription>
                    Transaction amount (required)
                  </DialogDescription>
                </FormItem>
              )}
            />


            <div className="flex item-center justify-between gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div>
                      <FormLabel>Category</FormLabel>
                  </div>
                  <FormControl>
                    <CategoryPicker type={type}  />
                  </FormControl>
                  <DialogDescription>
                    Select Category for this Transaction
                  </DialogDescription>
                </FormItem>
              )}
            />
            

            </div>
          </form>

        </FormProvider>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransactionDialig
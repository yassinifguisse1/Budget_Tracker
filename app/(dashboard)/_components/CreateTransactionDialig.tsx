/* eslint-disable react/no-unescaped-entities */
"use client"

import { ReactNode, useCallback, useState } from "react"
import {TransactionType} from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { FormLabel,FormControl,FormField,FormItem, FormMessage } from "@/components/ui/form"
import CategoryPicker from "./CategoryPicker"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CreateTransaction } from "../_actions/transaction"
import { DateToUTCDate } from "@/lib/helpers"




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
    const [open , setOpen] = useState(false)
    const handleCategoryChange = useCallback(
      (value : string)=>{
        form.setValue('category', value)
      },[form])

      const queryClient = useQueryClient()

      const {mutate,isPending}=useMutation({
        mutationFn: CreateTransaction,
        onSuccess: () => {
          toast.success("Transaction created successfully 👏" , {
            id: 'create-transaction'
          });
          form.reset({
            type,
            description:'',
            amount:0,
            date:new Date(),
            category:undefined,
          });
          // after creating a transaction we need to invalidate the overview query which will refetch data in the homepage

          queryClient.invalidateQueries({
            queryKey: ['overview'],
          })
          setOpen((prev) => !prev)
        }
      })
      const onSubmit= useCallback(
        (value:CreateTransactionSchemaType)=>{
          toast.loading("Creating transaction...", {
            id:"create-transaction"
          })
          mutate({
            ...value ,
            date: DateToUTCDate(value.date)
          })
    
        },[mutate])
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
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
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
              render={({ field, fieldState  }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <DialogDescription>
                    Transaction amount (required)
                  </DialogDescription>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex item-center justify-between gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field , fieldState }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        type={type}
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <DialogDescription>
                      Select Category for this Transaction
                    </DialogDescription>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Transaction date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[220px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            fieldState.error && "border-red-500" // Add border-red-500 if there's an error
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(value) => {
                            if (!value) return;
                            field.onChange(value);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <DialogDescription>
                      Select a date for this Transaction
                    </DialogDescription>
                    {/* <FormMessage /> */}
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransactionDialig
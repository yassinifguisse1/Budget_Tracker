import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import React, { useCallback } from 'react'
import { Form, useForm } from 'react-hook-form';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategory } from '../_actions/categories';
import { Category } from '@prisma/client';
import { toast } from 'sonner';
import { isPagesAPIRouteMatch } from 'next/dist/server/future/route-matches/pages-api-route-match';





interface Props{
    type:TransactionType
}
const CreateCtegoryDialog = ({type}:Props) => {
    const [open, setOpen] = React.useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver:zodResolver(CreateCategorySchema),
        defaultValues:{
            type,
        }
    })
    const queryClient = useQueryClient()

    const {mutate , isPending}= useMutation({
      mutationFn:CreateCategory,
      onSuccess: async (data:Category)=>{
        form.reset({
          name:"",
          icon:"",
          type,
        })
        toast.success(`Category ${data.name} created seccessfully`,{
          id:"create-category"
        })
        await queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        setOpen((prev)=>(!prev))
      },
      onError:()=>{
        toast.error(`Failed to create category`,{
          id:"create-category"
          })
      }
    })
    const onSubmit= useCallback(
    (value:CreateCategorySchemaType)=>{
      toast.loading("Creating category...", {
        id:"create-category"
      })
      mutate(value)

    },[mutate])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          create new
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>
            Create{" "}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>{" "}
            category
          </DialogTitle>
          <DialogDescription>
            Category are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.name?.message}
                    </p>
                  )}
                  <DialogDescription>
                    Transaction description (optional)
                  </DialogDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Change to select
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff className="h-[48px] w-[48px]" />
                              <p className="text-xs text-muted-foreground">
                                Click to select
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {form.formState.errors.icon && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.icon?.message}
                    </p>
                  )}
                  <DialogDescription>
                    This is how your category will apear in the app
                  </DialogDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

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

export default CreateCtegoryDialog
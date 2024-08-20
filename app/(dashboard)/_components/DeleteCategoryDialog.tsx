"use client"
import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode} from 'react'
import { toast } from 'sonner'
import { DeleteCategory } from '../_actions/categories'
import { AlertDialog , AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger,AlertDialogHeader, AlertDialogFooter, AlertDialogCancel,AlertDialogAction, AlertDialogContent } from '@/components/ui/alert-dialog'
import { TransactionType } from '@/lib/types'

interface Props{
    trigger : ReactNode
    category: Category

}
const DeleteCategoryDialog = ({trigger , category}: Props) => {
    const categoryIdentifier = `${category.name}-${category.type}`;
    const queryClient = useQueryClient()
    const deleteMutation =useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async ()=>{
            toast.success("Category deleted seccessfuly",{
                id:categoryIdentifier
            }),
            await queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        },
        onError: () => {
            toast.error("Failed to delete category", {
                id: categoryIdentifier
            })
        }
         
    })
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action connot be undone. This will permanently delete your
            category
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting category...", {
                id: categoryIdentifier,
              });
              deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryDialog
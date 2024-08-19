import { z } from "zod";

export const CreateCategorySchema=z.object({
  name: z.string().min(1, "Name is required").max(20, "Name must be 20 characters or less"),
  icon: z.string().min(1, "Icon is required").max(30),
  type: z.enum(["income", "expense"]),
})
export type CreateCategorySchemaType=z.infer<typeof CreateCategorySchema>;

export const DeleteCategorySchema =z.object({
  name: z.string().min(1, "Name is required").max(20, "Name must be 20 characters or less"),
  type: z.enum(["income", "expense"]),
});
export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
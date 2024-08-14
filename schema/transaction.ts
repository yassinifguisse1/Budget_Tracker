import { z } from "zod";

export const CreateTransactionSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a valid number." })
    .positive("Amount must be greater than zero.")
    .multipleOf(0.01, "Amount must be a valid decimal number."),
  description: z.string().optional(),
  date: z.coerce.date({
    required_error: "Please select a date for the transaction.",
    invalid_type_error: "Invalid date format. Please select a valid date.",
  }),
  category: z
    .string({ required_error: "Please select a category." })
    .min(1, "Please select a category."),
  type: z.union([z.literal('income'), z.literal('expense')]),
});

export type CreateTransactionSchemaType = z.infer<typeof CreateTransactionSchema>;

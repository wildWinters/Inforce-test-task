import z from "zod";
export const ProductSchema = z.object({
  imageUrl: z.string().url({ message: "Invalid URL format for image" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  count: z.coerce.number().int().nonnegative({ message: "Count cannot be negative" }),
  size: z.object({
    width: z.coerce.number().int().positive({ message: "Width must be greater than 0" }),
    height: z.coerce.number().int().positive({ message: "Height must be greater than 0" }),
  }),
  warnings: z.array(z.string()).optional(),
});
export type Product = z.infer<typeof ProductSchema>;
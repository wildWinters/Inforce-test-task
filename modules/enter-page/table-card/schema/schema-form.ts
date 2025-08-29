import { z } from "zod";
 
 
export const schemaCard = z.object({ 
  imageUrl: z.string().url({ message: "invalid url format for image is not https" }),
  name: z.string().min(1, "minimum symbols is 1 ").max(255, "max symbols is 255"),
  count: z.coerce.number().min(1, "minimum count of product is one").max(200, "max count is 200"),
  size: z.object({
    width: z.coerce.number().min(1, "minimum width of product is one").max(200, "max width is 200"),
    height: z.coerce.number().min(1, "minimum height of product is one").max(200, "max height is 200"),
  }),
  weight: z.coerce.number().min(1, "minimum weight of product is one").max(200, "max weight is 200").optional(),
});
 
export type SchemaFormCardType = z.infer<typeof schemaCard>;

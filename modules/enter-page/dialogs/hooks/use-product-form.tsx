import { Product } from "../schema/product-schema";
import { ProductSchema } from "../schema/product-schema";
import { useForm,} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

export function useProductForm() {
  return useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: "",
      imageUrl: "",
      name: "",
      count: 0,
      size: { width: 1, height: 1 },
      warnings: [],
    },
    mode: "onChange",
  });
}

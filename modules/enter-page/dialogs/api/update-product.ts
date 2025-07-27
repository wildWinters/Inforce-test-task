import { Product } from "../schema/product-schema";
import { kyInstance } from "@/shared/lib/ky";

export async function updateProduct(data: Product) {
  return kyInstance.put(`products/${data.id}`, { json: data }).json<Product>();
}

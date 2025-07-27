import { Product } from "../schema/product-schema";
import { kyInstance } from "@/shared/lib/ky";

export async function createProduct(data: Product) {
  return kyInstance.post("products", { json: data }).json<Product>();
}
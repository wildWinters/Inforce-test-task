import { type InfetSchema } from "../schema/product-schema";
import { kyInstance } from "@/shared/lib/ky";

export async function createProduct(data: InfetSchema) {
  return kyInstance.post("products", { json: data }).json<InfetSchema>();
}
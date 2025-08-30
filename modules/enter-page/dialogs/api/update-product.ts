import { type InfetSchema } from "../schema/product-schema";
import { kyInstance } from "@/shared/lib/ky";

// Send partial updates. Pass the product id and only the fields you want to update
export async function updateProduct(
  id: string,
  updates: Partial<InfetSchema> & { size?: Partial<InfetSchema["size"]> }
) {
  return kyInstance
    .patch(`products/${id}`, { json: updates })
    .json<InfetSchema>();
}

import { type InfetSchema } from '../schema/product-schema';
import { kyInstance } from '@/shared/lib/ky';

export async function updateProduct(
  id: string,
  updates: Partial<InfetSchema> & { size?: Partial<InfetSchema['size']> }
): Promise<InfetSchema> {
  return kyInstance
    .patch(`products/${id}`, { json: updates })
    .json<InfetSchema>();
}

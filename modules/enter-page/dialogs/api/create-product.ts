
import { InfetSchema } from '../schema/product-schema';
import { kyInstance } from '@/shared/lib/ky';

export async function createProduct(data: InfetSchema) {
  try {
    const response = await kyInstance
      .post('products', { json: data })
      .json<InfetSchema>();
       
    return response;
  } catch (error) {
    console.error('POST /products failed', error);
    throw error;
  }
}

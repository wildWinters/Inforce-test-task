import { useEffect, useState } from 'react';
import { useProductForm } from './use-product-form-hook';
import { kyInstance } from '@/shared/lib/ky';
import { InfetSchema } from '../schema/product-schema';
import { createProduct } from '../api/create-product';
import { updateProduct } from '../api/update-product';

export function useProductCardForm(productId?: string) {
  const form = useProductForm();
  const { reset, setError, handleSubmit, control, formState } = form;

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!productId) return;

    setIsFetching(true);
    kyInstance
      .get(`products/${productId}`)
      .json<InfetSchema>()
      .then((product) => reset(product))
      .catch(() => setError('root', { message: 'Продукт не знайдено' }))
      .finally(() => setIsFetching(false));
  }, [productId, reset, setError]);

  const onSubmit = handleSubmit(async (data: InfetSchema) => {
    setIsSaving(true);
    try {
      if (productId) {
        const updated = await updateProduct(productId, data);
        reset(updated);
      } else {
        const created = await createProduct(data);
        reset(created);
      }
    } catch (error) {
      console.error('error on saving', error);
    } finally {
      setIsSaving(false);
    }
  });

  return {
    form,
    control,
    formState,
    onSubmit,
    reset,
    isFetching,
    isSaving,
  };
}

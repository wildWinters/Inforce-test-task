import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kyInstance } from '@/shared/lib/ky';
import { z } from 'zod';
import { schemaCard, InfetSchema } from '../schema/product-schema';

export function useContetDialogCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfetSchema>({
    resolver: zodResolver(schemaCard),
    mode: 'onSubmit',
    defaultValues: {
      imageUrl: '',
      name: '',
      count: 0,
      size: { width: 0, height: 0 },
      weight: 2,
    },
  });

  const handlePostGredients = async (data: InfetSchema) => {
    try {
      await kyInstance.post('products', {
        json: {
          imageUrl: data.imageUrl,
          name: data.name,
          count: data.count,
          size: {
            width: data.size.width,
            height: data.size.height,
          },
          weight: data.weight,
        },
      });
    } catch (e) {
      console.error('POST /products failed', e);
    }
  };

  const submit = async (data: InfetSchema) =>
    await handlePostGredients(data);

  const getErrorMessage = (path: string) => {
    const parts = path.split('.');
    let node: any = errors;
    for (const p of parts) node = node?.[p];
    return node?.message as string | undefined;
  };

  return {
    register,
    handleSubmit,
    submit,
    getErrorMessage,
    errors,
  };
}

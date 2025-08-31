import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaCard, type InfetSchema } from '../schema/product-schema';

export function useProductForm() {
  return useForm<InfetSchema>({
    resolver: zodResolver(schemaCard),
    defaultValues: {
      imageUrl: '',
      name: '',
      count: 0,
      size: { width: 1, height: 1 },
      weight: 1,
    },
    mode: 'onChange',
  });
}

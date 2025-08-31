'use client';

import { Button } from '@/shared/shad-cn/button';
import { Input } from '@/shared/shad-cn/input';
import { fields } from '../mock/mock-dileds-card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { kyInstance } from '@/shared/lib/ky';
import { schemaCard } from '../schema/product-schema';

// Використовуємо точний тип форми з Zod
type FormData = z.infer<typeof schemaCard>;

export function ContetDialogCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaCard),
    mode: 'onSubmit',
    defaultValues: {
      imageUrl: '',
      name: '',
      count: 0,
      size: { width: 0, height: 0 },
      weight: 2, // weight обов'язковий
    },
  });

  const handlePostGredients = async (data: FormData) => {
    try {
      await kyInstance.post('products', {
        json: data,
      });
    } catch (e) {
      console.error('POST /products failed', e);
    }
  };

  const submit: SubmitHandler<FormData> = async (data) =>
    await handlePostGredients(data);

  const getErrorMessage = (path: string) => {
    if (path === 'size.width') {
      return errors.size?.width?.message;
    }
    if (path === 'size.height') {
      return errors.size?.height?.message;
    }
    return (errors as any)[path]?.message;
  };

  return (
    <form
      className="flex flex-col gap-[10px]"
      onSubmit={handleSubmit(submit, (err) => console.log('form errors', err))}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <div className="flex gap-[20px] items-center justify-center">
            <label htmlFor={field.name}>{field.label}</label>

            {field.name === 'size.width' ? (
              <Input
                type="number"
                placeholder="Width"
                {...register('size.width', {
                  valueAsNumber: true,
                })}
              />
            ) : field.name === 'size.height' ? (
              <Input
                type="number"
                placeholder="Height"
                {...register('size.height', {
                  valueAsNumber: true,
                })}
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                {...register(field.name as keyof FormData, {
                  valueAsNumber: field.type === 'number',
                })}
              />
            )}
          </div>
          <span className="text-red-500">{getErrorMessage(field.name)}</span>
        </div>
      ))}

      <Button variant="destructive" type="submit">
        Confirm
      </Button>
      <Button type="button">Cancel</Button>
    </form>
  );
}

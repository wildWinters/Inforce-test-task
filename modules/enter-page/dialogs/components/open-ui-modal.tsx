"use client";

import * as React from "react";
import { useForm, useFieldArray, Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardFooter } from "@/shared/shad-cn/card";
import { Button } from "@/shared/shad-cn/button";
import { Input } from "@/components/ui/input";
import { kyInstance } from "@/shared/lib/ky";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { ProductSchema } from "../schema/product-schema";

type Product = z.infer<typeof ProductSchema>;

type SimpleField = {
  name: Path<Product>;
  label: string;
  placeholder?: string;
  type: "text" | "url" | "number";
  description?: string;
};

const fields: SimpleField[] = [
  { name: "id", label: "ID", placeholder: "product-1", type: "text", description: "Унікальний ідентифікатор продукту." },
  { name: "imageUrl", label: "Image URL", placeholder: "https://...", type: "url", description: "Посилання на зображення продукту." },
  { name: "name", label: "Name", placeholder: "Product name", type: "text", description: "Назва продукту." },
  { name: "count", label: "Count", placeholder: "0", type: "number", description: "Кількість на складі." },
  { name: "size.width", label: "Width", placeholder: "1", type: "number", description: "Ширина продукту (> 0)." },
  { name: "size.height", label: "Height", placeholder: "1", type: "number", description: "Висота продукту (> 0)." },
];


async function fetchProduct(id: string): Promise<Product> {
  return kyInstance.get(`products/${id}`).json<Product>();
}

async function createProduct(data: Product): Promise<Product> {
  return kyInstance.post("products", { json: data }).json<Product>();
}

async function updateProduct(data: Product): Promise<Product> {
  return kyInstance.put(`products/${data.id}`, { json: data }).json<Product>();
}

/* ------------ RHF ------------- */
function useProductForm() {
  return useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: "",
      imageUrl: "",
      name: "",
      count: 0,
      size: { width: 1, height: 1 },
      warnings: [],
    },
    mode: "onChange",
  });
}

function FormFieldMapper({ control }: { control: ReturnType<typeof useProductForm>["control"] }) {
  return (
    <>
      {fields.map(({ name, label, placeholder, type, description }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} type={type} placeholder={placeholder} />
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}

function WarningsFieldArray({ control }: { control: ReturnType<typeof useProductForm>["control"] }) {
  const { fields, append, remove } = useFieldArray({ control, name: "warnings" });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel>Warnings</FormLabel>
        <Button type="button" variant="secondary" size="sm" onClick={() => append("")}>
          + Add warning
        </Button>
      </div>

      {!fields.length && <p className="text-xs text-muted-foreground">Попереджень поки що немає.</p>}

      {fields.map((f, index) => (
        <FormField
          key={f.id}
          control={control}
          name={`warnings.${index}` as const}
          render={({ field }) => (
            <FormItem className="flex items-start gap-2">
              <FormControl className="flex-1">
                <Input placeholder={`Warning #${index + 1}`} {...field} />
              </FormControl>
              <Button type="button" variant="ghost" onClick={() => remove(index)}>
                Remove
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}

export default function ProductCardForm({ productId }: { productId?: string }) {
  const form = useProductForm();
  const { handleSubmit, control, reset, formState } = form;
  const queryClient = useQueryClient();

  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: Boolean(productId),
  });

  React.useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      console.log("created", created);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      console.log("updated", updated);
    },
  });

  const onSubmit = (data: Product) => {
    if (productId) updateMutation.mutate(data);
    else createMutation.mutate(data);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full max-w-md h-[520px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-4 space-y-4">
            {isFetching ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <>
                <FormFieldMapper control={control} />
                <WarningsFieldArray control={control} />
              </>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-2 px-4 pb-4">
            <Button
              type="submit"
              className="w-full text-sm py-2"
              disabled={formState.isSubmitting || isSaving}
            >
              {isSaving ? "Saving..." : "Confirm"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full text-sm py-2"
              onClick={() => reset()}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

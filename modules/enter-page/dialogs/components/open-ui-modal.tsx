"use client";

import { Card, CardContent, CardFooter } from "@/shared/shad-cn/card";
import { Button } from "@/shared/shad-cn/button";
import { Input } from "@/shared/shad-cn/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/shad-cn/form";
import { useFieldArray } from "react-hook-form";
import { fields } from "../mock/mock-dileds-card";
import { useProductForm } from "../hooks/use-product-form";
import { useProductCardForm } from "../hooks/use-product-card-form";
import { mockCardFooter } from "../mock/mock-card-foooter";
import * as DialogPrimitive from "@radix-ui/react-dialog"

export function FormFieldMapper({
  control,
}: {
  control: ReturnType<typeof useProductForm>["control"];
}) {
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


function WarningsFieldArray({
  control,
}: {
  control: ReturnType<typeof useProductForm>["control"];
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "warnings" });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel>Warnings</FormLabel>
        <Button type="button" variant="secondary" size="sm" onClick={() => append("")}>
          + Add warning
        </Button>
      </div>

      {!fields.length && (
        <p className="text-xs text-muted-foreground">Попереджень поки що немає.</p>
      )}

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
  const { form, control, formState, onSubmit, reset, isFetching, isSaving } =
    useProductCardForm(productId);

  return (
    <Card className="w-full max-w-md h-[520px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent className="p-4 space-y-4">
            <p className={`text-sm text-muted-foreground ${!isFetching ? "hidden" : ""}`}>
              Loading...
            </p>

            <div className={isFetching ? "pointer-events-none opacity-50" : ""}>
              <FormFieldMapper control={control} />
              <WarningsFieldArray control={control} />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 px-4 pb-4">
            {mockCardFooter.map((footer) => {
              const disabled = footer.disabledStates.some(
                (state) => formState[state as keyof typeof formState] || isSaving || isFetching
              );

              return (
                <DialogPrimitive.Close key={footer.id}> 
                <Button
                  onClick={footer.onClick}
                  type={footer.type as "button" | "submit"} 
                  className={footer.className,"min-w-[250px] mx-[20px]"}
                  variant={footer.variant as any} 
                  disabled={disabled}
                >
                  {footer.loadingLabel && isSaving ? footer.loadingLabel : footer.label}
                </Button>
                </DialogPrimitive.Close>
              );
            })}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

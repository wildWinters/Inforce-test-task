"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/shared/shad-cn/form";
import { Input } from "@/shared/shad-cn/input";
import { Button } from "@/shared/shad-cn/button";
import { useValidationCard } from "../hook/use-validation-card";
import { fields } from "../mock/fields";

export function CardModal() {
  const form = useValidationCard(); // Тепер повний UseFormReturn + onSubmit

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(form.onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any} // підтримка nested полів
            render={({ field: rhfField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input type={field.type} placeholder={field.placeholder} {...rhfField} />
                </FormControl>
                <FormDescription>{field.description || "Enter value"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

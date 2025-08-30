  "use client";
  import { Button } from "@/shared/shad-cn/button";
  import { Input } from "@/shared/shad-cn/input";
  import { fields } from "../mock/mock-dileds-card";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { kyInstance } from "@/shared/lib/ky";
  

  export function ContetDialogCard() {
    const schemacard = z.object({
      imageUrl: z.string().url({ message: "Invalid URL format for image" }),
      name: z
        .string()
        .min(1, "minimum symbols is 1")
        .max(255, "max symbols is 255"),
      count: z
        .number()
        .min(1, "minimum count of product is one")
        .max(200, "max count is 200"),
      size: z.object({
        width: z
          .number()
          .min(1, "minimum width of product is one")
          .max(200, "max width is 200"),
        height: z
          .number()
          .min(1, "minimum height of product is one")
          .max(200, "max height is 200"),
      }),

      weight: z.preprocess((v) => {
        if (v === '' || v === null || v === undefined) return undefined;
        const n = typeof v === 'string' ? Number(v) : v;
        return Number.isNaN(n) ? undefined : n;
      }, z.number().min(1, "minimum weight of product is one").max(200, "max weight is 200").optional()),
    });

    type InfetSchema = z.infer<typeof schemacard>;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemacard),
    mode: "onSubmit",
    defaultValues: {
      imageUrl: "",
      name: "",
      count: 0,
      size: {
        width: 0,
        height: 0,
      },
      weight:2
    },
  });

      const handlePostGredients = async (data: z.infer<typeof schemacard>) => {
        try {
          // IMPORTANT: no leading slash, so ky prefixUrl is used
          await kyInstance.post("products", {
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
          console.log("Product created");
        } catch (e) {
          console.error("POST /products failed", e);
        }
      };

    const submit = async (data: InfetSchema) => {
      console.log("hello world my dear friend", data);
      await handlePostGredients(data);
    };


    const getErrorMessage = (path: string) => {
      const parts = path.split(".");

      let node: any = errors;
      for (const p of parts) node = node?.[p];
      return node?.message as string | undefined;
    };

    return (
      <form
        className="flex flex-col gap-[10px]"
        onSubmit={handleSubmit(submit, (err) => {
          console.log('form errors', err);
        })}
      >
        {fields.map((field) => (
          <div key={field.name}>
            <div className="flex gap-[20px] items-center justify-center">
              <label htmlFor={field.name}>{field.label}</label>

              <Input
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                // react-hook-form supports dot notation; cast for typing only
                {...register(field.name as unknown as keyof InfetSchema, {
                  valueAsNumber: field.type === "number",
                })}
              />
            </div>
            <span className="text-red-500">
              {getErrorMessage(field.name)}
            </span>
          </div>
        ))}
        <Button variant="destructive" type="submit">Confirm</Button>
        <Button type="button">Cancel</Button>
      </form>
    );
  }

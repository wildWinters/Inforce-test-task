import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCard, SchemaFormCardType } from "../schema/schema-form";

export const useValidationCard = () => {  
  const form = useForm<SchemaFormCardType>({
    resolver: zodResolver(schemaCard),
    mode: "onSubmit",
    defaultValues: {
      imageUrl: "",
      name: "",
      count: 0,
      size: { width: 0, height: 0 },
      weight: 0,
    },
  });

  const onSubmit = (data: SchemaFormCardType) => {
    console.log(data);
    form.reset(); 
  };

  return { ...form, onSubmit };
};

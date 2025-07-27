import { Path } from "react-hook-form";

type SimpleField = {
  name: Path<Product>;
  label: string;
  placeholder?: string;
  type: "text" | "url" | "number";
  description?: string;
};
  
export const fields: SimpleField[] = [
  { name: "id", label: "ID", placeholder: "product-1", type: "text",  },
  { name: "imageUrl", label: "Image URL", placeholder: "https://...", type: "url",  },
  { name: "name", label: "Name", placeholder: "Product name", type: "text", },
  { name: "count", label: "Count", placeholder: "0", type: "number" },
  { name: "size.width", label: "Width", placeholder: "1", type: "number", },
  { name: "size.height", label: "Height", placeholder: "1", type: "number", },
];
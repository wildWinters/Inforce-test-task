import type { Product } from "../schema/product-schema";
import { Path } from "react-hook-form";

export type SimpleField = {
  name: Path<Product>;
  label: string;
  placeholder?: string;
  type: "text" | "url" | "number";
  description?: string;
};

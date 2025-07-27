type SimpleField = {
  name: Path<Product>;
  label: string;
  placeholder?: string;
  type: "text" | "url" | "number";
  description?: string;
};
  
export const fields: SimpleField[] = [
  { name: "id", label: "ID", placeholder: "product-1", type: "text", description: "Унікальний ідентифікатор продукту." },
  { name: "imageUrl", label: "Image URL", placeholder: "https://...", type: "url", description: "Посилання на зображення продукту." },
  { name: "name", label: "Name", placeholder: "Product name", type: "text", description: "Назва продукту." },
  { name: "count", label: "Count", placeholder: "0", type: "number", description: "Кількість на складі." },
  { name: "size.width", label: "Width", placeholder: "1", type: "number", description: "Ширина продукту (> 0)." },
  { name: "size.height", label: "Height", placeholder: "1", type: "number", description: "Висота продукту (> 0)." },
];
import { EditableTableCardNoInputs } from "@/modules/enter-page/table-card/tablos";

export default function Page() {

  return ( 
    <EditableTableCardNoInputs  
    id="1"
    name="Product 1"
    count={10}
    size={{ width: 10, height: 20 }}
    weight={100}
  />
  )
}
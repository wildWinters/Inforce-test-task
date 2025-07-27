import { TableWrapper } from "./table/table-wrapper"
import { DialogWrapper } from "./dialogs/dialog-product-wrapper"
import { DialogSortingModalWrapper } from "./dialogs/dialog-sorting-mode-wrapper"

export function ProductViewListPage() {
    return (
        <> 
         <TableWrapper/>
         <div className="flex items-center justify-center gap-[10px] p-4"> 
            <DialogWrapper/>
            <DialogSortingModalWrapper/>
         </div>
        </>
    )
}
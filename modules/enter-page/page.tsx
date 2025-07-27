import { TableWrapper } from "./table/table-wrapper"
import { Button } from "@/shared/shad-cn/button"
import { DialogWrapper } from "./dialog-button/dialog-wrapper"
import { DialogSortingModalWrapper } from "./dialog-button/dialog-sorting-mode-wrapper"

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
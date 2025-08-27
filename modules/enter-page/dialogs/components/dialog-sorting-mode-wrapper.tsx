"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shad-cn/dialog"
import { Button } from "@/shared/shad-cn/button"
import { kyInstance } from "@/shared/lib/ky"
import { kyInstanceNode } from "@/shared/lib/ky-node"
import { useTableStore } from "@/shared/store/use-table-store"
import { TProduct } from "../../table/types/t-product"


export function DialogSortingModalWrapper() {
  const updateTableRenderData = useTableStore(state => state.updateTableRenderData);
  const tableRenderData = useTableStore(state => state.tableRenderData);

  const handleClickSortingMode = (mode: "asc" | "desc", queryUrl: string, sortField: string): void => { 
    kyInstanceNode
      .get(`${queryUrl}?field=${sortField}&mode=${mode}`) 
      .json<TProduct[]>()
      .then( data => {
        updateTableRenderData(data);
        console.log(tableRenderData);
        console.log(data);
      })
      .catch(error => console.log("kyInstanceNode error sort mode", error))
  }
  
  return (
    <div className="flex items-center justify-center dark:bg-background p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => handleClickSortingMode("asc", "products", "count")} className="
            inline-flex items-center justify-center gap-2
            rounded-xl px-5 py-2.5
            font-semibold text-white tracking-wide
            bg-gradient-to-r from-blue-500 to-indigo-500
            shadow-md hover:shadow-lg
            transition-all duration-200
            hover:from-blue-600 hover:to-indigo-600
            focus-visible:outline-none
            focus-visible:ring-4 focus-visible:ring-indigo-500/30
          ">
            Choose Sort Mode
          </Button>
        </DialogTrigger>

        <DialogContent className="
          sm:max-w-[480px]
          rounded-2xl border-0 shadow-2xl
          bg-background/80 backdrop-blur-xl
          p-6
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
        ">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center text-2xl font-bold tracking-tight">
              Choose Sort Mode
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex justify-center gap-6">
            <Button className="px-6 py-2 text-lg font-semibold" onClick={() => handleClickSortingMode("asc", "products", "count")}>
              ASC Sorting
            </Button>
            <Button className="px-6 py-2 text-lg font-semibold" onClick={() => handleClickSortingMode("desc", "products", "count")}>
              Desc Sorting
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

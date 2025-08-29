"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shad-cn/dialog"
import { twAddProduct } from "../constant/tailwind/const-tw-add-product"
import { twDialogContent } from "../constant/tailwind/const-tw-dialog-content"
import ProductCardForm from "./open-ui-modal"
import { Button } from "@/shared/shad-cn/button"
import { CardModal } from "../../table-card/components/card-modal"
export function DialogWrapper() {
  return (
    <div className="flex items-center justify-center bg-muted/30 dark:bg-background">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={twAddProduct}
          >
            Add Product 
          </Button>
        </DialogTrigger>

        <DialogContent
          className={twDialogContent}
        >
          <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-2xl font-bold tracking-tight">
              Product card Modal 
          </DialogTitle>
          </DialogHeader>
          <ProductCardForm/>
          <CardModal />  
          {/* <AddProductModal/> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

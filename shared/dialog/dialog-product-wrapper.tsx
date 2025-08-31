'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shad-cn/dialog';
import { Button } from '@/shared/shad-cn/button';

import { ContetDialogCard } from '@/modules/enter-page/dialogs/components/open-ui-modal';
import { IDialogWrapperProps } from '@/shared/types/i-dialog-wrapper-props';
import { TW_ADD_PRODUCT } from '@/modules/enter-page/dialogs/constant/tailwind/const-tw-add-product';
import { TW_DIALOG_CONTENT } from '@/modules/enter-page/dialogs/constant/tailwind/const-tw-dialog-content';

export function DialogWrapper({
  title = 'ProductCardModal',
  buttonTitle = 'Add Product',
  children = <ContetDialogCard />,
}: IDialogWrapperProps) {
  return (
    <div className="flex items-center justify-center bg-muted/30 dark:bg-background">
      <Dialog>
        <DialogTrigger asChild>
          <Button className={TW_ADD_PRODUCT}>{buttonTitle}</Button>
        </DialogTrigger>

        <DialogContent className={TW_DIALOG_CONTENT}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center text-2xl font-bold tracking-tight">
              {title}
            </DialogTitle>
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

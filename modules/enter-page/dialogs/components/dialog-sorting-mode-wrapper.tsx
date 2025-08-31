'use client';

import { useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shad-cn/dialog';
import { Button } from '@/shared/shad-cn/button';

import { useTableStore } from '@/shared/store/use-table-store';
import { TProduct } from '../../table/types/t-product';
import { cn } from '@/shared/lib/utils';
import { kyInstance3001 } from '@/shared/lib/ky-3001';
import { sortOptions } from '../mock/mock-sort-options';
import { TW_BUTTON_CHOSE_SORT_MODE } from '../constant/tailwind/const-tw-button-chose-sort-mode';
import { TW_BUTTON_CHOSE_SORT_MODE_OPEN_DIALOG } from '../constant/tailwind/const-tw-button-chose-sort-mode-open-dialog';

export function DialogSortingModalWrapper() {
  const updateTableRenderData = useTableStore(
    (state) => state.updateTableRenderData
  );
  const tableRenderData = useTableStore((state) => state.tableRenderData);

  const handleClickSortingMode = useCallback(
    (sortField: 'count' | 'name', sortOrder: 'asc' | 'desc') => {
      kyInstance3001
        .get(`products?sortField=${sortField}&sortOrder=${sortOrder}`)
        .json<TProduct[]>()
        .then((data) => {
          updateTableRenderData(data);
          console.log('Updated data:', data);
        })
        .catch((error) =>
          console.log('kyInstance error sort mode', error)
        );
    },
    [updateTableRenderData]
  );

  return (
    <div className="flex items-center justify-center dark:bg-background p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className={cn(TW_BUTTON_CHOSE_SORT_MODE_OPEN_DIALOG)}>
            Choose Sort Mode
          </Button>
        </DialogTrigger>

        <DialogContent className={cn(TW_BUTTON_CHOSE_SORT_MODE)}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center text-2xl font-bold tracking-tight">
              Choose Sort Mode
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex flex-col justify-center gap-6">
            {sortOptions.map((option, index) => (
              <DialogPrimitive.Close key={index}>
                <Button
                  className="px-6 py-2 text-lg font-semibold"
                  onClick={() =>
                    handleClickSortingMode(option.field, option.order)
                  }
                >
                  {option.label}
                </Button>
              </DialogPrimitive.Close>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

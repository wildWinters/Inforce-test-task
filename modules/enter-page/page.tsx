import { TableWrapper } from './table/table-wrapper';
import { DialogSortingModalWrapper } from './dialogs/components/dialog-sorting-mode-wrapper';
import { DialogWrapper } from '@/shared/dialog/dialog-product-wrapper';

export function ProductViewListPage() {
  return (
    <>
      <TableWrapper />
      <div className="flex items-center justify-center gap-[10px] p-4">
        <DialogWrapper />
        <DialogSortingModalWrapper />
      </div>
    </>
  );
}

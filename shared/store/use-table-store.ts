import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TProduct } from '../../modules/enter-page/table/types/t-product';

export interface IUseTableStore {
  tableRenderData: TProduct[] | null;
  updateTableRenderData: (tableData: TProduct[]) => void;
}

export const useTableStore = create<IUseTableStore>()(
  devtools(
    immer((set) => ({
      tableRenderData: null,
      updateTableRenderData: (tableData: TProduct[]) => {
        set((state) => {
          state.tableRenderData = tableData; 
        });
      },
    }))
  )
);

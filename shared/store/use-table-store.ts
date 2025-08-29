import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TProduct } from '../../modules/enter-page/table/types/t-product';
import { IComments } from './store-types';

export interface IUseTableStore {
  tableRenderData: TProduct[] | null;
  comment: IComments | null; // один коментар або null
  setComment: (comment: IComments) => void; // замінити коментар
  updateTableRenderData: (tableData: TProduct[]) => void;
}

export const useTableStore = create<IUseTableStore>()(
  devtools(
    immer((set) => ({
      tableRenderData: null,
      comment: null,

      updateTableRenderData: (tableData: TProduct[]) => {
        set((state) => {
          state.tableRenderData = tableData;
        });
      },

      setComment: (comment: IComments) => {
        set((state) => {
          state.comment = comment; // зберігаємо лише один коментар
        });
      },
    }))
  )
);

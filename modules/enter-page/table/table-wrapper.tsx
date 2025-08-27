"use client";
import { FC } from "react";
import clsx from "clsx";
import { tanstackKey } from "./constant/tanstack-key";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/shad-cn/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { kyInstance } from "@/shared/lib/ky";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shad-cn/dialog";
import { Button } from "@/shared/shad-cn/button";
import { CONHEADERS } from "./constant/cons.headers";
import { TProduct } from "./types/t-product";
import { useTableStore } from "@/shared/store/use-table-store";

export const TableWrapper: FC = () => {
  const tableRenderData =  useTableStore(state=>state.tableRenderData);
  const updateTableRenderData = useTableStore(state=>state.updateTableRenderData);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<TProduct[]>({
    queryKey: [tanstackKey],
    queryFn: () => kyInstance.get(tanstackKey).json(),
  });
  updateTableRenderData(data);

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) =>
      kyInstance.delete(`products/${id}`).text(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tanstackKey] });
    },
    onError: (error) => {
      console.error("Помилка при видаленні:", error);
    },
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
      <Table className="w-full text-sm text-slate-700 dark:text-slate-200">
        <TableCaption className="caption-bottom p-3 text-slate-500 dark:text-slate-400">
          List of your products.
        </TableCaption>

        <TableHeader className="bg-indigo-600 text-indigo-50 dark:bg-indigo-700">
          <TableRow className="hover:bg-indigo-600/95">
            {CONHEADERS.map((header, idx) => (
              <TableHead
                key={header}
                className={clsx(
                  "px-4 py-3 font-semibold uppercase tracking-wide align-middle",
                  idx === 0 && "w-[80px] text-left"
                )}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableRenderData?.map((product) => (
            <TableRow
              key={product.id}
              className={clsx(
                "transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700",
                "odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/60"
              )}
            >
              <TableCell className="px-4 py-3 align-middle font-medium text-slate-900 dark:text-slate-100">
                {product.id}
              </TableCell>

              <TableCell className="px-4 py-3 align-middle">
                <div className="w-12 h-12 overflow-hidden rounded-md border bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 align-middle">
                {product.name}
              </TableCell>
              <TableCell className="px-4 py-3 align-middle">
                {product.count}
              </TableCell>

              <TableCell className="px-4 py-3 align-middle">
                {product.size.width}×{product.size.height}
              </TableCell>

              <TableCell className="px-4 py-3 align-middle">
                {product.weight}
              </TableCell>

              <TableCell className="px-4 py-3 align-middle text-right tabular-nums">
                {product.comments?.length ?? 0}
              </TableCell>

              <TableCell className="px-4 py-3 align-middle">
                <div className="flex justify-center items-center">
                  <Dialog>
                    <DialogTrigger>
                      <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition-colors" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-col gap-[20px] items-center">
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="flex items-center justify-center">
                          <Button
                            onClick={() => deleteMutation.mutate(product.id)}
                            variant={"ghost"}
                            className="bg-red-500 px-[20px] text-white"
                          >
                            {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                          </Button>
                        </DialogDescription> 
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

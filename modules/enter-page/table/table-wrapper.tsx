"use client"
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
import { useQuery } from "@tanstack/react-query";
import { kyInstance } from "@/shared/lib/ky";

type Product = {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Array<any>;
};

const HEADERS = [
  "ID",
  "Image",
  "Name",
  "Count",
  "Size (W×H)",
  "Weight",
  "Comments",
];

export const TableWrapper: FC = () => {

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: [tanstackKey],
    queryFn: () => kyInstance.get(tanstackKey).json(),
  });
  console.log(data);

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
            {HEADERS.map((header, idx) => (
              <TableHead
                key={header}
                className={clsx(
                  "px-4 py-3 font-semibold uppercase tracking-wide",
                  idx === 0 && "w-[80px] text-left",
                  idx === HEADERS.length - 1 ? "text-right" : "text-left"
                )}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((product) => (
            <TableRow
              key={product.id}
              className={clsx(
                "transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700",
                "odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/60"
              )}
            >
              <TableCell className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                {product.id}
              </TableCell>

              <TableCell className="px-4 py-3">
                <div className="w-12 h-12 overflow-hidden rounded-md border bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>

              <TableCell className="px-4 py-3">{product.name}</TableCell>

              <TableCell className="px-4 py-3">{product.count}</TableCell>

              <TableCell className="px-4 py-3">
                {product.size.width}×{product.size.height}
              </TableCell>

              <TableCell className="px-4 py-3">{product.weight}</TableCell>

              <TableCell className="px-4 py-3 text-right tabular-nums">
                {product.comments?.length ?? 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

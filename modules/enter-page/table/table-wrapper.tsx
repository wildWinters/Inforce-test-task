import { FC, useMemo } from "react";
import type { invoiceStatusType as InvoiceStatus } from "@/modules/enter-page/table/types/invoice-status-type";
import { tableHeading } from "@/modules/enter-page/table/constant/table-heading";
import type { Invoice } from "@/modules/enter-page/table/types/invoice";
import clsx from "clsx";
import {StatusBadge} from "@/modules/enter-page/table/components/status-badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/shad-cn/table";
import  { defaultData } from "@/modules/enter-page/table/mock/default-data";


const HEADERS = tableHeading ?? ["Invoice", "Status", "Method", "Amount"];

export const TableWrapper: FC<{ data?: ReadonlyArray<Invoice> }> = ({
                                                                      data = defaultData,}) => {
  const money = useMemo(
      () =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }),
      []
  );

  return (
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
        <Table className="w-full text-sm text-slate-700 dark:text-slate-200">
          <TableCaption className="caption-bottom p-3 text-slate-500 dark:text-slate-400">
            A list of your recent invoices.
          </TableCaption>

          <TableHeader className="bg-indigo-600 text-indigo-50 dark:bg-indigo-700">
            <TableRow className="hover:bg-indigo-600/95">
              {HEADERS.map((h, idx) => (
                  <TableHead
                      key={h}
                      className={clsx(
                          "px-4 py-3 font-semibold uppercase tracking-wide",
                          idx === 0 && "w-[120px] text-left",
                          idx === HEADERS.length - 1 ? "text-right" : "text-left"
                      )}
                  >
                    {h}
                  </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row) => (
                <TableRow
                    key={row.id}
                    className={clsx(
                        "transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700",
                        "odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/60"
                    )}
                >
                  <TableCell className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {row.id}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="px-4 py-3">{row.method}</TableCell>
                  <TableCell className="px-4 py-3 text-right font-semibold tabular-nums">
                    {money.format(row.amount)}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
};

import {FC} from "react";
import clsx from "clsx";

export const StatusBadge: FC<{ status: InvoiceStatus }> = ({ status }) => {
    const base =
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    const styles: Record<InvoiceStatus, string> = {
        Paid:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
        Pending:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        Failed:
            "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    };

    return <span className={clsx(base, styles[status])}>{status}</span>;
};
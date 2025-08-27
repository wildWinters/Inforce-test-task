import { invoiceStatusType } from "./t-invoice-status-type";
export interface Invoice {
    id: string;
    status: invoiceStatusType;
    method: string;
    amount: number;
}
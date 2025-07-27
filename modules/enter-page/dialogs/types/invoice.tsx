export interface Invoice {
    id: string;
    status: InvoiceStatus;
    method: string;
    amount: number;
}
import type {Invoice} from "@/modules/enter-page/table/types/invoice";

export const defaultData: ReadonlyArray<Invoice> = [
    { id: "INV001", status: "Paid",    method: "Credit Card", amount: 250 },
    { id: "INV002", status: "Pending", method: "PayPal",      amount: 120 },
    { id: "INV003", status: "Failed",  method: "Wire",        amount: 980 },
    { id: "INV004", status: "Paid",    method: "Credit Card", amount: 45  },
];
export interface ITableCardWrapperProps { 
  id: string | number;
  name: string;
  count: number;
  size: { width: number; height: number };
  weight: number | string;
  comments?: string[] | string;
  deleteicon?: string;
  onDelete?: (id: string | number) => void;
}
interface ISortOption {
  field: 'count' | 'name';
  order: 'asc' | 'desc';
  label: string;
}

export const sortOptions: ISortOption[] = [
  { field: 'count', order: 'asc', label: 'ASC Sorting by count' },
  { field: 'count', order: 'desc', label: 'DESC Sorting by count' },
  { field: 'name', order: 'asc', label: 'ASC alphabetic' },
  { field: 'name', order: 'desc', label: 'DESC alphabetic' },
] as const;

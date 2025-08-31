import { SimpleField } from '../../dialogs/types/simple-field';

export const fields: SimpleField[] = [
  {
    name: 'imageUrl',
    label: 'Image URL',
    placeholder: 'https://...',
    type: 'url',
  },
  { name: 'name', label: 'Name', placeholder: 'Product name', type: 'text' },
  { name: 'count', label: 'Count', placeholder: '0', type: 'number' },
  { name: 'size.width', label: 'Width', placeholder: '1', type: 'number' },
  { name: 'size.height', label: 'Height', placeholder: '1', type: 'number' },
];

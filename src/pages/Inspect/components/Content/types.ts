import { type SortingState } from '@tanstack/react-table';

export interface DataTableItem {
  id: string;
  link: string;
  insert_at: string;
  date_start: string;
  date_end: string;
  channel_id: string;
  channel_name: string;
  file_name: string;
  size: string;
  ativo_id: string;
  client_id: string;
  ativo: string;
  plate: string;
  client: string;
  id_indice: string;
  equipament_id: string;
  status: string;
}

export interface OptionsFilter {
  id?: string;
  link?: string;
  insert_at?: string;
  date_start?: string;
  date_end?: string;
  // channel_id?: string;
  channel_name?: string;
  file_name?: string;
  size?: string;
  ativo_id?: string;
  client_id?: string;
  ativo?: string;
  plate?: string;
  client?: string;
}

export interface FilterTable {
  search?: {
    value: string;
    label: string;
  };
  sorting?: SortingState;
  dateFilter?: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  lastId?: number | null;
}
export interface DataTableItemResponse {
  data: DataTableItem[];
  total: number;
}

const typeWidth = 'rem';
export const objectWidths: Pick<
  DataTableItem,
  'id' | 'ativo' | 'channel_name' | 'date_end' | 'date_start' | 'insert_at' | 'client' | 'file_name'
> = {
  id: '1' + typeWidth,
  client: '2.3125' + typeWidth,
  ativo: '11.0625' + typeWidth,
  date_start: '11.375' + typeWidth,
  date_end: '11.375' + typeWidth,
  channel_name: '4.9375' + typeWidth,
  insert_at: '8.938' + typeWidth,
  file_name: '5.9375' + typeWidth,
};

export const objectSpanWidths: Pick<
  DataTableItem,
  'ativo' | 'channel_name' | 'date_end' | 'date_start' | 'insert_at' | 'file_name'
> = {
  ativo: '11.0625' + typeWidth,
  date_start: '11.375' + typeWidth,
  date_end: '11.375' + typeWidth,
  channel_name: '4.9375' + typeWidth,
  insert_at: '8.938' + typeWidth,
  file_name: '5.9375' + typeWidth,
};

export type chechBox = Array<string | number> | 'all';

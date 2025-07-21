import React from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Head from './Head';
import { Loading } from '@ftdata/ui';
import { ColumnsFunction } from './columns';
import { UnreachableContent } from '../../UnreachableContent';
import TableComponent from 'src/components/Table';
import type { TableVideoItem } from 'src/types/filter';
import Body from './Body';

interface Props {
  data: TableVideoItem[];
  isLoading: boolean;
  setCheckbox: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  checkbox: (string | number)[];
}

const ContentTable: React.FC<Props> = ({ data, isLoading, setCheckbox, checkbox }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = ColumnsFunction(setCheckbox, checkbox);

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: -1,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return <Loading size="xl" variant="light" />;
  }

  if (!(data.length > 0)) {
    return <UnreachableContent />;
  }

  return (
    <TableComponent<TableVideoItem>
      body={<Body checkbox={checkbox} setCheckbox={setCheckbox} table={table} />}
      head={<Head table={table} setSorting={setSorting} />}
      table={table}
      setSorting={setSorting}
    />
  );
};

export default ContentTable;

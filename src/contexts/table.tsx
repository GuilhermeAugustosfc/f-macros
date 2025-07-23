import { type SortingState } from '@tanstack/react-table';
import React, { createContext, type Dispatch, type SetStateAction, useState } from 'react';
import type { DataTableItemResponse } from 'src/pages/Inspect/components/Content/types';

interface ITableContext {
  dataTable: DataTableItemResponse;
  setDataTable: Dispatch<SetStateAction<DataTableItemResponse>>;
  totalRows: number;
  setTotalRows: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  search: {
    value: string;
    label: string;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    }>
  >;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
}

const TableContext = createContext<ITableContext>({} as ITableContext);
const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataTable, setDataTable] = useState<DataTableItemResponse>({
    data: [],
    total: 0,
  });

  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'insert_at',
      desc: true,
    },
  ]);
  const [search, setSearch] = useState<{
    value: string;
    label: string;
  }>({
    value: '',
    label: 'ativo',
  });

  const [pagination, setPagination] = useState<{ pageIndex: number; pageSize: number }>({
    pageSize: 5,
    pageIndex: 0,
  });

  return (
    <TableContext.Provider
      value={{
        dataTable,
        setDataTable,
        totalRows,
        setTotalRows,
        isLoading,
        setIsLoading,
        sorting,
        setSorting,
        search,
        setSearch,
        pagination,
        setPagination,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };

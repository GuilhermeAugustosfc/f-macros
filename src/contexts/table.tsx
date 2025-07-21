import { type SortingState } from '@tanstack/react-table';
import React, { createContext, type Dispatch, type SetStateAction, useState } from 'react';
import type {
  chechBox,
  DataTableItem,
  DataTableItemResponse,
} from 'src/pages/Inspect/components/Content/types';

interface ITableContext {
  dataTable: DataTableItemResponse;
  setDataTable: Dispatch<SetStateAction<DataTableItemResponse>>;
  totalRows: number;
  setTotalRows: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  checkbox: chechBox;
  setCheckbox: React.Dispatch<React.SetStateAction<chechBox>>;
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
  lastId: number | null;
  setLastId: React.Dispatch<React.SetStateAction<number | null>>;
  dataSelected: DataTableItem | null;
  setDataSelected: React.Dispatch<React.SetStateAction<DataTableItem | null>>;
  indexedData: Record<'file_name', string>;
  setIdexedData: React.Dispatch<React.SetStateAction<Record<'file_name', string>>>;
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
  const [checkbox, setCheckbox] = useState<chechBox>([]);
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

  const [lastId, setLastId] = useState<number | null>(null);
  const [dataSelected, setDataSelected] = useState<DataTableItem | null>(null);
  const [indexedData, setIdexedData] = useState<Record<'file_name', string>>(
    {} as Record<string, string>,
  );

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
        checkbox,
        setCheckbox,
        search,
        setSearch,
        lastId,
        setLastId,
        dataSelected,
        setDataSelected,
        indexedData,
        setIdexedData,
        pagination,
        setPagination,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };

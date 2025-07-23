import React, { type JSX } from 'react';
import { TableContainer, TableWrapper } from './style';
import type { SortingState, Table } from '@tanstack/react-table';
import Head from './Head';
import { Pagination } from './Pagination';
import Body from './Body';

interface TableProps<T> {
  body?: JSX.Element;
  head?: JSX.Element;
  pagination?: JSX.Element;
  table: Table<T>;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  onRowClick?: (rowID: string) => void;
  color?: string;
  bordeColor?: string;
}

const TableComponent = <T,>({
  table,
  setSorting,
  pagination,
  head,
  body,
  onRowClick,
  color,
  bordeColor,
}: TableProps<T>): JSX.Element => {
  return (
    <TableContainer>
      <TableWrapper>
        <table>
          {head ? (
            head
          ) : (
            <Head<T> table={table} setSorting={setSorting ? setSorting : () => null} />
          )}
          {body ? (
            body
          ) : (
            <Body<T> table={table} onRowClick={onRowClick} color={color} bordeColor={bordeColor} />
          )}
        </table>
      </TableWrapper>
      {pagination ? pagination : <Pagination<T> table={table} />}
    </TableContainer>
  );
};

export default TableComponent;

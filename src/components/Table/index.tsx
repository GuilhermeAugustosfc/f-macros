import React, { type JSX } from 'react';
import { TableContainer, TableWrapper } from './style';
import { type SortingState, type Table } from '@tanstack/react-table';
import Head from './Head';
import { Pagination } from './Pagination';
import Body from './Body';

interface TableProps<T> {
  body?: JSX.Element | null;
  head?: JSX.Element | null;
  pagination?: JSX.Element;
  table: Table<T>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  scrollPosition?: 'near' | 'far';
  footer?: JSX.Element | null;
  size?: 'medium' | 'large';
}

const TableComponent = <T,>({
  table,
  setSorting,
  scrollPosition,
  body,
  head,
  pagination,
  footer,
  size,
}: TableProps<T>): JSX.Element => {
  const scroll = scrollPosition === 'far' ? 'far' : 'near';
  return (
    <TableContainer scroll={scroll}>
      <TableWrapper scroll={scroll} size={size ? size : 'medium'}>
        <div id="print-content">
          <table>
            {head || head === null ? head : <Head<T> table={table} setSorting={setSorting} />}
            {body || body === null ? body : <Body<T> table={table} />}
            {footer}
          </table>
        </div>
      </TableWrapper>

      {pagination ? pagination : <Pagination<T> table={table} />}
    </TableContainer>
  );
};

export default TableComponent;

import React, { type JSX } from 'react';
import { type SortingState, type Table, flexRender } from '@tanstack/react-table';
import { THead, ThInfo } from './styles';
import OrderIndicator from '../OrderIndicator';

interface Props<T> {
  table: Table<T>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const Head = <T,>({ table, setSorting }: Props<T>): JSX.Element => {
  const OrderIndicatorObj = {
    asc: <OrderIndicator asc />,
    desc: <OrderIndicator desc />,
    false: <OrderIndicator />, // retorna false quando não está ordenado
  };
  return (
    <THead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <ThInfo
                  sort={header.column.getCanSort()}
                  onClick={() => {
                    if (!header.column.getIsSorted()) {
                      setSorting([{ id: header.column.id, desc: false }]);
                    }
                    if (header.column.getIsSorted() == 'asc') {
                      setSorting([{ id: header.column.id, desc: true }]);
                    }

                    if (header.column.getIsSorted() == 'desc') {
                      setSorting([{ id: header.column.id, desc: false }]);
                    }
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {header.id != 'checkbox' &&
                    OrderIndicatorObj[(header.column.getIsSorted() as 'asc' | 'desc') || 'false']}
                </ThInfo>
              )}
            </th>
          ))}
        </tr>
      ))}
    </THead>
  );
};
//   ${header.id == 'checkbox' ? `w-1` : `w-30`}

export default Head;

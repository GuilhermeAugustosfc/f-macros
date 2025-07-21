import { type JSX } from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import { TBody, TrBody } from './styles';

interface Props<T> {
  table: Table<T>;
}

const Body = <T,>({ table }: Props<T>): JSX.Element => {
  return (
    <TBody>
      {table
        .getRowModel()
        .rows.slice(0, table.getState().pagination.pageSize)
        .map((row, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          return (
            <TrBody key={row.id} isEven={isEven}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                );
              })}
            </TrBody>
          );
        })}
    </TBody>
  );
};

export default Body;

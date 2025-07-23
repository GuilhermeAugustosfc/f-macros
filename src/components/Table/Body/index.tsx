import { type Table, flexRender } from '@tanstack/react-table';
import { TBody, TrBody } from './styles';
import type { JSX } from 'react';

interface Props<T> {
  table: Table<T>;
  onRowClick?: (rowID: string) => void;
  color?: string;
  bordeColor?: string;
}

const Body = <T,>({ table, onRowClick, color, bordeColor }: Props<T>): JSX.Element => {
  return (
    <TBody bordeColor={bordeColor ? bordeColor : ''}>
      {table.getRowModel().rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        return (
          <TrBody
            key={row.id}
            isEven={isEven}
            color={color ? color : 'rgba(136, 145, 159, 0.08)'}
            onClick={() => (onRowClick ? onRowClick(row.id) : null)}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td onClick={() => row.toggleSelected()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </TrBody>
        );
      })}
    </TBody>
  );
};

export default Body;

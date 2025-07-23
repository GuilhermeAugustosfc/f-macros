import React from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import * as styleguide from '@ftdata/f-tokens';
import { Tbody, TdBody, TrBody } from './style';
import { type DataTableItem, objectWidths } from '../../types';

interface Props {
  table: Table<DataTableItem>;
}

const Body: React.FC<Props> = ({ table }: Props) => {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;

        return (
          <TrBody key={row.id}>
            {row.getAllCells().map((cell) => {
              return (
                !cell.column.columnDef?.meta?.isHidden && (
                  <TdBody
                    onClick={() => row.toggleSelected()}
                    widthCell={objectWidths[cell.column.id as keyof typeof objectWidths]}
                    key={cell.id}
                    style={{
                      backgroundColor: !isEven
                        ? styleguide.COLOR_NEUTRAL_DAY
                        : styleguide.COLOR_NEUTRAL_LIGHTER,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TdBody>
                )
              );
            })}
          </TrBody>
        );
      })}
    </Tbody>
  );
};

export default Body;

import React from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import * as styleguide from '@ftdata/f-tokens';
import type { TableVideoItem } from 'src/types/filter';
import { Tbody, TdBody, TrBody } from './style';

interface Props {
  table: Table<TableVideoItem>;
  setCheckbox: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  checkbox: (string | number)[];
}

const Body: React.FC<Props> = ({ table, setCheckbox, checkbox }: Props) => {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        return (
          <TrBody
            isEven={isEven}
            onClick={() => {
              const dataRow: string = row.getValue('file_name');
              if (!checkbox.includes(dataRow)) {
                setCheckbox([...checkbox, dataRow]);
                return;
              }

              setCheckbox(checkbox.filter((value) => value != dataRow));
            }}
            key={row.id}
          >
            {row.getAllCells().map((cell) => {
              if (!isEven) {
                return (
                  <TdBody backgroudColor={styleguide.COLOR_NEUTRAL_DAY} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TdBody>
                );
              } else {
                return (
                  <TdBody backgroudColor={styleguide.COLOR_NEUTRAL_LIGHTER} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TdBody>
                );
              }
            })}
          </TrBody>
        );
      })}
    </Tbody>
  );
};

export default Body;

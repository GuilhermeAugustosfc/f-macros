import React from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';

interface Props {
  table: Table<any>;
}

const Body: React.FC<Props> = ({ table }: Props) => {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        const isEven = index % 2 === 0;

        return (
          <TrBody isEven={isEven} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TdBody key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TdBody>
            ))}
          </TrBody>
        );
      })}
    </Tbody>
  );
};

const Tbody = styled.tbody`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
`;

const TrBody = styled.tr<{ isEven: boolean }>`
  background: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  color: #26333b;
  font-size: 0.75rem;
  height: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  border-bottom: 1px solid #e5e7eb;
`;

const TdBody = styled.td`
  padding: 8px 12px;
  border-right: 1px solid #e5e7eb;
  font-weight: 500;

  &:last-child {
    border-right: none;
  }
`;

export default Body;

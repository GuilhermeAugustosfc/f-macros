import React from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

interface Props {
  table: Table<any>;
}

const Body: React.FC<Props> = ({ table }: Props) => {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        const isEven = index % 2 === 0;
        return (
          <TrBody key={row.id} isEven={isEven}>
            {row.getVisibleCells().map((cell, cellIndex) => (
              <TdBody key={cell.id} isFirstColumn={cellIndex === 0}>
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
  font-weight: 500;
  text-align: left;
  border: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
`;

const TrBody = styled.tr<{ isEven: boolean }>`
  background: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  color: #26333b;
  font-size: 0.875rem;
  height: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f0f8ff;
  }
`;

const TdBody = styled.td<{ isFirstColumn: boolean }>`
  ${({ isFirstColumn }) =>
    isFirstColumn
      ? `
    font-weight: 500;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    `
      : `
    font-weight: 500;
    width: initial;
    padding: 5px 16px;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `}

  div {
    display: flex;
    gap: 0.625rem;
    justify-content: ${({ isFirstColumn }) => (isFirstColumn ? 'center' : 'flex-start')};
    align-items: center;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default Body;

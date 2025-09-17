import React from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import styled, { keyframes } from 'styled-components';
import SubTableMacros from './SubTableMacros';
import HistoricChanges from './HistoricChanges';

interface Props {
  table: Table<any>;
  isEven: boolean;
}

const Body: React.FC<Props> = ({ table, isEven }: Props) => {
  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        const isRowEven = index % 2 === 0;
        const isExpanded = row.getIsExpanded();

        return (
          <React.Fragment key={row.id}>
            <TrBody isEven={isRowEven}>
              {row.getVisibleCells().map((cell, cellIndex) => (
                <TdBody key={cell.id} isFirstColumn={cellIndex === 0}>
                  {cellIndex === 0 ? (
                    <div onClick={() => row.toggleExpanded()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TdBody>
              ))}
            </TrBody>
            {isExpanded && (
              <AnimatedTr>
                <td
                  style={{ borderBottom: '1px solid #ccc' }}
                  colSpan={row.getVisibleCells().length}
                >
                  <HistoricChanges isEven={isEven} />
                  <SubTableMacros isEven={isEven} />
                </td>
              </AnimatedTr>
            )}
          </React.Fragment>
        );
      })}
    </Tbody>
  );
};

const expandAnimation = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

export const Tbody = styled.tbody`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
`;

export const TrBody = styled.tr<{ isEven: boolean }>`
  background: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  color: #26333b;
  font-size: 0.875rem; // 14px para rem
  height: 2.5rem; // 40px para rem
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
`;

export const AnimatedTr = styled.tr`
  animation: ${expandAnimation} 0.3s ease-out;
  transform-origin: top;
`;

export const TdBody = styled.td<{ isFirstColumn: boolean }>`
  border-right: 1px solid #b1b7bb;
  border-bottom: 1px solid #b1b7bb;
  font-weight: bold;
  width: ${({ isFirstColumn }) => (isFirstColumn ? '32px' : 'initial')}; // 30px para rem
  padding-left: ${({ isFirstColumn }) =>
    isFirstColumn ? '0.3125rem' : '0.625rem'}; // 5px para rem
  padding-right: ${({ isFirstColumn }) =>
    isFirstColumn ? '0.3125rem' : '0.625rem'}; // 5px para rem
  div {
    display: flex;
    gap: 0.625rem; // 10px para rem
    justify-content: ${({ isFirstColumn }) => (isFirstColumn ? 'center' : 'flex-start')};
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Body;

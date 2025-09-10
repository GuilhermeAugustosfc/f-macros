import React from 'react';
import { type SortingState, type Table, flexRender } from '@tanstack/react-table';
import SubTable from '../SubTable';
import styled, { keyframes } from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { AddCircleIcon, MinusIcon } from '../../svg';

interface Props {
  table: Table<any>;
  expandedRowId: string | null;
  setExpandedRowId: React.Dispatch<React.SetStateAction<string | null>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  allExpanded: boolean;
  reportParams: any;
  setAllExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Body: React.FC<Props> = ({
  table,
  expandedRowId,
  setExpandedRowId,
  allExpanded,
  reportParams,
  setAllExpanded,
}: Props) => {
  const handleExpand = (rowId: string) => {
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
    }
    if (allExpanded) {
      setAllExpanded(false);
    }
  };

  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        const isEven = index % 2 === 0;
        const isFirstRow = index === 0;
        const isExpanded = allExpanded || row.id === expandedRowId;
        return (
          <React.Fragment key={row.id}>
            <TrBody isEven={isEven} isFirstRow={isFirstRow}>
              {row.getVisibleCells().map((cell, cellIndex) => (
                <TdBody key={cell.id} isFirstColumn={cellIndex === 0}>
                  {cellIndex === 0 ? (
                    <div onClick={() => handleExpand(row.id)}>
                      {isExpanded ? (
                        <MinusIcon stroke="#26333B" />
                      ) : (
                        <AddCircleIcon stroke="#26333B" />
                      )}
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
                  <SubTable
                    isEven={isEven}
                    ativo_id={row.original.ativo_id}
                    reportParams={reportParams}
                  />
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

const Tbody = styled.tbody`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
  border-left: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
  border-bottom: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
`;

const TrBody = styled.tr<{ isEven: boolean; isFirstRow: boolean }>`
  background: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  color: #26333b;
  font-size: 0.875rem; // 14px para rem
  height: 2.5rem; // 40px para rem
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  ${({ isFirstRow }) =>
    isFirstRow &&
    `
        text-align: center;
        vertical-align: middle;
    `}
`;

const AnimatedTr = styled.tr`
  animation: ${expandAnimation} 0.3s ease-out;
  transform-origin: top;
`;

const TdBody = styled.td<{ isFirstColumn: boolean }>`
  border-right: 1px solid #b1b7bb;
  border-bottom: 1px solid #b1b7bb;
  font-weight: bold;
  width: ${({ isFirstColumn }) => (isFirstColumn ? '1.875rem' : 'initial')}; // 30px para rem
  padding-left: ${({ isFirstColumn }) =>
    isFirstColumn ? '0.3125rem' : '0.625rem'}; // 5px para rem
  padding-right: ${({ isFirstColumn }) =>
    isFirstColumn ? '0.3125rem' : '0.625rem'}; // 5px para rem
  div {
    display: flex;
    gap: 0.625rem; // 10px para rem
    justify-content: ${({ isFirstColumn }) => (isFirstColumn ? 'center' : 'flex-start')};
    cursor: pointer;
  }
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Body;

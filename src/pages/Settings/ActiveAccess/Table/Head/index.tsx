import React from 'react';
import { type SortingState, type Table, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';

interface Props {
  table: Table<any>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const Head: React.FC<Props> = ({ table, setSorting }: Props) => {
  const handleSort = (columnId: string, currentSort: string | false) => {
    const sortingStates = {
      false: { desc: true },
      asc: { desc: true },
      desc: { desc: false },
    };
    setSorting([{ id: columnId, ...sortingStates[currentSort as keyof typeof sortingStates] }]);
  };

  return (
    <StyledThead>
      {table.getHeaderGroups().map((headerGroup) => (
        <StyledTr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <StyledTh
              className={`${header.column.id}`}
              onClick={() => handleSort(header.column.id, header.column.getIsSorted())}
              key={header.id}
              colSpan={header.colSpan}
              isFirstColumn={index === 0}
            >
              {header.isPlaceholder ? null : (
                <StyledContainerOrderIndicatorHeader
                  getCanSort={header.column.getCanSort()}
                  onClick={() => header.column.getToggleSortingHandler()}
                  isFirstItem={index === 0}
                >
                  <StyledHeaderContent isFirstColumn={index === 0}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </StyledHeaderContent>
                  {index !== 0 && header.column.getCanSort() && (
                    <StyledSortIndicator>
                      {header.column.getIsSorted() === 'asc'
                        ? '↑'
                        : header.column.getIsSorted() === 'desc'
                          ? '↓'
                          : '↕'}
                    </StyledSortIndicator>
                  )}
                </StyledContainerOrderIndicatorHeader>
              )}
            </StyledTh>
          ))}
        </StyledTr>
      ))}
    </StyledThead>
  );
};

const StyledThead = styled.thead`
  position: sticky;
  z-index: 2;
  text-align: left;
  color: #26333b;
  background: #ffffff;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  /* border-bottom: 2px solid #3b485b; */
`;

const StyledTr = styled.tr``;

const StyledTh = styled.th<{ isFirstColumn: boolean }>`
  padding: 5px 16px;
  font-weight: 600;
  cursor: pointer;
  flex: ${({ isFirstColumn }) => (isFirstColumn ? '0 0 auto' : '1 0 0')};
  /* border-right: 1px solid #b1b7bb; */
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ isFirstColumn }) => (isFirstColumn ? 'auto' : 'initial')};
  text-align: left;
`;

const StyledContainerOrderIndicatorHeader = styled.div<{
  getCanSort: boolean;
  isFirstItem: boolean;
}>`
  display: flex;
  height: 2.8125rem;
  gap: 0.375rem;
  align-items: center;
  justify-content: ${({ isFirstItem }) => (isFirstItem ? 'center' : 'space-between')};
`;

const StyledHeaderContent = styled.div<{ isFirstColumn: boolean }>`
  text-overflow: ellipsis;
  color: #26333b;
  font-weight: 600;

  ${({ isFirstColumn }) =>
    isFirstColumn &&
    `
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

const StyledSortIndicator = styled.span`
  font-size: 0.75rem;
  color: #6b757c;
  margin-left: 0.25rem;
`;

export default Head;

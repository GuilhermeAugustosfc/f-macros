import React from 'react';
import { type SortingState, type Table, flexRender } from '@tanstack/react-table';
import OrderIndicator from 'src/components/Table/OrderIndicator';
import { type TableVideoItem } from 'src/types/filter';
import { ContainerOrderIndicatorHeader, Th, Thead } from './style';

interface Props {
  table: Table<TableVideoItem>;
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

  const OrderIndicatorObj = {
    asc: <OrderIndicator asc />,
    desc: <OrderIndicator desc />,
    false: <OrderIndicator />,
  };
  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <Th
              key={header.id}
              colSpan={header.colSpan}
              onClick={() => {
                handleSort(header.column.id, header.column.getIsSorted());
              }}
            >
              {header.isPlaceholder ? null : (
                <ContainerOrderIndicatorHeader
                  sort={header.column.getCanSort()}
                  onClick={() => {
                    header.column.getToggleSortingHandler();
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {OrderIndicatorObj[header.column.getIsSorted() as 'asc' | 'desc' | 'false'] &&
                  index != 0
                    ? OrderIndicatorObj[header.column.getIsSorted() as 'asc' | 'desc' | 'false']
                    : ''}
                </ContainerOrderIndicatorHeader>
              )}
            </Th>
          ))}
        </tr>
      ))}
    </Thead>
  );
};

export default Head;

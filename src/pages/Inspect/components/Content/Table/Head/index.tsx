import React, { useContext } from 'react';
import { type Table, flexRender } from '@tanstack/react-table';
import OrderIndicator from 'src/components/Table/OrderIndicator';
import { ContainerOrderIndicatorHeader, Th, Thead } from './style';
import { type DataTableItem, objectWidths } from '../../types';
import { TableContext } from 'src/contexts/table';

interface Props {
  table: Table<DataTableItem>;
}

const Head: React.FC<Props> = ({ table }: Props) => {
  const { setSorting } = useContext(TableContext);

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
          {headerGroup.headers.map((header) => {
            return (
              !header.column.columnDef.meta?.isHidden && (
                <Th
                  className={`${header.column.id}`}
                  widthCell={objectWidths[header.column.id as keyof typeof objectWidths]}
                  onClick={() => {
                    if (header.column.id == 'id') {
                      return;
                    }

                    !header.column.columnDef.meta?.noSorting &&
                      handleSort(
                        header.column.columnDef.meta?.name
                          ? header.column.columnDef.meta?.name
                          : header.column.id,
                        header.column.getIsSorted(),
                      );
                  }}
                  key={header.id}
                  colSpan={header.colSpan}
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
                      !header.column.columnDef.meta?.noSorting
                        ? OrderIndicatorObj[header.column.getIsSorted() as 'asc' | 'desc' | 'false']
                        : ''}
                    </ContainerOrderIndicatorHeader>
                  )}
                </Th>
              )
            );
          })}
        </tr>
      ))}
    </Thead>
  );
};

export default Head;

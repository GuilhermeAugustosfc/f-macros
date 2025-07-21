import React, { useContext, useRef } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Body from './Body';
import Head from './Head';
import { ColumnsFunction } from './columns';
import { ContainerContent, StyledTable } from './styles';
import Pagination from './Pagination';
import { TableContext } from 'src/contexts/table';
import { UnreachableContent } from '../../UnreachableContent';
import { Loading } from '@ftdata/ui';

const Table: React.FC = () => {
  const { checkbox, setCheckbox, dataTable, isLoading, sorting, pagination, setPagination } =
    useContext(TableContext);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columns = ColumnsFunction(setCheckbox, checkbox);
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  const table = useReactTable({
    data: dataTable.data || [],
    columns: columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    pageCount: Math.ceil(dataTable.total / pagination.pageSize),
    manualPagination: true, // Habilita paginação manual
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPagination({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      });

      if (checkbox !== 'all') setCheckbox([]);
    },
  });

  // if (isLoading) {
  //     return <Loading size="xl" variant="light" />;
  // }

  if (!(dataTable.total > 0)) {
    return <UnreachableContent />;
  }

  const heightTable = tableContainerRef.current?.clientHeight || 600;

  return (
    <ContainerContent>
      <div ref={tableContainerRef}>
        <StyledTable id="print-content">
          <Head table={table} />
          <Body table={table} />
        </StyledTable>
      </div>
      <Pagination table={table} />
      {isLoading && (
        <Loading
          id="loading"
          style={{
            position: 'relative',
            background: 'white',
            top: '-' + heightTable + 'px',
          }}
          size="xl"
          variant="light"
        />
      )}
    </ContainerContent>
  );
};

export default Table;

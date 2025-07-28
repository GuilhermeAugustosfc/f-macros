import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useContext } from 'react';
import { TableContext } from 'src/contexts/table';
import { ContainerLoading } from 'src/pages/Settings/styles';
import { ColumnsFunction } from './Columns';
import { Loading } from '@ftdata/ui';
import Empty from 'src/pages/Settings/Empty';
import type {
  DataTableItemResponse,
  DataTableItem,
} from 'src/pages/Inspect/components/Content/types';
import TableComponent from 'src/components/Table';
import { Pagination } from 'src/components/Table/Pagination';
import styled from 'styled-components';

interface TableProps {
  data: DataTableItemResponse | undefined;
  loading: boolean;
}

const Table = ({ data, loading }: TableProps) => {
  const { sorting, pagination, setPagination, setSorting } = useContext(TableContext);
  const columns = ColumnsFunction();
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  const table = useReactTable<DataTableItem>({
    data: data?.data || [],
    columns: columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    pageCount: Math.ceil((data?.total ?? 0) / pagination.pageSize),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPagination({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      });
    },
  });

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <Loading size={'xl'} variant={'light'} />
        </ContainerLoading>
      ) : data && data.total > 0 ? (
        <div>
          <TableComponent<DataTableItem> table={table} setSorting={setSorting} pagination={<></>} />
        </div>
      ) : (
        <Empty />
      )}

      {!loading && data && data.data && data.total > 0 && (
        <Pagination table={table} totalRows={data?.total ?? 0} />
      )}
    </>
  );
};

export const ContainerTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  flex-grow: 1;
  gap: 1.5rem;
`;
export default Table;

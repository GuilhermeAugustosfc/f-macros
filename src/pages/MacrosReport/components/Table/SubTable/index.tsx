import React, { useState } from 'react';

import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import Head from './Head';
import { ColumnsFunction } from './Columns';
import Body from './Body';
import Pagination from './Pagination';
import styled from 'styled-components';
import { Loading } from '@ftdata/ui';

import { getAddress } from 'src/components/Tracking/utils/common';

interface Props {
  reportParams: any;
  isEven: boolean;
  ativo_id: number;
}

const SubTable: React.FC<Props> = ({ reportParams, isEven, ativo_id }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = ColumnsFunction();

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 0,
    pageIndex: 0,
  });

  const fetchData = async (page: number) => {
    try {
      setIsLoading(true);
      const currentLimit = table.getState().pagination.pageSize;

      const currentSorting = table.getState().sorting[0];
      const orderField = currentSorting?.id as string;
      const orderDirection = currentSorting?.desc ? 'desc' : 'asc';
      const requestParams: any = {
        ...reportParams,
        ativo_id: ativo_id.toString(),
        limit: currentLimit,
        page: page,
      };

      if (orderField) {
        requestParams.order_field = orderField;
        requestParams.order = orderDirection;
      }

      const response = { data: { data: [{ loc: [0, 0] }], total: 0 } };
      const newData = response?.data?.data;

      if (!newData || !Array.isArray(newData)) {
        console.error('Erro: Dados da resposta são inválidos ou indefinidos.', response);
        setData([]);
        setPagination((prev) => ({
          ...prev,
          total: 0,
        }));
        setIsLoading(false);
        return;
      }

      const addressParams = newData.map((item, index) => ({
        code: index,
        latitude: item.loc[0],
        longitude: item.loc[1],
      }));

      getAddress(addressParams, (addressFormated) => {
        const dataWithAddresses = newData.map((item, index) => ({
          ...item,
          address: addressFormated[index] || '',
        }));
        setData(dataWithAddresses);
        setIsLoading(false);
      });

      setPagination((prevPagination) => ({
        limit: currentLimit,
        total: response?.data?.total,
        pageIndex: prevPagination.pageIndex,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setIsLoading(false);
    }
  };

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: pagination.total > 0 ? Math.ceil(pagination.total / pagination.limit) : 0,
    debugTable: true,
  });

  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: table.getState().pagination.pageIndex }));
    fetchData(table.getState().pagination.pageIndex + 1);
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    table.getState().sorting,
  ]);

  return (
    <StyledTableWrapper isEven={isEven}>
      {isLoading ? (
        <LoadingContainer>
          <Loading size="xl" variant="light" />
        </LoadingContainer>
      ) : (
        <>
          <StyledTable>
            <Head setSorting={setSorting} table={table} />
            <Body table={table} />
          </StyledTable>
          <Pagination isEven={isEven} total={pagination.total} table={table} />
        </>
      )}
    </StyledTableWrapper>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

const StyledTableWrapper = styled.div<{ isEven: boolean }>`
  padding: 16px;
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: white;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

export default SubTable;

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

interface Props {
  isEven: boolean;
}

const SubTableMacros: React.FC<Props> = ({ isEven }: Props) => {
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

      // Dados fakes baseados na imagem fornecida
      const fakeData = [
        {
          id: '1',
          macro: {
            name: 'Início de jornada',
            color: '#4CAF50',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ),
          },
          inicio: { date: '26/02/2025', time: '7:45:56' },
          fim: { date: '26/02/2025', time: '10:00:52' },
          duracao: '2:14:56',
          endereco: 'Av. Presidente Vargas...',
          ponto_referencia: 'Empresa',
          rota: true,
          motorista: { name: 'Paulo', isActive: false },
        },
        {
          id: '2',
          macro: {
            name: 'Aguardando mudas',
            color: '#FF9800',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ),
          },
          inicio: { date: '26/02/2025', time: '10:00:52' },
          fim: { date: '26/02/2025', time: '15:46:48' },
          duracao: '5:45:56',
          endereco: 'Av. Presidente Vargas...',
          ponto_referencia: 'Empresa',
          rota: true,
          motorista: { name: 'Paulo', isActive: false },
        },
        {
          id: '3',
          macro: {
            name: 'Plantando mudas',
            color: '#2196F3',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 13L12 8L17 13M12 8V20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
          inicio: { date: '26/02/2025', time: '15:46:48' },
          fim: { date: '26/02/2025', time: '18:01:44' },
          duracao: '2:14:56',
          endereco: 'Av. Presidente Vargas...',
          ponto_referencia: 'Empresa',
          rota: true,
          motorista: { name: 'Paulo', isActive: false },
        },
        {
          id: '4',
          macro: {
            name: 'Fim de jornada',
            color: '#E91E63',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M9 9L15 15M15 9L9 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ),
          },
          inicio: { date: '26/02/2025', time: '18:01:44' },
          fim: { date: '26/02/2025', time: '18:01:44' },
          duracao: '-',
          endereco: 'Av. Presidente Vargas...',
          ponto_referencia: 'Empresa',
          rota: true,
          motorista: { name: 'Paulo', isActive: false },
        },
      ];

      // Simular paginação
      const startIndex = (page - 1) * currentLimit;
      const endIndex = startIndex + currentLimit;
      const paginatedData = fakeData.slice(startIndex, endIndex);

      setData(paginatedData);
      setPagination((prevPagination) => ({
        limit: currentLimit,
        total: fakeData.length,
        pageIndex: prevPagination.pageIndex,
      }));

      setIsLoading(false);
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
            <Head table={table} />
            <Body table={table} />
          </StyledTable>
          <Pagination total={pagination.total} table={table} />
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
  padding: 12px;
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  overflow: hidden;
  border-radius: 8px;
  margin: 8px 0;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  border-collapse: collapse;
`;

export default SubTableMacros;

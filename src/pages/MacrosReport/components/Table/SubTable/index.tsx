import React, { useState } from 'react';

import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
  getExpandedRowModel,
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

const SubTable: React.FC<Props> = ({ isEven }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllExpanded = () => {
    setAllExpanded(!allExpanded);
    if (allExpanded) {
      setExpandedRowId(null);
    }
  };

  const columns = ColumnsFunction(allExpanded, toggleAllExpanded);

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 0,
    pageIndex: 0,
  });

  const fetchData = async (page: number) => {
    try {
      setIsLoading(true);
      const currentLimit = table.getState().pagination.pageSize;

      // Simular ordenação se necessário

      // Dados fakes baseados na imagem fornecida
      const fakeData = [
        {
          grupo_macros: 'Fazenda 4 Estações',
          duracao_total: '08:00',
        },
        {
          grupo_macros: 'Plantio Norte',
          duracao_total: '12:30',
        },
        {
          grupo_macros: 'Colheita Sul',
          duracao_total: '15:45',
        },
        {
          grupo_macros: 'Irrigação Central',
          duracao_total: '06:20',
        },
        {
          grupo_macros: 'Fertilização Leste',
          duracao_total: '09:15',
        },
        {
          grupo_macros: 'Monitoramento Oeste',
          duracao_total: '11:30',
        },
        {
          grupo_macros: 'Manutenção Geral',
          duracao_total: '04:45',
        },
        {
          grupo_macros: 'Controle de Pragas',
          duracao_total: '07:20',
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
    data,
    columns: columns as ColumnDef<any>[],
    state: {
      sorting,
      expanded: allExpanded
        ? data.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
        : expandedRowId
          ? { [expandedRowId]: true }
          : {},
    },
    onSortingChange: setSorting,
    onExpandedChange: (updater) => {
      const newExpanded =
        typeof updater === 'function' ? updater(table.getState().expanded) : updater;
      const expandedKeys = Object.keys(newExpanded);

      if (expandedKeys.length === 0) {
        setAllExpanded(false);
        setExpandedRowId(null);
      } else if (expandedKeys.length === data.length) {
        setAllExpanded(true);
        setExpandedRowId(null);
      } else {
        setAllExpanded(false);
        setExpandedRowId(expandedKeys[0]);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
            <Body table={table} isEven={isEven} />
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

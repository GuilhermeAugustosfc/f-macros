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
import { type GetReportsParams } from '../../../types';
import { getReportsDetail } from '../../../requets';
import { useQuery } from 'react-query';

interface Props {
  isEven: boolean;
  params?: GetReportsParams;
  ativoId?: number;
}

const SubTable: React.FC<Props> = ({ isEven, params = {}, ativoId }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<any[]>([]);
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

  // Query para buscar dados detalhados
  const { data: detailData, isFetching: detailLoading } = useQuery(
    `get_report_detail/${ativoId}/${JSON.stringify(params)}`,
    () => getReportsDetail({ ...params, ativos_ids: ativoId ? ativoId.toString() : '' }),
    {
      enabled: Boolean(ativoId && params?.customer_id),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  );

  React.useEffect(() => {
    if (detailData?.data?.data) {
      const apiData = detailData.data.data.map((item: any) => ({
        grupo_macros: item.desc_grupo_macros,
        duracao_total: item.jornada_total,
        items: item.items,
        historics: item.historics,
      }));
      setData(apiData);
      setPagination((prev) => ({
        ...prev,
        total: apiData.length,
      }));
    }
  }, [detailData]);

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

  // Removido useEffect que chamava fetchData com dados mockados

  return (
    <StyledTableWrapper isEven={isEven}>
      {detailLoading ? (
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

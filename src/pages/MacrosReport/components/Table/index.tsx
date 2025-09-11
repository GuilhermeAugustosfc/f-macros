import React, { useState, useEffect } from 'react';
import { Loading } from '@ftdata/ui';
import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
  getExpandedRowModel,
  type Table,
} from '@tanstack/react-table';
import { ColumnsFunction } from './Columns';
import Head from './Head';
import Body from './Body';
import styled from 'styled-components';
import { UnreachableContent } from '../../components/UnreachableContent';
import { useQuery } from 'react-query';

const TableContent: React.FC<{
  data: any[];
  params: any;
  setVehicleTableData: React.Dispatch<React.SetStateAction<Table<any> | null>>;
}> = ({ data, params, setVehicleTableData }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllExpanded = () => {
    setAllExpanded(!allExpanded);
    if (allExpanded) {
      setExpandedRowId(null);
    }
  };

  const columns = ColumnsFunction(allExpanded, toggleAllExpanded);
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<any>[],
    state: {
      sorting,
      expanded: allExpanded
        ? data.reduce((acc, row) => ({ ...acc, [row.ativo_id]: true }), {})
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
    debugTable: true,
  });

  useEffect(() => {
    setVehicleTableData(table);
  }, [table]);

  return (
    <>
      <ContainerContent>
        <ContainerTable>
          <StyledTable id="print-content">
            <Head table={table} setSorting={setSorting} />
            <Body
              table={table}
              expandedRowId={expandedRowId}
              setExpandedRowId={setExpandedRowId}
              setSorting={setSorting}
              allExpanded={allExpanded}
              setAllExpanded={setAllExpanded}
              reportParams={params}
            />
          </StyledTable>
        </ContainerTable>
      </ContainerContent>
    </>
  );
};

interface TableProps {
  handleOpenModal: () => void;
  params: any;
  setVehicleTableData: React.Dispatch<React.SetStateAction<Table<any> | null>>;
}

export const CustomTable: React.FC<TableProps> = ({
  handleOpenModal,
  params,
  setVehicleTableData,
}: TableProps) => {
  const { data: reportData, isFetching: reportLoading } = useQuery(
    `get_report/${JSON.stringify(params)}`,
    async () => {
      const response = { data: { data: [] } };
      return response.data.data;
    },
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 100 },
  );

  useEffect(() => {
    setVehicleTableData(null);
  }, [reportData, reportLoading]);

  if (reportLoading) {
    return (
      <LoadingContainer>
        <Loading size="xl" variant="light" />
      </LoadingContainer>
    );
  }
  if (!reportData) {
    return <UnreachableContent openModal={handleOpenModal} />;
  }

  return (
    <TableContent data={reportData} params={params} setVehicleTableData={setVehicleTableData} />
  );
};

const ContainerTable = styled.div`
  max-width: 100%;
  overflow: auto;
  margin: 0 1.5rem;
  padding-bottom: 10rem;
`;

const StyledTable = styled.table`
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  height: 28.125rem;
  position: relative;
  align-items: center;
  justify-content: center;
`;

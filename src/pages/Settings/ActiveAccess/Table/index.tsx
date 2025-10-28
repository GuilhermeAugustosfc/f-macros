import React, { useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { ColumnsFunction } from '../Columns';
import Head from './Head';
import Body from './Body';
import styled from 'styled-components';

interface TableProps {
  data: any[];
  selectedRows: Set<string>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const TableContent: React.FC<TableProps> = ({ data, selectedRows, setSelectedRows }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = ColumnsFunction(selectedRows, setSelectedRows);
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<any>[],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <ContainerContent>
      <ContainerTable>
        <StyledTable>
          <Head table={table} setSorting={setSorting} />
          <Body table={table} />
        </StyledTable>
      </ContainerTable>
    </ContainerContent>
  );
};

const ContainerTable = styled.div`
  max-width: 100%;
  padding-bottom: 2rem;
`;

const StyledTable = styled.table`
  border-radius: 0.25rem;
  width: 100%;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.5rem;
`;

export default TableContent;

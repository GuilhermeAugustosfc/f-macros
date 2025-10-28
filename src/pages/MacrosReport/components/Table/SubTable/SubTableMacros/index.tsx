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

interface Props {
  isEven: boolean;
  items?: any[];
}

const SubTableMacros: React.FC<Props> = ({ isEven, items = [] }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = ColumnsFunction();

  // Converter dados da API para o formato esperado pelas colunas
  const apiData = items.map((item: any) => ({
    id: item.id.toString(),
    macro: {
      name: item.desc_macro,
      color: '#4CAF50', // Cor padrão - pode ser ajustada conforme necessário
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
    inicio: item.inicio ? {
      date: item.inicio.split(' ')[0],
      time: item.inicio.split(' ')[1] || ''
    } : { date: '', time: '' },
    fim: item.fim ? {
      date: item.fim.split(' ')[0],
      time: item.fim.split(' ')[1] || ''
    } : { date: '', time: '' },
    duracao: item.duracao || '',
    endereco: item.loc_inicial ? `${item.loc_inicial[0]}, ${item.loc_inicial[1]}` : '',
    ponto_referencia: item.reference_points_inicial_loc?.[0] || '',
    rota: true,
    motorista: { name: 'Motorista', isActive: false }, // Pode ser ajustado conforme dados disponíveis
  }));

  const table = useReactTable({
    data: apiData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: apiData.length > 0 ? Math.ceil(apiData.length / 10) : 0,
    debugTable: true,
  });

  // Removido useEffect que chamava fetchData com dados mockados

  return (
    <StyledTableWrapper isEven={isEven}>
      <StyledTable>
        <Head table={table} />
        <Body table={table} />
      </StyledTable>
      <Pagination total={apiData.length} table={table} />
    </StyledTableWrapper>
  );
};

const StyledTableWrapper = styled.div<{ isEven: boolean }>`
  padding: 12px;
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  border-radius: 8px;
  margin: 8px 0;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  border-collapse: collapse;
`;

export default SubTableMacros;

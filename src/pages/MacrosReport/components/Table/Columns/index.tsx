import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AddCircleIcon, MinusIcon, VehicleIcon, GroupIcon, ChartIcon, ClockIcon } from '../../svg';
import { useContext } from 'react';
import { ReportsContext } from '../../../../../contexts/reports';

const columnHelper = createColumnHelper<any>();

import styled from 'styled-components';

const DivValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  cursor: pointer;
  svg,
  path {
    stroke: white;
  }
`;

const CellValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  svg,
  path {
    stroke: #26333b;
  }
`;

const DurationValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #26333b;
`;

const AnalysisIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg,
  path {
    stroke: #26333b;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  path {
    stroke: white;
  }
`;

export const ColumnsFunction = (
  allExpanded: boolean,
  toggleAllRowsExpanded: () => void,
): ColumnDef<any, unknown>[] => {
  const { setIsModalDetalhesOpen } = useContext(ReportsContext);
  const allColumns = [
    columnHelper.accessor('ativo_id', {
      header: () => (
        <IconContainer>
          {allExpanded ? (
            <MinusIcon width={24} height={24} stroke="white" onClick={toggleAllRowsExpanded} />
          ) : (
            <AddCircleIcon width={24} height={24} stroke="white" onClick={toggleAllRowsExpanded} />
          )}
        </IconContainer>
      ),
      cell: (info) => (
        <IconContainer>
          {!info.row.getIsExpanded() ? (
            <AddCircleIcon
              width={24}
              height={24}
              stroke="#26333B"
              onClick={() => info.row.toggleExpanded()}
            />
          ) : (
            <MinusIcon
              width={24}
              height={24}
              stroke="#26333B"
              onClick={() => info.row.toggleExpanded()}
            />
          )}
        </IconContainer>
      ),
    }),
    columnHelper.accessor('veiculo', {
      header: () => (
        <DivValue>
          <VehicleIcon width={24} height={24} stroke="white" />
          <span>Veículo</span>
        </DivValue>
      ),
      cell: (info) => <CellValue>{info.row.original.veiculo}</CellValue>,
    }),
    columnHelper.accessor('grupo_macros', {
      header: () => (
        <DivValue>
          <GroupIcon width={24} height={24} stroke="white" />
          <span>Grupo de Macros Vinculados</span>
        </DivValue>
      ),
      cell: (info) => <CellValue>{info.row.original.grupo_macros}</CellValue>,
    }),
    columnHelper.accessor('duracao_total', {
      header: () => (
        <DivValue>
          <ClockIcon width={24} height={24} stroke="white" />
          <span>Duração Total</span>
        </DivValue>
      ),
      cell: (info) => <DurationValue>{info.row.original.duracao_total}</DurationValue>,
    }),
    columnHelper.accessor('analise_detalhada', {
      header: () => (
        <DivValue>
          <ChartIcon width={24} height={24} stroke="white" />
          <span>Análise Detalhada</span>
        </DivValue>
      ),
      cell: () => (
        <AnalysisIcon onClick={() => setIsModalDetalhesOpen(true)}>
          <ChartIcon width={24} height={24} stroke="#26333B" />
        </AnalysisIcon>
      ),
    }),
  ];

  return allColumns;
};

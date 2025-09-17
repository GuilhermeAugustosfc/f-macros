import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { GroupIcon, ClockIcon, AddCircleIcon, MinusIcon } from '../../svg';
import styled from 'styled-components';

const columnHelper = createColumnHelper<any>();

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

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  path {
    stroke: #26333b;
  }
`;

export const ColumnsFunction = (
  allExpanded: boolean,
  toggleAllRowsExpanded: () => void,
): ColumnDef<any>[] => {
  const allColumns = [
    columnHelper.accessor('expand', {
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
    columnHelper.accessor('grupo_macros', {
      header: () => (
        <DivValue>
          <GroupIcon width={24} height={24} stroke="white" />
          <span>Grupo de Macros</span>
        </DivValue>
      ),
      cell: (info) => <CellValue>{info.getValue()}</CellValue>,
    }),
    columnHelper.accessor('duracao_total', {
      header: () => (
        <DivValue>
          <ClockIcon width={24} height={24} stroke="white" />
          <span>Duração Total</span>
        </DivValue>
      ),
      cell: (info) => <DurationValue>{info.getValue()}</DurationValue>,
    }),
  ];

  return allColumns as ColumnDef<any>[];
};

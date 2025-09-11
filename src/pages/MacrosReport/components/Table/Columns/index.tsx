import React from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AddCircleIcon, MinusIcon, VehicleIcon } from '../../svg';

const columnHelper = createColumnHelper<any>();

import styled from 'styled-components';
import { useTranslation } from '@ftdata/core';

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
  const { t } = useTranslation('114');
  const allColumns = [
    columnHelper.accessor('ativo_id', {
      header: () => (
        <IconContainer>
          {allExpanded ? (
            <MinusIcon stroke="white" onClick={toggleAllRowsExpanded} />
          ) : (
            <AddCircleIcon stroke="white" onClick={toggleAllRowsExpanded} />
          )}
        </IconContainer>
      ),
      cell: (info) => (
        <IconContainer>
          {!info.row.getIsExpanded() ? (
            <AddCircleIcon stroke="#26333B" onClick={() => info.row.toggleExpanded()} />
          ) : (
            <MinusIcon stroke="#26333B" onClick={() => info.row.toggleExpanded()} />
          )}
        </IconContainer>
      ),
    }),
    columnHelper.accessor('ativo_desc', {
      header: () => (
        <DivValue>
          <VehicleIcon stroke="white" />
          <span>{t('vehicle')}</span>
        </DivValue>
      ),
      cell: (info) => <DivValue>{info.row.original.ativo_desc}</DivValue>,
    }),
  ];

  return allColumns;
};

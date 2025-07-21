import React, { useContext } from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { type Table } from '@tanstack/react-table';
import { NextIcon, PreviousIcon } from '../../../svg';
import type { DataTableItem } from '../../types';
import { TableContext } from 'src/contexts/table';
import { t } from 'src/App';

interface Props {
  table: Table<DataTableItem>;
}

const Pagination: React.FC<Props> = ({ table }: Props) => {
  const { dataTable, pagination, setPagination } = useContext(TableContext);

  return (
    <ContainerPagination>
      <DivLeft>
        <p>{t('displaying')}</p>

        <Select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination({
              pageIndex: pagination.pageIndex,
              pageSize: parseInt(e.target.value) | 0,
            });
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <span>
          de
          <span style={{ marginLeft: '5px', marginRight: '5px' }}>{dataTable.total}</span>
          <span>{t('records')}</span>
        </span>
      </DivLeft>

      <DivRight>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <PreviousIcon />
        </Button>
        {pagination.pageIndex >= 1 && (
          <PageNumber onClick={() => table.previousPage()} isPrevious>
            {pagination.pageIndex}
          </PageNumber>
        )}
        <PageNumber isCurrent>{pagination.pageIndex + 1}</PageNumber>
        {pagination.pageIndex + 2 <= table.getPageCount() && (
          <PageNumber onClick={() => table.nextPage()} isNext>
            {pagination.pageIndex + 2}
          </PageNumber>
        )}
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <NextIcon />
        </Button>
      </DivRight>
    </ContainerPagination>
  );
};

const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3.5rem;
  font-size: ${styleguide.FONT_SIZE_SM};
  font-weight: 500;
  background: ${styleguide.COLOR_NEUTRAL_DAY};
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const DivLeft = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const Select = styled.select`
  border-radius: 0.25rem;
  border: 1px solid ${styleguide.COLOR_NEUTRAL_MEDIUM};
  background-color: transparent;
  width: 4rem;
  height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const DivRight = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 2rem;
  height: 2rem;
`;

const PageNumber = styled.div<{ isCurrent?: boolean; isPrevious?: boolean; isNext?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ isCurrent }) => (isCurrent ? '#ffffff' : '#6b757c')};
  cursor: pointer;
  background: ${({ isCurrent }) => (isCurrent ? styleguide.COLOR_BRAND_MEDIUM : 'transparent')};
`;

export default Pagination;

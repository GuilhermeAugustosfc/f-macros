import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
import { type Table } from '@tanstack/react-table';
import { useTranslation } from '@ftdata/core';
import { NextIcon, PreviousIcon } from '../../svg';

interface Props {
  table: Table<any>;
}

const Pagination: React.FC<Props> = ({ table }: Props) => {
  const { t } = useTranslation('114');

  // Define o mínimo de itens por página e obtém o total de registros
  const minimumItems = 5;
  const totalRecords = Object.values(table.getRowModel().rowsById).length;

  // Obtém o tamanho de página e a página atual (lembrando que pageIndex inicia em 0)
  const pageSize = table.getState().pagination.pageSize;
  const currentPage = table.getState().pagination.pageIndex + 1;

  // Define os índices inicial e final dos itens exibidos na página atual
  const startIndex = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalRecords);

  const generatePageOptions = (total: number, min: number): number[] => {
    if (total <= min) return [min];
    const options = new Set<number>();
    options.add(min);
    const count = 4; // quantidade de intervalos (resultando em 5 opções no total)
    const increment = (total - min) / count;
    for (let i = 1; i < count; i++) {
      let option = Math.round(min + i * increment);
      // Arredonda para o múltiplo de 5 mais próximo
      option = Math.round(option / 5) * 5;
      if (option > min && option < total) {
        options.add(option);
      }
    }
    options.add(total);
    return Array.from(options).sort((a, b) => a - b);
  };

  const pageOptions = generatePageOptions(totalRecords, minimumItems);

  // Garante que, se o total de registros for menor que o mínimo, o tamanho da página seja ajustado para minimumItems
  useEffect(() => {
    if (totalRecords < minimumItems && table.getState().pagination.pageSize !== minimumItems) {
      table.setPageSize(minimumItems);
    }
  }, [totalRecords, table, minimumItems]);

  return (
    <ContainerPagination>
      <DivLeft>
        <p>
          {totalRecords > 0
            ? `${t('displaying')} ${startIndex} a ${endIndex} de ${totalRecords} ${t('records')}`
            : t('noRecordsFound')}
        </p>
        <Select
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {pageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </DivLeft>

      <DivRight>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <PreviousIcon />
        </Button>
        {currentPage - 1 >= 1 && (
          <PageNumber onClick={() => table.previousPage()} isPrevious>
            {currentPage - 1}
          </PageNumber>
        )}
        <PageNumber isCurrent>{currentPage}</PageNumber>
        {currentPage + 1 <= table.getPageCount() && (
          <PageNumber onClick={() => table.nextPage()} isNext>
            {currentPage + 1}
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
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  box-shadow: 0px 8px 16px 0px rgba(107, 117, 124, 0.32);
  display: flex;
  padding: 1.5rem 2rem;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  bottom: 0;
  left: 0;
  right: 0px;
  position: fixed;
`;

const DivLeft = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;
const Select = styled.select`
  border-radius: 0.25rem;
  border: 1px solid ${tokens.COLOR_NEUTRAL_MEDIUM};
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
  background: ${({ isCurrent }) => (isCurrent ? tokens.COLOR_BRAND_MEDIUM : 'transparent')};
`;

export default Pagination;

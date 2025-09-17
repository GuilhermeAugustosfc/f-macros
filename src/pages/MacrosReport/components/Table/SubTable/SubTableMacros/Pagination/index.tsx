import { type Table } from '@tanstack/react-table';
import { NextIcon, PreviousIcon } from 'src/pages/MacrosReport/components/svg';
import styled from 'styled-components';

interface Props {
  table: Table<any>;
  total: number;
}

const Pagination: React.FC<Props> = ({ table, total }: Props) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const startItem = currentPage * pageSize - pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <PaginationContainer>
      <PaginationInfo>
        Mostrando {startItem} a {endItem} de {total} registros
      </PaginationInfo>

      <PaginationControls>
        <PageButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <PreviousIcon />
          Anterior
        </PageButton>

        <PageInfo>
          Página {currentPage} de {pageCount}
        </PageInfo>

        <PageButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próxima
          <NextIcon />
        </PageButton>
      </PaginationControls>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
`;

export default Pagination;

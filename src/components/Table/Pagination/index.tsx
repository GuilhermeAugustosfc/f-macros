import { type JSX } from 'react';
import Previous from '../../../assets/previous';
import Next from '../../../assets/next';
import type { Table } from '@tanstack/react-table';
import { ContainerPagination, DivLeft, DivRight } from './styles';
import { t } from '../../../App';

interface Props<T> {
  table: Table<T>;
}

export const Pagination = <T,>({ table }: Props<T>): JSX.Element => {
  const pageSize = table.getState().pagination.pageIndex + 1;

  return (
    <ContainerPagination>
      <DivLeft>
        <p>
          {t('displaying_page')} {pageSize} {t('of_2')} {table.getState().pagination.pageSize} de{' '}
          {Object.values(table.getRowModel().rowsById).length} {t('records')}
        </p>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span>{t('records_per_page')}</span>
      </DivLeft>
      <DivRight>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <Previous />
        </button>
        {pageSize - 1 >= 1 && (
          <div onClick={() => table.previousPage()} className="pageAfter">
            {pageSize - 1}
          </div>
        )}
        <div className="pageCurrent">{pageSize}</div>
        {pageSize + 1 <= table.getPageCount() && (
          <div onClick={() => table.nextPage()} className="pageNext">
            {pageSize + 1}
          </div>
        )}
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <Next />
        </button>
      </DivRight>
    </ContainerPagination>
  );
};

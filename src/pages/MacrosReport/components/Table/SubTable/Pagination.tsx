import React from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';
import { Table } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { VehicleLog } from '../type';
import { NextIcon, PreviousIcon } from '../../svg';

interface Props {
    table: Table<VehicleLog>;
    isEven: boolean;
    total: number;
}

const Pagination: React.FC<Props> = ({ table, isEven, total }: Props) => {
    const { t } = useTranslation('114');
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    const hasMultiplePages = total > table.getState().pagination.pageSize;

    // Cria um array com a página anterior (se houver), a página atual e a próxima página (se houver).
    const paginas: number[] = [];
    if (pageIndex > 0) {
        paginas.push(pageIndex - 1);
    }
    paginas.push(pageIndex);
    if (pageIndex < pageCount - 1) {
        paginas.push(pageIndex + 1);
    }

    // Adiciona a última página se ela não estiver no array
    if (pageCount > 0 && !paginas.includes(pageCount - 1)) {
        paginas.push(pageCount - 1);
    }

    return (
        <ContainerPagination isEven={isEven}>
            <DivLeft>
                <p>{t('displaying')}</p>

                <Select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        const newLimit = Number(e.target.value);
                        table.setPageSize(newLimit);
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
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>{total}</span>
                    <span>{t('records')}</span>
                </span>
            </DivLeft>

            {hasMultiplePages && (
                <DivRight>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <PreviousIcon />
                    </Button>

                    {paginas.map((pagina) => (
                        <PageNumber
                            key={pagina}
                            onClick={() => table.setPageIndex(pagina)}
                            isCurrent={pagina === pageIndex}
                        >
                            {pagina + 1}
                        </PageNumber>
                    ))}

                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <NextIcon />
                    </Button>
                </DivRight>
            )}
        </ContainerPagination>
    );
};

const ContainerPagination = styled.div<{ isEven: boolean }>`
    display: flex;
    padding: 24px;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    font-size: ${styleguide.FONT_SIZE_SM};
    font-weight: 500;
    background: ${({ isEven }) => (isEven ? styleguide.COLOR_NEUTRAL_DAY : 'rgba(136, 145, 159, 0.08)')};
`;

const DivLeft = styled.div`
    display: flex;
    gap: 0.75rem;
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

const PageNumber = styled.div<{ isCurrent?: boolean }>`
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

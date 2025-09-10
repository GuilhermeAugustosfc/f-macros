import React from 'react';
import { SortingState, Table, flexRender } from '@tanstack/react-table';
import { VehicleData } from '../type';
import OrderIndicator from 'src/pages/FuelReport/components/OrderIndicator';
import styled from 'styled-components';

interface Props {
    table: Table<VehicleData>;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const Head: React.FC<Props> = ({ table, setSorting }: Props) => {
    const handleSort = (columnId: string, currentSort: string | false) => {
        const sortingStates = {
            false: { desc: true },

            asc: { desc: true },
            desc: { desc: false },
        };
        setSorting([{ id: columnId, ...sortingStates[currentSort as keyof typeof sortingStates] }]);
    };
    return (
        <StyledThead>
            {table.getHeaderGroups().map((headerGroup) => (
                <StyledTr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                        <StyledTh
                            className={`${header.column.id}`}
                            onClick={() => handleSort(header.column.id, header.column.getIsSorted())}
                            key={header.id}
                            colSpan={header.colSpan}
                            isFirstColumn={index === 0}
                        >
                            {header.isPlaceholder ? null : (
                                <StyledContainerOrderIndicatorHeader
                                    getCanSort={header.column.getCanSort()}
                                    onClick={() => header.column.getToggleSortingHandler()}
                                    isFirstItem={index === 0}
                                >
                                    <StyledHeaderContent isFirstColumn={index === 0}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </StyledHeaderContent>
                                    {index !== 0 &&
                                        ({
                                            asc: <OrderIndicator asc />,
                                            desc: <OrderIndicator desc />,
                                        }[header.column.getIsSorted() as string] ?? <OrderIndicator />)}
                                </StyledContainerOrderIndicatorHeader>
                            )}
                        </StyledTh>
                    ))}
                </StyledTr>
            ))}
        </StyledThead>
    );
};

const StyledThead = styled.thead`
    position: sticky;
    z-index: 2;
    text-align: left;
    color: #fff;
    background: #3b485b;
    font-size: 0.75rem; // 12px para rem
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
`;

const StyledTr = styled.tr``;

const StyledTh = styled.th<{ isFirstColumn: boolean }>`
    padding: ${({ isFirstColumn }) => (isFirstColumn ? '0' : '0.375rem 0.625rem')}; // 6px 10px para rem
    font-weight: 600;
    cursor: pointer;
    flex: ${({ isFirstColumn }) => (isFirstColumn ? '0 0 auto' : '1 0 0')};
    border-right: 1px solid #b1b7bb;
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${({ isFirstColumn }) => (isFirstColumn ? 'auto' : 'initial')};
`;

const StyledContainerOrderIndicatorHeader = styled.div<{ getCanSort: boolean; isFirstItem: boolean }>`
    display: flex;
    height: ${({ isFirstItem }) => (isFirstItem ? 'auto' : '2.8125rem')}; // 45px para rem
    gap: ${({ isFirstItem }) => (isFirstItem ? '0' : '0.375rem')}; // 6px para rem
    align-items: center;
    justify-content: ${({ isFirstItem }) => (isFirstItem ? 'center' : 'space-between')};
`;

const StyledHeaderContent = styled.div<{ isFirstColumn: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;

    .th-value {
        display: flex;
        gap: 6px;
        align-items: center;

        svg,
        path {
            stroke: white;
        }
    }

    ${({ isFirstColumn }) =>
        isFirstColumn &&
        `
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

export default Head;

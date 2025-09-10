import React from 'react';
import { SortingState, Table, flexRender } from '@tanstack/react-table';
import { VehicleLog } from '../type';
import OrderIndicator from 'src/pages/FuelReport/components/OrderIndicator';
import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';

interface Props {
    table: Table<VehicleLog>;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const Head: React.FC<Props> = ({ table, setSorting }) => {
    const handleSort = (columnId: string, currentSort: string | false) => {
        const sortingStates = {
            false: { desc: false },
            asc: { desc: true },
            desc: { desc: false },
        };
        setSorting([{ id: columnId, ...sortingStates[currentSort as keyof typeof sortingStates] }]);
    };

    return (
        <StyledThead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <StyledTh
                            key={header.id}
                            onClick={() => handleSort(header.column.id, header.column.getIsSorted())}
                            colSpan={header.colSpan}
                        >
                            {header.isPlaceholder ? null : (
                                <StyledHeaderContent>
                                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                    <OrderIndicator
                                        asc={header.column.getIsSorted() === 'asc'}
                                        desc={header.column.getIsSorted() === 'desc'}
                                    />
                                </StyledHeaderContent>
                            )}
                        </StyledTh>
                    ))}
                </tr>
            ))}
        </StyledThead>
    );
};

const StyledThead = styled.thead`
    text-align: left;
    color: ${styleguide.COLOR_NEUTRAL_DAY};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;

    tr {
        background: #6b757c;
    }
`;

const StyledTh = styled.th`
    color: ${styleguide.COLOR_NEUTRAL_DAY};
    border-right: 1px solid ${styleguide.COLOR_NEUTRAL_DAY};
    cursor: pointer;
    height: 64px;
    padding: 7px 16px;
`;

const StyledHeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
`;

export default Head;

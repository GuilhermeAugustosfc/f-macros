import React from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { VehicleLog } from '../type';
import styled from 'styled-components';

interface Props {
    table: Table<VehicleLog>;
}

const Body: React.FC<Props> = ({ table }: Props) => {
    return (
        <Tbody>
            {table.getRowModel().rows.map((row) => {
                const events = row.original.events;
                return (
                    <TrBody events={events} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TdBody key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TdBody>
                        ))}
                    </TrBody>
                );
            })}
        </Tbody>
    );
};

export const Tbody = styled.tbody`
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    text-align: left;
`;

export const TrBody = styled.tr<{ events: string }>`
    background: ${({ events }) => (events === 'supply' ? '#DAF1E9' : events === 'draining' ? '#FBE5E9' : '#FFF')};
    color: #26333b;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
    border-right: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
`;
export const TdBody = styled.td`
    height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    border-right: 1px solid #f5f5f5;
    div {
        display: flex;
        gap: 10px;
        cursor: pointer;
    }
`;

export default Body;

import { type Table, flexRender } from '@tanstack/react-table';
import OrderIndicator from '../../../../OrderIndicator';
import styled from 'styled-components';

interface Props {
  table: Table<any>;
}

const Head: React.FC<Props> = ({ table }: Props) => {
  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TrHead key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <ThHead key={header.id}>
              <div
                onClick={header.column.getToggleSortingHandler()}
                style={{
                  cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'flex-start',
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && (
                  <SortIcon>
                    <OrderIndicator
                      asc={header.column.getIsSorted() === 'asc'}
                      desc={header.column.getIsSorted() === 'desc'}
                    />
                  </SortIcon>
                )}
              </div>
            </ThHead>
          ))}
        </TrHead>
      ))}
    </Thead>
  );
};

const Thead = styled.thead`
  background-color: #6b7280;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
`;

const TrHead = styled.tr`
  height: 48px;
`;

const ThHead = styled.th`
  padding: 12px 16px;
  text-align: left;
  border-right: 1px solid #9ca3af;
  font-weight: 600;
  font-size: 0.875rem;

  &:last-child {
    border-right: none;
  }
`;

const SortIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export default Head;

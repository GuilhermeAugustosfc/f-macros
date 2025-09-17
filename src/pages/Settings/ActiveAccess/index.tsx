import { useState, type JSX } from 'react';
import {
  ContainerActions,
  ContainerHeader,
  ContainerInformation,
  ContainerInput,
  ContainerLoading,
  ContainerTabContent,
  ContainerTableGrid,
  HeaderDescription,
} from '../styles';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { ColumnsFunction } from './Columns';
import { Button, Loading, Paragraph, Title } from '@ftdata/ui';

import { useQuery } from 'react-query';
// import Table from '../../../components/Table';
interface ActivatedAccessItem {
  checkbox: boolean;
  ativo_id: string;
  client: string;
  plate: string;
  activation_date: string;
  deactivation_date: string;
  is_active: number;
}
import CountAccess from './CountAccess';
import { useTranslation } from '@ftdata/core';
import Empty from '../Empty';
// import { Pagination } from 'src/components/Table/Pagination';
import { ErrorIcon, SearchIcon } from 'src/pages/MacrosReport/components/svg';

interface ICountData {
  access: number;
  available: number;
  unavailable: number;
}

export const INITIAL_DATA_COUNT: ICountData = {
  access: 0,
  available: 0,
  unavailable: 0,
};

export function ActiveAccess(): JSX.Element {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValue, setFilterValue] = useState('');
  const columns = ColumnsFunction();

  const { data: countAccess, refetch: refetchCountAccess } = useQuery(
    'countAccess',
    () => INITIAL_DATA_COUNT,
  );

  const {
    data: listAccess,
    refetch: refetchListAccess,
    isLoading,
  } = useQuery('listAccess', () => [] as ActivatedAccessItem[]);

  const table = useReactTable({
    data: listAccess || [],
    columns: columns,
    state: {
      globalFilter: filterValue,
      sorting,
    },
    globalFilterFn: (row, _columnID, value: string) => {
      const plate = `${row.original.plate.toLocaleLowerCase()} - ${row.original.ativo_id.toLocaleLowerCase()}`;
      const isPlate = plate.includes(value.toLocaleLowerCase());
      const isClient = row.original.client.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      return isPlate || isClient;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilterValue,
    debugTable: true,
  });

  const handleAccess = async (action: 'deactivate' | 'activate') => {
    const activeValue = action === 'activate' ? 0 : 1;
    const items = table
      .getGroupedSelectedRowModel()
      .rows.filter((e) => e.original.is_active === activeValue);

    if (items.length > 0) {
      if (action === 'activate') {
        console.log('activate');
      } else {
        console.log('deactivate');
      }
    }

    table.resetRowSelection();
    refetchListAccess();
    refetchCountAccess();
    notificationSuccess(action);
  };

  const notificationSuccess = (action: string) => {
    return action;
  };

  return (
    <>
      <ContainerTabContent>
        <ContainerHeader>
          <ContainerInformation>
            <HeaderDescription>
              <div className="container-title">
                <Title size="md">{t('access_activation')}</Title>
                <Paragraph size="sm">
                  {t('activate_the_accesses_available_for_those_selected_for_your_operation')}
                </Paragraph>
              </div>

              <CountAccess {...(countAccess || INITIAL_DATA_COUNT)} />
            </HeaderDescription>

            <ContainerActions>
              <ContainerInput>
                <div>
                  <SearchIcon />
                  <input
                    onChange={(value) => setFilterValue(value.target.value)}
                    type="text"
                    value={filterValue}
                    placeholder={t('research')}
                  />
                </div>
                {filterValue != '' && (
                  <ErrorIcon className="close" onClick={() => setFilterValue('')} />
                )}
              </ContainerInput>
              {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
                <div className="btn-actions">
                  <Button variant="primary" onClick={() => handleAccess('activate')}>
                    {t('activate')}
                  </Button>
                  <Button variant="primary" onClick={() => handleAccess('deactivate')}>
                    {t('deactivate')}
                  </Button>
                </div>
              )}
            </ContainerActions>
          </ContainerInformation>
        </ContainerHeader>
        {isLoading ? (
          <ContainerLoading>
            <Loading size={'xl'} variant={'light'} />
          </ContainerLoading>
        ) : listAccess && listAccess?.length > 0 ? (
          <ContainerTableGrid>
            {/* <Table<ActivatedAccessItem> table={table} setSorting={setSorting} pagination={<></>} /> */}
          </ContainerTableGrid>
        ) : (
          <Empty />
        )}
      </ContainerTabContent>
      {/* {!isLoading && listAccess && listAccess.length > 0 && <Pagination table={table} />} */}
    </>
  );
}

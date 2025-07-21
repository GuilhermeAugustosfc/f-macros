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
import {
  activeAccess,
  deactiveAccess,
  fetchCountAccess,
  fetchListAccess,
} from '../../../components/Apis';
import SearchIcon from '../../../assets/svgs/search-loupe.svg?react';
import CloseIcon from '.././../../assets/svgs/close.svg?react';
import { useQuery } from 'react-query';
import { Store } from 'react-notifications-component';
import Table from '../../../components/Table';
import { type ActivatedAccessItem } from '../../../shared/DataStructure';
import CountAccess from './CountAccess';
import { t } from '../../../App';

export const INITIAL_DATA_COUNT = {
  access: 0,
  available: 0,
  unavailable: 0,
};

export function ActiveAccess(): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValue, setFilterValue] = useState('');
  const columns = ColumnsFunction();
  const { data: countAccess, refetch: refetchCountAccess } = useQuery(
    'countAccess',
    fetchCountAccess,
  );
  const {
    data: listAccess,
    refetch: refetchListAccess,
    isLoading,
  } = useQuery('listAccess', fetchListAccess);
  const table = useReactTable({
    data: listAccess || [],
    columns: columns,
    state: {
      globalFilter: filterValue,
      sorting,
    },
    globalFilterFn: (row, _columnID, value: string) => {
      const plate = `${row.original.plate.toLocaleLowerCase()} - ${row.original.ativo.toLocaleLowerCase()}`;
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
    const arrayOfIds = items.map((data) => data.original.ativo_id);

    if (items.length > 0) {
      if (action === 'activate') {
        await activeAccess({ ativos_id: arrayOfIds });
      } else {
        await deactiveAccess({ ativos_id: arrayOfIds });
      }
    }

    table.resetRowSelection();
    refetchListAccess();
    refetchCountAccess();
    notificationSuccess(action);
  };

  const notificationSuccess = (action: string) => {
    return Store.addNotification({
      content: (
        <div>
          <span> Sucesso </span>
          <span>{action === 'activate' ? 'Ativado' : 'Desativado'} com sucesso!</span>
        </div>
      ),
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__slideInRight'],
      animationOut: ['animate__animated', 'animate__slideOutRight'],
      dismiss: {
        pauseOnHover: false,
        duration: 6000,
        onScreen: false,
      },
    });
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
              <CountAccess {...countAccess} />
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
                  <CloseIcon className="close" onClick={() => setFilterValue('')} />
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
        <ContainerTableGrid>
          {isLoading ? (
            <ContainerLoading>
              <Loading size={'xl'} variant={'light'} />
            </ContainerLoading>
          ) : (
            listAccess &&
            listAccess.length > 0 && (
              <Table<ActivatedAccessItem> table={table} setSorting={setSorting} />
            )
          )}
        </ContainerTableGrid>
      </ContainerTabContent>
    </>
  );
}

import React, { useState, type JSX } from 'react';
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
import { Button, Loading, Paragraph, Title } from '@ftdata/ui';
import TableContent from './Table';
import { useQuery } from 'react-query';
interface ActivatedAccessItem {
  checkbox: boolean;
  ativo_id: string;
  client: string;
  plate: string;
  vehicle: string;
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
  available: 6,
  unavailable: 0,
};

// Dados fake baseados na imagem
const FAKE_DATA: ActivatedAccessItem[] = [
  {
    checkbox: false,
    ativo_id: '345',
    client: 'Márcio',
    plate: 'JHG-6372',
    vehicle: 'Fox',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
  {
    checkbox: false,
    ativo_id: '236',
    client: 'Márcio',
    plate: 'POG-6382',
    vehicle: 'BMW',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
  {
    checkbox: false,
    ativo_id: '12',
    client: 'Márcio',
    plate: 'FTS-9243',
    vehicle: 'Gol',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
  {
    checkbox: false,
    ativo_id: '67',
    client: 'Márcio',
    plate: 'QWD-1246',
    vehicle: 'Fox',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
  {
    checkbox: false,
    ativo_id: '98',
    client: 'Márcio',
    plate: 'CGH-7548',
    vehicle: 'Gol',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
  {
    checkbox: false,
    ativo_id: '125',
    client: 'Márcio',
    plate: 'LIH-7543',
    vehicle: 'Fox',
    activation_date: '',
    deactivation_date: '',
    is_active: 0, // Desativado
  },
];

export function ActiveAccess(): JSX.Element {
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState('');
  const [, setTableData] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: countAccess, refetch: refetchCountAccess } = useQuery(
    'countAccess',
    () => INITIAL_DATA_COUNT,
  );

  const {
    data: listAccess,
    refetch: refetchListAccess,
    isLoading,
  } = useQuery('listAccess', () => FAKE_DATA);

  // Filtro local dos dados
  const filteredData = React.useMemo(() => {
    if (!listAccess) return [];
    if (!filterValue) return listAccess;

    return listAccess.filter((item) => {
      const plate = `${item.plate.toLowerCase()} - ${item.ativo_id.toLowerCase()}`;
      const isPlate = plate.includes(filterValue.toLowerCase());
      const isClient = item.client.toLowerCase().includes(filterValue.toLowerCase());
      return isPlate || isClient;
    });
  }, [listAccess, filterValue]);

  const handleAccess = async (action: 'deactivate' | 'activate') => {
    if (selectedRows.size === 0) return;

    const selectedItems = filteredData.filter((item) => selectedRows.has(item.ativo_id));

    if (action === 'activate') {
      console.log('activate', selectedItems);
    } else {
      console.log('deactivate', selectedItems);
    }

    // Limpar seleção após ação
    setSelectedRows(new Set());
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
              {selectedRows.size > 0 && (
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
        ) : filteredData && filteredData?.length > 0 ? (
          <ContainerTableGrid>
            <TableContent
              data={filteredData}
              setTableData={setTableData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </ContainerTableGrid>
        ) : (
          <Empty />
        )}
      </ContainerTabContent>
      {/* {!isLoading && listAccess && listAccess.length > 0 && <Pagination table={table} />} */}
    </>
  );
}

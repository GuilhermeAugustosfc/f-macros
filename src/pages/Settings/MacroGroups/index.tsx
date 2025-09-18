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
import { useQuery } from 'react-query';
import { useTranslation } from '@ftdata/core';
import Empty from '../Empty';
import { AddCircleIcon, ErrorIcon, SearchIcon } from 'src/pages/MacrosReport/components/svg';
import TableContent from './Table';
import { useNavigate } from 'react-router-dom';

interface MacroGroupItem {
  checkbox: boolean;
  id: string;
  client: string;
  vehicle: string;
  macroGroup: string;
  lastModification: string;
}

// Dados mockados baseados na imagem fornecida
const FAKE_MACRO_GROUPS_DATA: MacroGroupItem[] = [
  {
    checkbox: false,
    id: '1',
    client: 'Transportes SA',
    vehicle: 'CD5678',
    macroGroup: 'Ignição',
    lastModification: '26/02/2025 7:45:56',
  },
  {
    checkbox: false,
    id: '2',
    client: 'Agro ABC',
    vehicle: 'VF-5678',
    macroGroup: 'Lavoura',
    lastModification: '26/02/2025 7:45:56',
  },
  {
    checkbox: false,
    id: '3',
    client: 'Fast Tracker',
    vehicle: '40 veículos',
    macroGroup: 'Condutor',
    lastModification: '26/02/2025 7:45:56',
  },
  {
    checkbox: false,
    id: '4',
    client: 'Rastreio Já',
    vehicle: '2 veículos',
    macroGroup: 'Tempo de carga',
    lastModification: '26/02/2025 7:45:56',
  },
];

export function MacroGroups(): JSX.Element {
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState('');
  const [, setTableData] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const {
    data: listMacroGroups,
    refetch: refetchListMacroGroups,
    isLoading,
  } = useQuery('listMacroGroups', () => FAKE_MACRO_GROUPS_DATA);

  // Filtro local dos dados
  const filteredData = React.useMemo(() => {
    if (!listMacroGroups) return [];
    if (!filterValue) return listMacroGroups;

    return listMacroGroups.filter((item) => {
      const isClient = item.client.toLowerCase().includes(filterValue.toLowerCase());
      const isVehicle = item.vehicle.toLowerCase().includes(filterValue.toLowerCase());
      const isMacroGroup = item.macroGroup.toLowerCase().includes(filterValue.toLowerCase());
      return isClient || isVehicle || isMacroGroup;
    });
  }, [listMacroGroups, filterValue]);

  const handleCreateMacroGroup = () => {
    navigate('/settings/form');
  };

  const handleMacroGroupAction = async (action: 'edit' | 'delete') => {
    if (selectedRows.size === 0) return;

    const selectedItems = filteredData.filter((item) => selectedRows.has(item.id));

    if (action === 'edit') {
      console.log('edit', selectedItems);
    } else {
      console.log('delete', selectedItems);
    }

    // Limpar seleção após ação
    setSelectedRows(new Set());
    refetchListMacroGroups();
  };

  return (
    <>
      <ContainerTabContent>
        <ContainerHeader>
          <ContainerInformation>
            <HeaderDescription>
              <div className="container-title">
                <Title size="md">Grupos de macros</Title>
                <Paragraph size="sm">Histórico de grupos de macros salvos.</Paragraph>
              </div>

              <Button LeftIcon={AddCircleIcon} variant="primary" onClick={handleCreateMacroGroup}>
                Criar novo grupo de macros
              </Button>
            </HeaderDescription>

            <ContainerActions>
              <ContainerInput>
                <div>
                  <SearchIcon width={24} height={24} />
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
                  <Button variant="primary" onClick={() => handleMacroGroupAction('edit')}>
                    {t('edit')}
                  </Button>
                  <Button variant="primary" onClick={() => handleMacroGroupAction('delete')}>
                    {t('delete')}
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
    </>
  );
}

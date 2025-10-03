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
import { getMacroGroups, deleteMacroGroups } from '../requets';
import { useToast } from 'src/contexts/toast';
import { ConfirmDeleteModal } from '../Form/MacrosContainer/ConfirmDeleteModal';

export function MacroGroups(): JSX.Element {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [filterValue, setFilterValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<any[]>([]);
  const navigate = useNavigate();
  const {
    data: listMacroGroups,
    refetch: refetchListMacroGroups,
    isLoading,
  } = useQuery('listMacroGroups', getMacroGroups);

  // Transformar dados da API para o formato da tabela
  const transformedData = React.useMemo(() => {
    if (!listMacroGroups?.data) return [];

    return listMacroGroups.data.map((item) => ({
      checkbox: false,
      id: item.id.toString(),
      client: item.client_description,
      vehicle: item.total_ativos > 1 ? `${item.total_ativos} veículos` : item.ativos_ids[0]?.plate || '',
      macroGroup: item.description,
      lastModification: item.dt_updated,
    }));
  }, [listMacroGroups]);

  // Filtro local dos dados
  const filteredData = React.useMemo(() => {
    if (!transformedData) return [];
    if (!filterValue) return transformedData;

    return transformedData.filter((item) => {
      const isClient = item.client.toLowerCase().includes(filterValue.toLowerCase());
      const isVehicle = item.vehicle.toLowerCase().includes(filterValue.toLowerCase());
      const isMacroGroup = item.macroGroup.toLowerCase().includes(filterValue.toLowerCase());
      return isClient || isVehicle || isMacroGroup;
    });
  }, [transformedData, filterValue]);

  const handleCreateMacroGroup = () => {
    navigate('/settings/form');
  };

  const handleMacroGroupAction = (action: 'edit' | 'delete') => {
    if (selectedRows.size === 0) return;

    const selectedItems = filteredData.filter((item) => selectedRows.has(item.id));

    if (action === 'edit') {
      // Para edição, pegar apenas o primeiro item selecionado
      if (selectedItems.length > 0) {
        const id = selectedItems[0].id;
        navigate(`/settings/form?id=${id}`);
      }
    } else {
      // Para delete, mostrar modal de confirmação
      setItemsToDelete(selectedItems);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const idsToDelete = itemsToDelete.map(item => parseInt(item.id));
      await deleteMacroGroups(idsToDelete);
      
      // Limpar seleção e recarregar dados
      setSelectedRows(new Set());
      refetchListMacroGroups();
      
      // Mostrar toast de sucesso
      showToast({
        title: 'Sucesso',
        message: `${itemsToDelete.length} grupo(s) de macro(s) excluído(s) com sucesso!`,
        type: 'success'
      });
    } catch (error) {
      console.error('Erro ao excluir grupos de macros:', error);
      
      // Mostrar toast de erro
      showToast({
        title: 'Erro',
        message: 'Erro ao excluir grupo(s) de macro(s). Tente novamente.',
        type: 'error'
      });
    } finally {
      setShowDeleteModal(false);
      setItemsToDelete([]);
    }
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
                  {selectedRows.size === 1 && (
                    <Button variant="primary" onClick={() => handleMacroGroupAction('edit')}>
                      {t('edit')}
                    </Button>
                  )}
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
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              allIds={filteredData.map(item => item.id)}
            />
          </ContainerTableGrid>
        ) : (
          <Empty />
        )}
      </ContainerTabContent>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemsToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        macroName={itemsToDelete.length === 1 ? itemsToDelete[0]?.macroGroup : `${itemsToDelete.length} grupos`}
      />
    </>
  );
}

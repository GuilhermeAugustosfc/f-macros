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
import CountAccess from './CountAccess';
import { useTranslation } from '@ftdata/core';
import { useToast } from 'src/contexts/toast';
import Empty from '../Empty';
// import { Pagination } from 'src/components/Table/Pagination';
import { ErrorIcon, SearchIcon } from 'src/pages/MacrosReport/components/svg';
import {
  getActiveAccessList,
  getCountAccess,
  activateAccess,
  deactivateAccess,
  type ActivatedAccessItem,
} from './requests';
import ConfirmationModal from 'src/components/ConfirmationModal';

// Interface para dados com checkbox (usado na tabela)
interface ActivatedAccessItemWithCheckbox extends ActivatedAccessItem {
  checkbox: boolean;
}

export function ActiveAccess(): JSX.Element {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [filterValue, setFilterValue] = useState('');
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'activate' | 'deactivate' | null>(null);

  const { data: countAccess, refetch: refetchCountAccess } = useQuery(
    'countAccess',
    getCountAccess,
  );

  const {
    data: listAccess,
    refetch: refetchListAccess,
    isLoading,
  } = useQuery('listAccess', getActiveAccessList);

  // Filtro local dos dados
  const filteredData = React.useMemo(() => {
    if (!listAccess) return [];

    // Adicionar checkbox aos dados
    const dataWithCheckbox: ActivatedAccessItemWithCheckbox[] = listAccess.map((item) => ({
      ...item,
      checkbox: false,
    }));

    if (!filterValue) return dataWithCheckbox;

    return dataWithCheckbox.filter((item) => {
      const plate = `${item.plate.toLowerCase()} - ${item.ativo_id.toString().toLowerCase()}`;
      const isPlate = plate.includes(filterValue.toLowerCase());
      const isClient = item.client.toLowerCase().includes(filterValue.toLowerCase());
      return isPlate || isClient;
    });
  }, [listAccess, filterValue]);

  const handleAccess = (action: 'deactivate' | 'activate') => {
    if (!selectedRow) return;

    // Validar se tem acessos livres antes de ativar
    if (action === 'activate') {
      const availableAccess = countAccess?.available ?? 0;
      if (availableAccess <= 0) {
        showToast({
          title: t('error'),
          message: t('you_do_not_have_free_access'),
          type: 'error',
        });
        return;
      }
    }

    setPendingAction(action);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!pendingAction || !selectedRow) return;

    const selectedItem = filteredData.find((item) => item.ativo_id.toString() === selectedRow);
    if (!selectedItem) return;

    const ativosIds = [selectedItem.ativo_id];

    try {
      if (pendingAction === 'activate') {
        await activateAccess({ ativos_id: ativosIds });
        console.log('Acesso ativado com sucesso:', selectedItem);
      } else {
        await deactivateAccess({ ativos_id: ativosIds });
        console.log('Acesso desativado com sucesso:', selectedItem);
      }

      // Limpar seleção após ação
      setSelectedRow(null);
      refetchListAccess();
      refetchCountAccess();
      notificationSuccess(pendingAction);
    } catch (error) {
      console.error(`Erro ao ${pendingAction} acesso:`, error);
      // Aqui você pode adicionar uma notificação de erro se necessário
    } finally {
      setShowConfirmModal(false);
      setPendingAction(null);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const notificationSuccess = (action: string) => {
    showToast({
      title: t('success'),
      message: action === 'activate'
        ? t('accesses_activated_successfully')
        : t('accesses_deactivated_successfully'),
      type: 'success',
    });
  };

  // Obter o registro selecionado para verificar seu status
  const selectedItem = selectedRow
    ? filteredData.find((item) => item.ativo_id.toString() === selectedRow)
    : null;
  
  const isSelectedItemActive = selectedItem?.is_active === 1;

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

              <CountAccess
                access={countAccess?.access ?? 0}
                available={countAccess?.available ?? 0}
                unavailable={countAccess?.unavailable ?? 0}
              />
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
              {selectedRow && (
                <div className="btn-actions">
                  {!isSelectedItemActive && (
                    <Button variant="primary" onClick={() => handleAccess('activate')}>
                      {t('activate')}
                    </Button>
                  )}
                  {isSelectedItemActive && (
                    <Button variant="ghost" style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }} onClick={() => handleAccess('deactivate')}>
                      {t('deactivate')}
                    </Button>
                  )}
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
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </ContainerTableGrid>
        ) : (
          <Empty />
        )}
      </ContainerTabContent>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        title={pendingAction === 'activate' ? t('activate_access') : t('deactivate_access')}
        description={
          pendingAction === 'activate'
            ? t('do_you_want_to_activate_the_selected_accesses')
            : t('do_you_want_to_deactivate_the_selected_accesses')
        }
        confirmText={pendingAction === 'activate' ? t('activate') : t('deactivate')}
        iconName={pendingAction === 'activate' ? 'ui check-circle' : 'ui trash-delete-bin-1'}
        iconColor={pendingAction === 'activate' ? '#10B981' : '#EF4444'}
        confirmButtonColor={pendingAction === 'activate' ? '#10B981' : '#EF4444'}
      />

      {/* {!isLoading && listAccess && listAccess.length > 0 && <Pagination table={table} />} */}
    </>
  );
}

import { useContext, useState, type JSX } from 'react';
import { ReportsContext } from 'src/contexts/reports';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from '@ftdata/core';
import { parse } from 'date-fns';
import {
  CalendarIcon,
  DriverHeaderIcon,
  FilterIcon,
  VehicleIcon,
  ClientIcon,
  ReferencePointIcon,
} from '../../svg';
import { deleteSavedFilter } from 'src/pages/MacrosReport/requets';
import MediaLibraryIcon from '../../../../../assets/media-library-folder-checkmark.svg';
import { queryClient } from 'src/services/queryClient';
import { Button, DoubleList, Loading } from '@ftdata/ui';
import {
  BadgesContainer,
  BadgeTitle,
  ContainerButtons,
  CustomButton,
  FilterName,
  InfoContainer,
  ListContainer,
  LoadingContainer,
  NoFiltersMessage,
  SavedFilter,
  SavedFiltersContainer,
  StyledDoubleListContainer,
} from './styles';
import ConfirmDelete from './ConfirmDelete';
interface SavedFiltersProps {
  applyFilter: (params: any, serialize?: boolean) => void;
}

export const SavedFilters = ({ applyFilter }: SavedFiltersProps): JSX.Element => {
  const { t } = useTranslation();
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const deleteMutation = useMutation(deleteSavedFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries('saved_filters/f-fuel');
      setSelectedFilters([]);
    },
  });

  const handleDeleteSelected = () => {
    if (selectedFilters.length > 0) {
      deleteMutation.mutate(selectedFilters);
      setSelectedFilters([]);
      setShowConfirmDelete(false);
    }
  };

  const { data: itemFilterSaved, isLoading } = useQuery(
    `saved_filters/f-fuel`,
    () => {
      return {
        data: {
          data: [
            {
              id: 1,
              customer_id: 123,
              customer_desc: 'Transportadora ABC Ltda',
              date_created: '15/12/2024 14:30:25',
              initial_data: '01/12/2024 00:00:00',
              final_data: '15/12/2024 23:59:59',
              ativo_desc: 'Frota Norte - Caminhão 001',
              driver_id: 456,
              driver_desc: 'João Silva',
              options: {
                ativos: [
                  { ativo_id: 101, ativo_desc: 'Caminhão 001' },
                  { ativo_id: 102, ativo_desc: 'Caminhão 002' },
                  { ativo_id: 103, ativo_desc: 'Van 001' },
                ],
                ponto_referencia: 500,
              },
            },
            {
              id: 2,
              customer_id: 789,
              customer_desc: 'Logística XYZ S.A.',
              date_created: '14/12/2024 09:15:42',
              initial_data: '10/12/2024 08:00:00',
              final_data: '14/12/2024 18:00:00',
              ativo_desc: 'Frota Sul - Múltiplos Veículos',
              driver_id: 789,
              driver_desc: 'Maria Santos',
              options: {
                ativos: [
                  { ativo_id: 201, ativo_desc: 'Caminhão 003' },
                  { ativo_id: 202, ativo_desc: 'Caminhão 004' },
                  { ativo_id: 203, ativo_desc: 'Caminhão 005' },
                  { ativo_id: 204, ativo_desc: 'Van 002' },
                  { ativo_id: 205, ativo_desc: 'Van 003' },
                  { ativo_id: 206, ativo_desc: 'Carreta 001' },
                  { ativo_id: 207, ativo_desc: 'Carreta 002' },
                  { ativo_id: 208, ativo_desc: 'Caminhão 006' },
                  { ativo_id: 209, ativo_desc: 'Caminhão 007' },
                  { ativo_id: 210, ativo_desc: 'Caminhão 008' },
                ],
                ponto_referencia: null,
              },
            },
            {
              id: 3,
              customer_id: 456,
              customer_desc: 'Express Delivery',
              date_created: '13/12/2024 16:45:18',
              initial_data: '12/12/2024 06:00:00',
              final_data: '13/12/2024 22:00:00',
              ativo_desc: 'Frota Urbana - Vans',
              driver_id: 321,
              driver_desc: 'Pedro Oliveira',
              options: {
                ativos: [
                  { ativo_id: 301, ativo_desc: 'Van 004' },
                  { ativo_id: 302, ativo_desc: 'Van 005' },
                ],
                ponto_referencia: 200,
              },
            },
            {
              id: 4,
              customer_id: 654,
              customer_desc: 'Cargas Pesadas Brasil',
              date_created: '12/12/2024 11:20:33',
              initial_data: '08/12/2024 00:00:00',
              final_data: '12/12/2024 23:59:59',
              ativo_desc: 'Frota Pesada - Carretas',
              driver_id: 987,
              driver_desc: 'Carlos Mendes',
              options: {
                ativos: [
                  { ativo_id: 401, ativo_desc: 'Carreta 003' },
                  { ativo_id: 402, ativo_desc: 'Carreta 004' },
                  { ativo_id: 403, ativo_desc: 'Caminhão 009' },
                  { ativo_id: 404, ativo_desc: 'Caminhão 010' },
                ],
                ponto_referencia: 1000,
              },
            },
          ],
        },
      };
    },
    {
      staleTime: 1000 * 60 * 30,
    },
  );

  const { setHasFilter, setClient, setVehicle, setPeriod, setReferencePoint } =
    useContext(ReportsContext);

  function applySavedFilters(params: any) {
    if (params.customer_id) {
      setClient({ value: params.customer_id.toString(), label: params.customer_desc || '' });
    }

    if (params.options.ativos.length > 0) {
      setVehicle(
        params.options.ativos.map((ativo: any) => ({
          value: ativo.ativo_id.toString(),
          label: ativo.ativo_desc || '',
        })),
      );
    }

    if (params.initial_data || params.final_data) {
      setPeriod({
        startDate: parse(params.initial_data, 'dd/MM/yyyy HH:mm:ss', new Date()),
        endDate: parse(params.final_data, 'dd/MM/yyyy HH:mm:ss', new Date()),
      });
    }

    if (params.options.ponto_referencia) {
      setReferencePoint({ isChecked: true, value: params.options.ponto_referencia });
    }

    setHasFilter(true);

    const newParams: any = {
      customer_id: Number(params.customer_id),
      ativo_id: params.options.ativos.map((ativo: any) => ativo.ativo_id).join(','),
      initial_data: params.initial_data,
      final_data: params.final_data,
      options: params.options,
    };
    applyFilter(newParams);
  }

  return (
    <SavedFiltersContainer>
      <ListContainer hasSelectedFilters={selectedFilters.length > 0}>
        {isLoading ? (
          <LoadingContainer>
            <Loading size="xl" variant="light" />
          </LoadingContainer>
        ) : itemFilterSaved && itemFilterSaved.data.data.length ? (
          itemFilterSaved.data.data.map((item: any, index: number) => (
            <SavedFilter key={item.id} onClick={() => applySavedFilters(item)}>
              <InfoContainer>
                <FilterIcon />
                <FilterName>
                  {t('filter')} {index + 1}
                </FilterName>
                <span>
                  {item.date_created.split(' ')[0]} às {item.date_created.split(' ')[1].slice(0, 5)}
                </span>
              </InfoContainer>
              <InfoContainer />

              <BadgesContainer>
                <BadgeTitle>
                  <ClientIcon />
                  {item.customer_desc}
                </BadgeTitle>
                <BadgeTitle>
                  <CalendarIcon />
                  {item.initial_data} - {item.final_data}
                </BadgeTitle>

                {item.ativo_desc && (
                  <BadgeTitle>
                    <VehicleIcon />
                    {item.ativo_desc}
                  </BadgeTitle>
                )}

                {item.driver_id && (
                  <BadgeTitle>
                    <DriverHeaderIcon />
                    {item.driver_desc}
                  </BadgeTitle>
                )}

                {item.options.ponto_referencia ? (
                  <BadgeTitle>
                    <ReferencePointIcon />
                    {t('reference_point')}: {item.options.ponto_referencia} m
                  </BadgeTitle>
                ) : (
                  ''
                )}

                {item.options.ativos.length < 9 ? (
                  item.options.ativos.map((ativo: any) => (
                    <BadgeTitle key={ativo.ativo_desc}>
                      <VehicleIcon />
                      {ativo.ativo_desc}
                    </BadgeTitle>
                  ))
                ) : (
                  <StyledDoubleListContainer>
                    <DoubleList
                      title={t('all_vehicles')}
                      options={item.options.ativos.map((ativo: any) => ativo.ativo_desc)}
                      total={item.options.ativos.length}
                      selected={item.options.ativos.length}
                    />
                  </StyledDoubleListContainer>
                )}
              </BadgesContainer>
            </SavedFilter>
          ))
        ) : (
          <NoFiltersMessage>{t('no_saved_filters')}</NoFiltersMessage>
        )}
      </ListContainer>
      {selectedFilters.length > 0 && (
        <ContainerButtons>
          <CustomButton variant="primary" onClick={() => setShowConfirmDelete(true)}>
            <MediaLibraryIcon />
            <span>{t('delete_selected_filters')}</span>
          </CustomButton>
          <Button variant="ghost" onClick={() => setSelectedFilters([])}>
            {t('cancel')}
          </Button>
        </ContainerButtons>
      )}
      {showConfirmDelete && (
        <ConfirmDelete
          onConfirm={handleDeleteSelected}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </SavedFiltersContainer>
  );
};

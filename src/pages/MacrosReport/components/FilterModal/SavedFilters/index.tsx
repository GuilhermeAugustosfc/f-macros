import React, { useContext, useState, type JSX } from 'react';
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
          data: [],
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
      ativo_group_id: Number(params.ativo_group_id),
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

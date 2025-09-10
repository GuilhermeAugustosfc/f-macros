import React, { useContext, useState } from 'react';
import { ReportsContext } from 'src/contexts/reports';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { parse } from 'date-fns';
import {
    AbastecimentoIcon,
    ConsumoDesligadoIcon,
    ConsumoKmHoraIcon,
    ConsumoLitrosHoraIcon,
    ConsumoLitrosIcon,
    ConsumoMovimentoIcon,
    ConsumoOciosoIcon,
    DrenagemIcon,
    HodometroIcon,
    HorimetroIcon,
    CalendarIcon,
    DriverHeaderIcon,
    FenceIcon,
    FilterIcon,
    GroupIcon,
    VehicleIcon,
    ClientIcon,
    PriceIcon,
    ReferencePointIcon,
} from '../../svg';
import { deleteSavedFilter, listSavedFilters, ReportInsertData, ReportResponse } from 'src/pages/FuelReport/requets';
import { ReactComponent as MediaLibraryIcon } from '../../../../../assets/media-library-folder-checkmark.svg';
import { queryClient } from 'src/services/queryClient';
import { Button, DoubleList, Loading } from '@ftdata/styleguide';
import { formatNumber } from 'src/components/Tracking/utils/common';
import {
    Badge,
    BadgesContainer,
    BadgeTitle,
    Checkbox,
    CheckboxWrapper,
    ColumnsContainer,
    ColumnsTitle,
    ColumnsWrapper,
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
    applyFilter: (params: ReportInsertData, serialize?: boolean) => void;
    showCheckbox: boolean;
}

export const SavedFilters = ({ applyFilter, showCheckbox }: SavedFiltersProps): JSX.Element => {
    const { t } = useTranslation('114');
    const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const deleteMutation = useMutation(deleteSavedFilter, {
        onSuccess: () => {
            queryClient.invalidateQueries('saved_filters/f-fuel');
            setSelectedFilters([]);
        },
    });

    const handleCheckboxClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Previne que o card seja clicado
        setSelectedFilters((prev) => (prev.includes(id) ? prev.filter((filterId) => filterId !== id) : [...prev, id]));
    };

    const handleDeleteSelected = () => {
        if (selectedFilters.length > 0) {
            deleteMutation.mutate(selectedFilters);
            setSelectedFilters([]);
            setShowConfirmDelete(false);
        }
    };

    const { data: itemFilterSaved, isLoading } = useQuery(`saved_filters/f-fuel`, () => listSavedFilters(), {
        staleTime: 1000 * 60 * 30,
    });

    const {
        setHasFilter,
        setClient,
        setFence,
        setVehicle,
        setVehicleGroup,
        setPeriod,
        setReferencePoint,
        setPrice,
        setOdometerValue,
        setHourMeterValue,
    } = useContext(ReportsContext);

    function applySavedFilters(params: ReportResponse) {
        if (params.customer_id) {
            setClient({ id: params.customer_id.toString(), value: params.customer_desc || '' });
        }

        if (params.ativo_group_id) {
            setVehicleGroup({ id: params.ativo_group_id.toString(), value: params.ativo_group_desc || '' });
        }

        if (params.options.ativos.length > 0) {
            setVehicle(
                params.options.ativos.map((ativo) => ({
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

        if (params.options.fence) {
            setFence(true);
        }

        if (params.options.ponto_referencia) {
            setReferencePoint({ isChecked: true, value: params.options.ponto_referencia });
        }

        if (params.options.preco_combustivel) {
            setPrice({
                isChecked: true,
                value: params.options.preco_combustivel,
                value_formatado: params.options.preco_combustivel.toString(),
            });
        }
        if (params.options.embeded_odometer) {
            setOdometerValue(true);
        }
        if (params.options.embeded_hourmeter) {
            setHourMeterValue(true);
        }

        setHasFilter(true);

        const newParams: ReportInsertData = {
            customer_id: Number(params.customer_id),
            ativo_group_id: Number(params.ativo_group_id),
            ativo_id: params.options.ativos.map((ativo) => ativo.ativo_id).join(','),
            initial_data: params.initial_data,
            final_data: params.final_data,
            options: params.options,
        };
        applyFilter(newParams);
    }

    const getColumnIcon = (columnKey: string) => {
        const iconMap: { [key: string]: React.ReactNode } = {
            drenagens: <DrenagemIcon />,
            abastecimentos: <AbastecimentoIcon />,
            hodometro: <HodometroIcon />,
            horimetro: <HorimetroIcon />,
            volume_total_consumido: <ConsumoLitrosIcon />,
            consumo_ocioso: <ConsumoOciosoIcon />,
            consumo_movimento: <ConsumoMovimentoIcon />,
            consumo_litro_hora: <ConsumoLitrosHoraIcon />,
            consumo_km_hora: <ConsumoKmHoraIcon />,
            consumo_desligado: <ConsumoDesligadoIcon />,
        };
        return iconMap[columnKey] || null;
    };

    const mapperFilter = {
        abastecimentoAnddrenagem: t('supply_and_drainage'),
        supply: t('supplies_only'),
        draining: t('drainages_only'),
    };

    return (
        <SavedFiltersContainer>
            <ListContainer hasSelectedFilters={selectedFilters.length > 0}>
                {isLoading ? (
                    <LoadingContainer>
                        <Loading size="xl" variant="light" />
                    </LoadingContainer>
                ) : itemFilterSaved && itemFilterSaved.data.data.length ? (
                    itemFilterSaved.data.data.map((item, index) => (
                        <SavedFilter key={item.id} onClick={() => applySavedFilters(item)}>
                            <InfoContainer>
                                {showCheckbox && (
                                    <CheckboxWrapper onClick={(e) => handleCheckboxClick(e, item.id)}>
                                        <Checkbox
                                            type="checkbox"
                                            checked={selectedFilters.includes(item.id)}
                                            readOnly
                                        />
                                    </CheckboxWrapper>
                                )}
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
                                {item.ativo_group_desc && (
                                    <BadgeTitle>
                                        <GroupIcon />
                                        {item.ativo_group_desc}
                                    </BadgeTitle>
                                )}

                                {item.driver_id && (
                                    <BadgeTitle>
                                        <DriverHeaderIcon />
                                        {item.driver_desc}
                                    </BadgeTitle>
                                )}

                                {item.options.fence ? (
                                    <BadgeTitle>
                                        <FenceIcon />
                                        {t('selected_fences')}
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}

                                {item.options.ponto_referencia ? (
                                    <BadgeTitle>
                                        <ReferencePointIcon />
                                        {t('reference_point')}: {item.options.ponto_referencia} m
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}

                                {item.options.preco_combustivel ? (
                                    <BadgeTitle>
                                        <PriceIcon />
                                        {t('fuel_price')}: R$ {formatNumber(item.options.preco_combustivel)}
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}

                                {item.options.filter ? (
                                    <BadgeTitle>
                                        <FilterIcon />
                                        {mapperFilter[item.options.filter as keyof typeof mapperFilter]}
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}

                                {item.options.embeded_hourmeter ? (
                                    <BadgeTitle>
                                        <HorimetroIcon />
                                        {t('hourmeter')} {t('selected')}
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}

                                {item.options.embeded_odometer ? (
                                    <BadgeTitle>
                                        <HodometroIcon />
                                        {t('hodometro')} {t('selected')}
                                    </BadgeTitle>
                                ) : (
                                    ''
                                )}
                                {item.options.ativos.length < 9 ? (
                                    item.options.ativos.map((ativo) => (
                                        <BadgeTitle key={ativo.ativo_desc}>
                                            <VehicleIcon />
                                            {ativo.ativo_desc}
                                        </BadgeTitle>
                                    ))
                                ) : (
                                    <StyledDoubleListContainer>
                                        <DoubleList
                                            title={t('all_vehicles')}
                                            options={item.options.ativos.map((ativo) => ativo.ativo_desc)}
                                            total={item.options.ativos.length}
                                            selected={item.options.ativos.length}
                                        />
                                    </StyledDoubleListContainer>
                                )}

                                {Object.entries(item.options.colunas).length > 0 && (
                                    <ColumnsContainer>
                                        <ColumnsTitle>{t('columns')}</ColumnsTitle>
                                        <ColumnsWrapper>
                                            {Object.entries(item.options.colunas).map(([key, value]) => {
                                                if (value === 1) {
                                                    const formattedKey = key
                                                        .split('_')
                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ');

                                                    return (
                                                        <Badge key={key}>
                                                            {getColumnIcon(key)}
                                                            {formattedKey}
                                                        </Badge>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ColumnsWrapper>
                                    </ColumnsContainer>
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
                        <MediaLibraryIcon style={{ width: 'max-content' }} />
                        <span>{t('delete_selected_filters')}</span>
                    </CustomButton>
                    <Button variant="ghost" onClick={() => setSelectedFilters([])}>
                        {t('cancel')}
                    </Button>
                </ContainerButtons>
            )}
            {showConfirmDelete && (
                <ConfirmDelete onConfirm={handleDeleteSelected} onCancel={() => setShowConfirmDelete(false)} />
            )}
        </SavedFiltersContainer>
    );
};

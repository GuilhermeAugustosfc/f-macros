import React, { useContext } from 'react';
import { Input, Tooltips, Button } from '@ftdata/styleguide';

import { ReportsContext } from '../../../../contexts/reports';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';
import {
    CalendarIcon,
    ClientIcon,
    DownloadIcon,
    FenceIcon,
    FilterAppliedIcon,
    FilterIcon,
    GroupIcon,
    HodometroIcon,
    HorimetroIcon,
    PriceIcon,
    ReferencePointIcon,
    VehicleIcon,
} from '../svg';
import { SearchIcon } from 'src/pages/Sensores/components/svg';
import { format } from 'date-fns';
import { CustomTooltip, TooltipVehicleList } from './CustomTooltip';

interface Props {
    title: string;
    showHeader?: boolean;
    openDownload: () => void;
    openFilter?: () => void;
}

const Header: React.FC<Props> = ({ title, openFilter, showHeader = true, openDownload }: Props) => {
    const { t } = useTranslation('114');

    const {
        vehicleGroup,
        client,
        period,
        vehicle,
        hasFilter,
        fence,
        referencePoint,
        price,
        filterValue,
        drenagemAbastecimentoFilters,
        setFilterValue,
        odometerValue,
        hourMeterValue,
        startTimeValue,
        endTimeValue,
    } = useContext(ReportsContext);

    const mapperDrenagemAbastecimentoFilters = {
        supply: t('supply'),
        draining: t('drainage'),
        abastecimentoAnddrenagem: t('supply_and_drainage'),
    };
    let range = '';

    if (period.startDate && period.endDate) {
        const { startDate, endDate } = period;
        const startHour = startTimeValue?.hour || '00';
        const startMinute = startTimeValue?.minute || '00';
        const startSecond = startTimeValue?.second || '00';
        const endHour = endTimeValue?.hour || '23';
        const endMinute = endTimeValue?.minute || '59';
        const endSecond = endTimeValue?.second || '59';
        range = `${format(startDate, 'dd/MM/yyyy')} ${startHour}:${startMinute}:${startSecond} - ${format(
            endDate,
            'dd/MM/yyyy',
        )} ${endHour}:${endMinute}:${endSecond}`;
    }

    if (!showHeader) {
        return null;
    }

    return (
        <Container>
            <HeaderContainer justifyContent="space-between">
                <Title>{title}</Title>
                <DownloadButton variant="primary" disabled={!hasFilter} onClick={openDownload}>
                    <DownloadIcon />
                    {t('download')}
                </DownloadButton>
            </HeaderContainer>
            <HeaderContainer justifyContent={hasFilter ? 'space-between' : 'flex-end'}>
                {hasFilter && (
                    <SelectedFilters>
                        <FilterText>{t('viewing')}</FilterText>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            {client && (
                                <Tooltips position="top" text={t('custumer')}>
                                    <Badge>
                                        <ClientIcon />
                                        <p>{client.value}</p>
                                    </Badge>
                                </Tooltips>
                            )}
                            {period && (
                                <Tooltips position="top" text={t('dt_gps')}>
                                    <Badge>
                                        <CalendarIcon />
                                        <p>{range}</p>
                                    </Badge>
                                </Tooltips>
                            )}
                            {vehicleGroup.id ? (
                                <Tooltips position="top" text={t('group_of_vehicles')}>
                                    <Badge>
                                        <GroupIcon />
                                        <p>{vehicleGroup.value}</p>
                                    </Badge>
                                </Tooltips>
                            ) : (
                                ''
                            )}
                            <Tooltips position="top" text={t('filter')}>
                                <Badge>
                                    <FilterIcon />
                                    <p>
                                        {mapperDrenagemAbastecimentoFilters[drenagemAbastecimentoFilters] ??
                                            t('all_data_available')}
                                    </p>
                                </Badge>
                            </Tooltips>
                            {vehicle && vehicle.length > 0 && (
                                <>
                                    {vehicle.length === 1 && (
                                        <Tooltips position="top" text={t('vehicle')}>
                                            <Badge>
                                                <VehicleIcon />
                                                <p>{vehicle[0].label}</p>
                                            </Badge>
                                        </Tooltips>
                                    )}
                                    {vehicle.length > 1 && vehicle.length <= 3 && (
                                        <>
                                            {vehicle.map((v, index) => (
                                                <Tooltips key={index} position="top" text={t('vehicle')}>
                                                    <Badge>
                                                        <VehicleIcon />
                                                        <p>{v.label}</p>
                                                    </Badge>
                                                </Tooltips>
                                            ))}
                                        </>
                                    )}
                                    {vehicle.length > 3 && (
                                        <CustomTooltip
                                            position="bottom"
                                            content={
                                                <TooltipVehicleList>
                                                    {vehicle.map((v, index) => (
                                                        <Badge key={index} style={{ margin: '4px 0' }}>
                                                            <VehicleIcon />
                                                            <p>{v.label}</p>
                                                        </Badge>
                                                    ))}
                                                </TooltipVehicleList>
                                            }
                                        >
                                            <Badge>
                                                <VehicleIcon />
                                                <p>
                                                    {t('vehicle')} ({vehicle.length})
                                                </p>
                                            </Badge>
                                        </CustomTooltip>
                                    )}
                                </>
                            )}
                            {fence && (
                                <Tooltips position="top" text={t('fence')}>
                                    <Badge>
                                        <FenceIcon stroke="#8E969B" />
                                        <p>
                                            {t('fence')} {t('selected')}
                                        </p>
                                    </Badge>
                                </Tooltips>
                            )}

                            {referencePoint.isChecked && (
                                <Tooltips position="top" text={t('reference_point')}>
                                    <Badge>
                                        <ReferencePointIcon />
                                        <p>
                                            {t('radius_of_reference_point_in_meters')}: {referencePoint.value}m
                                        </p>
                                    </Badge>
                                </Tooltips>
                            )}
                            {price.isChecked && (
                                <Tooltips position="top" text={t('price')}>
                                    <Badge>
                                        <PriceIcon />
                                        <p>{price.value}</p>
                                    </Badge>
                                </Tooltips>
                            )}
                            {odometerValue && (
                                <Tooltips position="top" text={t('hodometro') + ' ' + t('selected')}>
                                    <Badge>
                                        <HodometroIcon />
                                    </Badge>
                                </Tooltips>
                            )}
                            {hourMeterValue && (
                                <Tooltips position="top" text={t('horimeter') + ' ' + t('selected')}>
                                    <Badge>
                                        <HorimetroIcon />
                                    </Badge>
                                </Tooltips>
                            )}
                        </div>
                    </SelectedFilters>
                )}
                <ContainerRight>
                    <ContainerBadges>
                        <FilterButton onClick={openFilter} aria-label={t('filter')} data-testid="filter-button">
                            {hasFilter ? <FilterAppliedIcon /> : <FilterIcon />}
                        </FilterButton>
                    </ContainerBadges>
                    <InputAction>
                        <Input
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.currentTarget.value)}
                            Icon={SearchIcon}
                            placeholder={t('research') + '...'}
                        />
                    </InputAction>
                </ContainerRight>
            </HeaderContainer>
        </Container>
    );
};

const Container = styled.div``;

const HeaderContainer = styled.header<{ justifyContent: string }>`
    border-bottom: 0.0625rem solid ${styleguide.COLOR_NEUTRAL_LIGHT};
    padding: 0.75rem 2rem;
    display: flex;
    gap: 1rem;
    justify-content: ${({ justifyContent }) => justifyContent};
`;

const InputAction = styled.div``;

const Title = styled.h2`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.25rem;
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    gap: 0.75rem;
`;

const ContainerRight = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const ContainerBadges = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const FilterButton = styled.button``;

const DownloadButton = styled(Button)`
    background-color: ${styleguide.COLOR_BRAND_MEDIUM};
    span {
        display: flex;
        gap: 0.5rem;
        svg {
            stroke: #fff;
        }
    }
`;

const SelectedFilters = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon-fence path {
        stroke: #26333b;
        fill: #26333b;
    }
`;

const FilterText = styled.p`
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
    font-weight: 500;
    line-height: 150%;
`;

const Badge = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    background: rgba(213, 216, 218, 0.32);
    width: fit-content;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    p {
        color: #26333b;
    }
    svg {
        width: 1.125rem;
        height: 1.125rem;
    }

    svg path {
        stroke: #26333b;
    }
`;

export default Header;

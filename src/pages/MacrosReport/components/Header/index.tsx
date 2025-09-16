import React, { useContext } from 'react';
import { Input, Tooltips, Button } from '@ftdata/ui';

import { ReportsContext } from '../../../../contexts/reports';
import { useTranslation } from '@ftdata/core';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import {
  CalendarIcon,
  ClientIcon,
  DownloadIcon,
  FilterAppliedIcon,
  FilterIcon,
  ReferencePointIcon,
  VehicleIcon,
} from '../svg';
import { SearchIcon } from '../svg';
import { format } from 'date-fns';
import { CustomTooltip, TooltipVehicleList } from './CustomTooltip';

interface Props {
  title: string;
  openFilter?: () => void;
}

const Header: React.FC<Props> = ({ title, openFilter }: Props) => {
  const { t } = useTranslation('114');

  const {
    client,
    period,
    vehicle,
    hasFilter,
    referencePoint,
    startTimeValue,
    endTimeValue,
    gruposMacros,
  } = useContext(ReportsContext);

  let range = '';

  if (period?.startDate && period?.endDate) {
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

  return (
    <Container>
      <HeaderContainer justifyContent="space-between">
        <Title>{title}</Title>
        {hasFilter && (
          <DownloadButton variant="primary" disabled={!hasFilter}>
            <DownloadIcon />
            {t('download')}
          </DownloadButton>
        )}
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
            </div>
            {gruposMacros && (
              <Tooltips position="top" text={t('grupos_macros')}>
                <Badge>
                  {/* <GroupIcon /> */}
                  <p>{gruposMacros.value}</p>
                </Badge>
              </Tooltips>
            )}
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
              value={''}
              onChange={(e) => {}}
              icon={<SearchIcon width={24} height={24} />}
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
  padding: 16px 24px;
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
  gap: 16px;
  align-items: center;
`;

const ContainerBadges = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterButton = styled.button`
  svg {
    width: 24px;
    height: 24px;
  }
`;

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

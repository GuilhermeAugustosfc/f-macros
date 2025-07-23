import React, { useContext, useState } from 'react';
import Header from '../../components/Header';
import { FilterModal } from './components/FilterModal';
import styled from 'styled-components';
import { ReportsContext } from 'src/contexts/reports';
import Content from './components/Content';
import { TableContext } from 'src/contexts/table';
import {
  BadgeFilter,
  ContainerSearch,
  FilterContainer,
  FilterIconSearch,
  Filters,
} from 'src/components/Header/styles';
import UserIcon from 'src/assets/svgs/user.svg?react';
import { Icon } from '@ftdata/f-icons';
import { useTranslation } from '@ftdata/core';

const ViewReport: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const { clearFilter, setAlertState, alertState } = useContext(ReportsContext);
  const { setSorting } = useContext(TableContext);
  const { t } = useTranslation();

  function handleOpenModal() {
    setFilterModalOpen(true);
  }

  return (
    <PageContainer>
      <Header
        title={'F-Inspect'}
        tab="inspection_record"
        buttonDownload
        subTitle={t('track_fleet_inspection_history_and_status')}
      >
        <FilterContainer>
          <div>
            <span>{t('visualizando')} :</span>

            <Filters>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
              <BadgeFilter>
                <UserIcon />
                <span> Protege Segurança </span>
              </BadgeFilter>
            </Filters>
          </div>

          <FilterIconSearch>
            <Icon name="ui filter-sort-favorite-edit" />
            <ContainerSearch>
              <Icon name="ui search-loupe" />
              <input
                placeholder={t('research') + '...'}
                onChange={() => console.log('pesquisando....')}
                type="text"
              />
            </ContainerSearch>
          </FilterIconSearch>
        </FilterContainer>
      </Header>

      <Content handleOpenModal={handleOpenModal} />

      <FilterModal
        isOpen={isFilterModalOpen}
        close={() => {
          setAlertState({ ...alertState, open: false });
          setSorting([
            {
              id: 'insert_at',
              desc: true,
            },
          ]);
          clearFilter();
          setFilterModalOpen(false);
        }}
      />
    </PageContainer>
  );
};
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(-3.5rem + 100vh);
  transform: translateZ(0px);
  width: 100%;
  overflow-y: auto;
`;
export default ViewReport;

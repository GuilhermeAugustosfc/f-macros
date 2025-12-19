import React, { useState, useContext, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { CustomTable } from './Table';
import Empty from './Empty';
import { ReportsContext } from '../../../contexts/reports';
import { type Table } from '@tanstack/react-table';
import { UserIcon } from './svg';
import { ModalDetalhesGrupos } from '../../../components/ModalDetalhesGrupos';
import { useTranslation } from '@ftdata/core';
export interface ContentHandle {
  prepareGraphicsForExport: () => Promise<void>;
  resetExportStyles: () => void;
}

interface Props {
  params: any;
  handleOpenModal: () => void;
  setHasTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content = forwardRef<ContentHandle, Props>(
  ({ params, handleOpenModal, setHasTable }: Props) => {
    const { t } = useTranslation();
    const { hasFilter, isModalDetalhesOpen, setIsModalDetalhesOpen } = useContext(ReportsContext);
    const [vehicleTableData, setVehicleTableData] = useState<Table<any> | null>(null);

    useEffect(() => {
      if (vehicleTableData) {
        setHasTable(true);
        return;
      }
      setHasTable(false);
    }, [vehicleTableData]);

    return (
      <>
        <Container>
          <PageHeader>
            <HeaderContent>
              <Title>{t('custom_macros_report')}</Title>
              <Description>{t('track_journey_status_description')}</Description>
            </HeaderContent>
            <VehicleTypeContainer>
              <InfoBadge>
                <UserIcon />
                <BadgeText>{t('admin_full_edit_permission')}</BadgeText>
              </InfoBadge>
            </VehicleTypeContainer>
          </PageHeader>
          <ContainerContent>
            {hasFilter ? (
              <>
                <CustomTable
                  handleOpenModal={handleOpenModal}
                  params={params}
                  setVehicleTableData={setVehicleTableData}
                />
              </>
            ) : (
              <Empty openModal={handleOpenModal} />
            )}
          </ContainerContent>
        </Container>
        <ModalDetalhesGrupos
          isOpen={isModalDetalhesOpen}
          onClose={() => setIsModalDetalhesOpen(false)}
        />
      </>
    );
  },
);

// Ajusta displayName para evitar warning do ESLint (react/display-name)
Content.displayName = 'Content';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: max-content;
  place-items: start;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  color: #26333b;
  margin: 0;
  white-space: nowrap;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #6b757c;
  margin: 10px 0 0 0;
  white-space: nowrap;
`;

const VehicleTypeContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: max-content;
  place-items: start;
  flex-shrink: 0;
`;

const InfoBadge = styled.div`
  background-color: #e6f4f0;
  border-radius: 4px;
  padding: 4px 8px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
`;

const BadgeText = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #004834;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContainerContent = styled.div`
  // Esconde a barra de rolagem no Firefox
  scrollbar-width: none;
  height: 100%;
  // Esconde a barra de rolagem no Chrome, Safari e outros navegadores baseados em WebKit
  &::-webkit-scrollbar {
    display: none;
  }

  // Esconde a barra de rolagem no IE e Edge
  -ms-overflow-style: none;
`;

export default Content;

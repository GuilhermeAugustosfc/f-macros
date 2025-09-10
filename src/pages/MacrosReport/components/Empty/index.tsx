import React from 'react';

import { Button, Paragraph, Title } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import styled from 'styled-components';
import { EmptyReportIcon } from '../svg';

interface Props {
  openModal: () => void;
}

const Empty: React.FC<Props> = ({ openModal }: Props) => {
  const { t } = useTranslation('114');

  return (
    <ContainerEmpty>
      <EmptyReportIcon data-testid="empty-report-icon" />
      <div>
        <Title size="md">{t('no_filters_applied')}</Title>
        <Paragraph size="caption" style={{ width: '338px', textAlign: 'center' }}>
          {t('filter_to_generate_customized_reports_and_graphs_for_your_fleets_fuel_management')}
        </Paragraph>
        <Button variant="primary" onClick={openModal}>
          {t('apply_filters')}
        </Button>
      </div>
    </ContainerEmpty>
  );
};

const ContainerEmpty = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin-bottom: 24px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

export default Empty;

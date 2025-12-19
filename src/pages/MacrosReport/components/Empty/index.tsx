import React from 'react';

import { Button, Paragraph, Title } from '@ftdata/ui';
import styled from 'styled-components';
import { EmptyReportIcon } from '../svg';
import { useTranslation } from '@ftdata/core';

interface Props {
  openModal: () => void;
}

const Empty: React.FC<Props> = ({ openModal }: Props) => {
  const { t } = useTranslation();
  return (
    <ContainerEmpty>
      <EmptyReportIcon />
      <div>
        <Title size="md">{t('no_filters_applied')}</Title>
        <Paragraph size="caption" style={{ width: '338px', textAlign: 'center' }}>
          {t('apply_filters_macros_description')}
        </Paragraph>
        <Button variant="primary" onClick={openModal}>
          {t('apply_filters')}
        </Button>
      </div>
    </ContainerEmpty>
  );
};

const ContainerEmpty = styled.div`
  padding: 129px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    margin-bottom: 16px;
    width: 150px;
    height: 150px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
`;

export default Empty;

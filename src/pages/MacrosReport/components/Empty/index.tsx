import React from 'react';

import { Button, Paragraph, Title } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import styled from 'styled-components';
import { EmptyReportIcon } from '../svg';

interface Props {
  openModal: () => void;
}

const Empty: React.FC<Props> = ({ openModal }: Props) => {
  const { t } = useTranslation();

  return (
    <ContainerEmpty>
      <EmptyReportIcon />
      <div>
        <Title size="md">Nenhum filtro aplicado</Title>
        <Paragraph size="caption" style={{ width: '338px', textAlign: 'center' }}>
          Aplique os filtros para gerar relatórios e verificar as jornadas com macros personalizadas
          da sua frota.
        </Paragraph>
        <Button variant="primary" onClick={openModal}>
          Aplicar filtros
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

  svg {
    margin-bottom: 24px;
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

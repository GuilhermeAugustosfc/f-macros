import type { JSX } from 'react';
import { CardContainer, ContainerPercent, ContainerStatics, Summary } from './style';
import { Title } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';

interface CardComponentProps {
  title: TypeCardComponent;
  summary: string;
  quantity: number;
  total_quantity: number;
}

export type TypeCardComponent = 'approved' | 'disapproved' | 'late' | 'repaired' | 'all_completed';

const getPercent = (total: number, value: number): number => {
  if (total === 0) return 0;
  const porcentagem = (value / total) * 100;
  return parseInt(porcentagem.toFixed(2));
};

const CardComponent = ({
  title,
  summary,
  quantity,
  total_quantity,
}: CardComponentProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <div>
        <Title size="md" style={{ fontWeight: 500 }}>
          {t(title)}
        </Title>
        <Summary> {t(summary)}</Summary>
      </div>
      <ContainerStatics>
        <div>{quantity}</div>

        <ContainerPercent type={title}> {getPercent(total_quantity, quantity)}%</ContainerPercent>
      </ContainerStatics>
    </CardContainer>
  );
};

export default CardComponent;

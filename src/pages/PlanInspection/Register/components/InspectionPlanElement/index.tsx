import { Collapse } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import { useState, type JSX } from 'react';
import DraggableList from './DraggableList';
import styled from 'styled-components';

const initialItems = [
  { id: 'drenagem', label: 'Drenagem' },
  { id: 'abastecimento', label: 'Abastecimento' },
  { id: 'odometro', label: 'Odômetro' },
  { id: 'horimetro', label: 'Horímetro' },
  { id: 'volume_total', label: 'Volume total consumido' },
  { id: 'ocioso', label: 'Consumo ocioso' },
  { id: 'movimento', label: 'Consumo em movimento' },
  { id: 'litros_hora', label: 'Consumo em (L)/h' },
  { id: 'km_h', label: 'Consumo em km/h' },
  { id: 'desligado', label: 'Consumo desligado (L)' },
];

const InspectionPlanElement = (): JSX.Element => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [items, setItems] = useState(initialItems);

  return (
    <Collapse
      showCollapse={collapse}
      title={t('Elementos do plano de inspeção')}
      handleChange={() => setCollapse(!collapse)}
      style={{ marginBottom: '1.5rem' }}
    >
      <Container>
        <h3>{t('select_and_order_the_elements_of_your_inspection_plan')}</h3>
        <DraggableList items={items} setItems={setItems} />
      </Container>
    </Collapse>
  );
};

const Container = styled.div`
  & > h3 {
    margin-bottom: 0.5rem;
  }

  margin-bottom: 2rem;
`;

export default InspectionPlanElement;

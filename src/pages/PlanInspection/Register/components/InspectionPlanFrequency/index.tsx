import { Collapse, Radio } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import { useState, type JSX } from 'react';
import { ContainerFrequency, ContainerRadio } from './style';
import Period from './Period';

const InspectionPlanFrequency = (): JSX.Element => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [radio, setRadio] = useState<'only' | 'period'>('only');

  return (
    <Collapse
      showCollapse={collapse}
      title={t('Elementos do plano de inspeção')}
      handleChange={() => setCollapse(!collapse)}
    >
      <ContainerFrequency>
        <ContainerRadio>
          <Radio
            label="Inspeção Única"
            name="only"
            checked={radio == 'only'}
            onChange={() => setRadio('only')}
          ></Radio>
          <Radio
            label="Por Período"
            name="period"
            checked={radio == 'period'}
            onChange={() => setRadio('period')}
          ></Radio>
        </ContainerRadio>

        {radio === 'period' && <Period />}
      </ContainerFrequency>
    </Collapse>
  );
};

export default InspectionPlanFrequency;

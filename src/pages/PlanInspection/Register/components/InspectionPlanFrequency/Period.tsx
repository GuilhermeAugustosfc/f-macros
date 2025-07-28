import { useState, type JSX } from 'react';
import { CustomSelect, type ICustomSelectOption } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import * as tokens from '@ftdata/f-tokens';
import { useTranslation } from '@ftdata/core';
import Monthly from './Monthly';
import Daily from './Daily';
import Weekly from './Weekly';
import styled from 'styled-components';
import CustomPeriod from './CustomPeriod';

const Period = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectFrequency, setSelectFrequency] = useState<ICustomSelectOption | null>(null);

  const frequency = [
    { label: t('always_show'), value: 'always' },
    { label: t('daily'), value: 'daily' },
    { label: t('weekly'), value: 'weekly' },
    { label: t('monthly'), value: 'monthly' },
    { label: t('custom_period'), value: 'custom' },
  ];

  return (
    <ContainerSelects>
      <CustomSelect
        icon={
          <Icon
            name="eml calendar-schedule"
            style={{
              color: tokens.COLOR_NEUTRAL_DARK,
            }}
          />
        }
        t={t}
        selected={selectFrequency}
        setSelected={setSelectFrequency}
        label={t('choose_a_frequency')}
        placeholder={t('select')}
        isRequired
        isError={false}
        options={frequency}
      />
      {selectFrequency?.value === 'daily' && <Daily />}
      {selectFrequency?.value === 'weekly' && <Weekly />}
      {selectFrequency?.value === 'monthly' && <Monthly />}
      {selectFrequency?.value === 'custom' && <CustomPeriod />}

      {selectFrequency == null ||
      !['daily', 'weekly', 'monthly', 'custom'].includes(selectFrequency?.value ?? 'always') ? (
        <>
          <div></div>
          <div></div>
        </>
      ) : null}
    </ContainerSelects>
  );
};

const ContainerSelects = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  gap: 2rem;

  & > div {
    flex: 1;
    min-width: 23.125rem;

    & > label {
      gap: 0.2rem;
    }
    & > div {
      width: 100%;
    }
  }
`;
export default Period;

import { useTranslation } from '@ftdata/core';
import { CustomSelect, Input, type ICustomSelectOption } from '@ftdata/ui';
import { useState, type JSX } from 'react';
import * as tokens from '@ftdata/f-tokens';
import { Icon } from '@ftdata/f-icons';
import styled from 'styled-components';
import { handleFocus } from '../..';

export const Monthly = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectDays, setSelectDays] = useState<ICustomSelectOption | null>(null);
  const [time, setTime] = useState<string>('00:00');

  const daysOfMonthly = Array.from({ length: 32 }, (_, i) => ({
    label: i === 31 ? t('last_day_of_each_month') : `${i + 1}`,
    value: i === 31 ? 'all' : (i + 1).toString(),
  }));

  return (
    <Container>
      <CustomSelect
        variation="searchable"
        icon={
          <Icon
            name="eml calendar-schedule"
            style={{
              color: tokens.COLOR_NEUTRAL_DARK,
            }}
          />
        }
        t={t}
        selected={selectDays}
        setSelected={setSelectDays}
        label={t('select_inspection_type')}
        placeholder={t('select')}
        isRequired
        isError={false}
        options={daysOfMonthly}
      />

      <Input
        width={'120px'}
        className="input-time"
        type="time"
        value={time}
        onClick={() => handleFocus()}
        onChange={(e) => setTime(e.target.value)}
        icon={<div style={{ display: 'none' }}></div>}
        required
        textField={t('schedule')}
      />
    </Container>
  );
};

export const Container = styled.div`
  flex-basis: 33% !important;

  width: 100%;
  display: flex;
  gap: 1.5rem;
  align-items: end;

  & > div:last-child {
    & > div:last-child {
       
        & > input {
            text-align: start;
        }

        & > div:first-child {
            display: none;
        }
  }
`;

export default Monthly;

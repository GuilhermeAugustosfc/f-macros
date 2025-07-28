import { useTranslation } from '@ftdata/core';
import { Icon } from '@ftdata/f-icons';
import { CustomSelect, Input, type ICustomSelectOption } from '@ftdata/ui';
import { useState, type JSX } from 'react';
import * as tokens from '@ftdata/f-tokens';

const Weekly = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectDays, setSelectDays] = useState<ICustomSelectOption | null>(null);
  const [time, setTime] = useState<string>('00:00');

  const days = [
    { label: t('sunday'), value: 'sunday' },
    { label: t('monday'), value: 'monday' },
    { label: t('tuesday'), value: 'tuesday' },
    { label: t('wednesday'), value: 'wednesday' },
    { label: t('thursday'), value: 'thursday' },
    { label: t('friday'), value: 'friday' },
    { label: t('saturday'), value: 'saturday' },
  ];

  return (
    <>
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
        selected={selectDays}
        setSelected={setSelectDays}
        label={t('select_inspection_type')}
        placeholder={t('select')}
        isRequired
        isError={false}
        options={days}
      />

      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        icon={'eml calendar-schedule'}
        required
        textField={t('schedule')}
      />
    </>
  );
};

export default Weekly;

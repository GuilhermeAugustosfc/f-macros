import { useTranslation } from '@ftdata/core';
import { Input } from '@ftdata/ui';
import { useState, type JSX } from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { handleFocus } from '../..';

type daysOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export const Daily = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectDays, setSelectDays] = useState<daysOfWeek[]>([]);
  const [time, setTime] = useState<string>('00:00:00');

  const days: Record<daysOfWeek, string> = {
    sunday: t('abbreviation_sunday'),
    monday: t('abbreviation_monday'),
    tuesday: t('abbreviation_tuesday'),
    wednesday: t('abbreviation_wednesday'),
    thursday: t('abbreviation_thursday'),
    friday: t('abbreviation_friday'),
    saturday: t('abbreviation_saturday'),
  };
  return (
    <Container>
      <DaySelector>
        {Object.keys(days).map((day, index) => {
          const dayOfWeek = day as daysOfWeek;
          return (
            <Selector
              active={selectDays.includes(dayOfWeek)}
              key={index}
              onClick={() =>
                setSelectDays((prev) =>
                  prev.includes(dayOfWeek)
                    ? prev.filter((d) => d !== dayOfWeek)
                    : [...prev, dayOfWeek],
                )
              }
            >
              {days[dayOfWeek]}
            </Selector>
          );
        })}
      </DaySelector>

      <Input
        type="time"
        className="input-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onClick={() => handleFocus()}
        icon={<></>}
        required
        textField={t('schedule')}
      />
    </Container>
  );
};

export const Container = styled.div`
  flex-basis: 33% !important;

  display: flex;
  align-items: end;
  gap: 1.5rem;
  flex-wrap: no-wrap;
`;

export const DaySelector = styled.div`
  display: flex;
`;

export const Selector = styled.div<{ active: boolean }>`
  align-items: center;
  background: ${({ active }) => (active ? styleguide.COLOR_ACCENT_LIGHTER : 'transparent')};
  color: ${({ active }) =>
    active ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER};
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  margin-right: ${styleguide.SPACING_INLINE_02};
  transition: 0.1s ease all;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 40px;

  ${({ active }) =>
    !active &&
    `&:hover {
        background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
    }`}
`;

export default Daily;

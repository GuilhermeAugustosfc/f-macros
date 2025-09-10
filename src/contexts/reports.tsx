import React, { createContext, useEffect, useState } from 'react';
import { endOfDay, startOfDay } from 'date-fns';
import type { Range as DateRange } from 'react-date-range';
import { useTranslation } from '@ftdata/core';
import type { CustomSelectProps } from 'node_modules/@ftdata/ui/dist/components/CustomSelect';

interface IReportsContext {
  client: CustomSelectProps;
  setClient: (value: CustomSelectProps) => void;
  period: DateRange | null;
  setPeriod: (value: DateRange | null) => void;
  ativo: CustomSelectProps;
  setAtivo: (value: CustomSelectProps) => void;
  hasFilter: boolean;
  setHasFilter: (value: boolean) => void;
  clearFilter: () => void;
  emptyValue: CustomSelectProps;
}

const ReportsContext = createContext<IReportsContext>({} as IReportsContext);

const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const emptyValue = { value: '', label: t('select') } as CustomSelectProps;
  const [client, setClient] = useState<CustomSelectProps>(emptyValue);
  const [period, setPeriod] = useState<DateRange | null>({
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    key: 'selection',
  } as DateRange);
  const [ativo, setAtivo] = useState<CustomSelectProps>(emptyValue);
  const [hasFilter, setHasFilter] = useState<boolean>(false);

  useEffect(() => {
    setHasFilter(Boolean(client.value || ativo.value || period));
  }, [client, period, ativo]);

  function clearFilter() {
    setClient(emptyValue);
    setPeriod(null);
    setAtivo(emptyValue);
  }

  return (
    <ReportsContext.Provider
      value={{
        client,
        setClient,
        period,
        setPeriod,
        ativo,
        setAtivo,
        hasFilter,
        setHasFilter,
        clearFilter,
        emptyValue,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsProvider };

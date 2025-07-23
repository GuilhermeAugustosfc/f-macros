import React, { createContext, useEffect, useState } from 'react';
import { endOfDay, startOfDay } from 'date-fns';
import type {
  AlertStateInterface,
  SelectOption,
} from 'src/pages/Inspect/components/FilterModal/Form/types';
import type { Range as DateRange } from 'react-date-range';
import { useTranslation } from '@ftdata/core';

interface IReportsContext {
  client: SelectOption;
  setClient: (value: SelectOption) => void;
  period: DateRange | null;
  setPeriod: (value: DateRange | null) => void;
  ativo: SelectOption;
  setAtivo: (value: SelectOption) => void;
  hasFilter: boolean;
  setHasFilter: (value: boolean) => void;
  channel: SelectOption;
  setChannel: (value: SelectOption) => void;
  clearFilter: () => void;
  emptyValue: SelectOption;
  alertState: AlertStateInterface;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateInterface>>;
}

const ReportsContext = createContext<IReportsContext>({} as IReportsContext);

const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const emptyValue = { value: '', label: t('select') };
  const [client, setClient] = useState<SelectOption>(emptyValue);
  const [period, setPeriod] = useState<DateRange | null>({
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    key: 'selection',
  } as DateRange);
  const [ativo, setAtivo] = useState<SelectOption>(emptyValue);
  const [channel, setChannel] = useState<SelectOption>(emptyValue);
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertStateInterface>({
    icon: 'ui checkmark-done-check',
    message: '',
    type: 'success',
    open: false,
  });

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
        channel,
        setChannel,
        setHasFilter,
        clearFilter,
        emptyValue,
        alertState,
        setAlertState,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsProvider };

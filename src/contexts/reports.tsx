import React, { createContext, useEffect, useState } from 'react';
import { endOfDay, startOfDay } from 'date-fns';
import type { Range as DateRange } from 'react-date-range';
import { useTranslation } from '@ftdata/core';
import type {
  ReferencePoint,
  TimeRange,
} from 'src/pages/MacrosReport/components/FilterModal/Form/types';
import type { ICustomSelectOption } from '@ftdata/ui';

interface IReportsContext {
  client: ICustomSelectOption;
  setClient: (value: ICustomSelectOption) => void;
  period: DateRange | null;
  setPeriod: (value: DateRange | null) => void;
  ativo: ICustomSelectOption;
  setAtivo: (value: ICustomSelectOption) => void;
  hasFilter: boolean;
  setHasFilter: (value: boolean) => void;
  clearFilter: () => void;
  emptyValue: ICustomSelectOption;
  vehicle: ICustomSelectOption[];
  setVehicle: (value: ICustomSelectOption[]) => void;
  motorista: ICustomSelectOption;
  setMotorista: (value: ICustomSelectOption) => void;
  referencePoint: ReferencePoint;
  setReferencePoint: (value: ReferencePoint) => void;
  startTimeValue: TimeRange;
  setStartTimeValue: (value: TimeRange) => void;
  endTimeValue: TimeRange;
  setEndTimeValue: (value: TimeRange) => void;
  gruposMacros: ICustomSelectOption;
  setGruposMacros: (value: ICustomSelectOption) => void;
}

const ReportsContext = createContext<IReportsContext>({} as IReportsContext);

const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const emptyValue = { value: '', label: t('select') } as ICustomSelectOption;
  const [client, setClient] = useState<ICustomSelectOption>(emptyValue);
  const [vehicle, setVehicle] = useState<ICustomSelectOption[]>([]);
  const [motorista, setMotorista] = useState<ICustomSelectOption>(emptyValue);
  const [startTimeValue, setStartTimeValue] = useState<TimeRange>({
    hour: '00',
    minute: '00',
    second: '00',
  });
  const [endTimeValue, setEndTimeValue] = useState<TimeRange>({
    hour: '23',
    minute: '59',
    second: '59',
  });
  const [referencePoint, setReferencePoint] = useState<ReferencePoint>({
    isChecked: false,
    value: 100,
  });
  const [gruposMacros, setGruposMacros] = useState<ICustomSelectOption>(emptyValue);
  const [period, setPeriod] = useState<DateRange | null>({
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    key: 'selection',
  } as DateRange);
  const [ativo, setAtivo] = useState<ICustomSelectOption>(emptyValue);
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
        vehicle,
        setVehicle,
        motorista,
        setMotorista,
        referencePoint,
        setReferencePoint,
        setStartTimeValue,
        endTimeValue,
        setEndTimeValue,
        startTimeValue,
        gruposMacros,
        setGruposMacros,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsProvider };

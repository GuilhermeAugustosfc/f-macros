import { useState, useEffect, useRef, useContext, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import {
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import { useTranslation } from '@ftdata/core';

import { ReportsContext } from '../../../../../contexts/reports';
import { type UseFormLogicReturn, type TimeRange, type ReferencePoint } from './types';
import { type Range } from 'react-date-range';
import {
  getCustomers,
  getDrivers,
  getVehicles,
  insertSavedFilter,
  getGroups,
} from 'src/pages/MacrosReport/requets';
import { useToast } from 'src/contexts/toast';
import { type ICustomSelectOption } from '@ftdata/ui';
import { queryClient } from 'src/services/queryClient';

export const useFormLogic = (applyFilter: (params: any) => void): UseFormLogicReturn => {
  const { t } = useTranslation('114');
  const { showToast } = useToast();
  const selectRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const emptyValue = { value: '', label: t('select') };
  const [selectedClient, setSelectedClient] = useState<ICustomSelectOption | null>(emptyValue);
  const [selectedVehicle, setSelectedVehicle] = useState<ICustomSelectOption[]>([]);
  const [selectedMotorista, setSelectedMotorista] = useState<ICustomSelectOption | null>(
    emptyValue,
  );
  const [selectedGruposMacros, setSelectedGruposMacros] = useState<ICustomSelectOption | null>(
    emptyValue,
  );
  const [selectedRange, setSelectedRange] = useState<Range[]>([
    { startDate: new Date(), endDate: new Date(), key: 'selection' },
  ]);
  const [startTime, setStartTime] = useState<TimeRange>({ hour: '00', minute: '00', second: '00' });
  const [endTime, setEndTime] = useState<TimeRange>({ hour: '23', minute: '59', second: '59' });
  const language = 'pt-BR';
  const [errors, setErrors] = useState({
    client: false,
    vehicle: false,
    motorista: false,
    gruposMacros: false,
  });
  const [referencePointSelected, setReferencePointSelected] = useState<ReferencePoint>({
    isChecked: false,
    value: 100,
  });
  const [saveFilters, setSaveFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    client,
    vehicle,
    period,
    referencePoint,
    setReferencePoint,
    setClient,
    setPeriod,
    setVehicle,
    motorista,
    setMotorista,
    setStartTimeValue,
    setEndTimeValue,
    setGruposMacros,
    gruposMacros,
  } = useContext(ReportsContext);

  const { data: clienteData } = useQuery(
    ['clients'],
    () => getCustomers().then((res) => res.data.data),
    {
      staleTime: 1000 * 60 * 60 * 2,
      refetchOnWindowFocus: false,
      select: (data) =>
        data.map(
          (cliente): ICustomSelectOption => ({
            label: cliente.client_description,
            value: cliente.client_id.toString(),
          }),
        ),
    },
  );

  const { data: dataAtivos, refetch: activeRefetch } = useQuery(
    ['ativos', selectedClient?.value],
    () => getVehicles({ customer_id: Number(selectedClient?.value) }),
    {
      staleTime: 1000 * 60 * 30,
      enabled: Boolean(selectedClient?.value),
      refetchOnWindowFocus: false,
      select: (data) =>
        data.data.data.map(
          (ativo): ICustomSelectOption => ({
            value: String(ativo.ativo_id),
            label: `${ativo.plate} - ${ativo.ativo}`,
          }),
        ),
    },
  );

  const { data: dataMotoristas } = useQuery(
    ['motoristas', selectedClient?.value],
    () => getDrivers({ customer_id: Number(selectedClient?.value) }).then((res) => res.data.data),
    {
      staleTime: 1000 * 60 * 30,
      enabled: Boolean(selectedClient?.value),
      refetchOnWindowFocus: false,
      select: (data) =>
        data.map(
          (motorista): ICustomSelectOption => ({
            label: motorista.mot_desc,
            value: motorista.id.toString(),
          }),
        ),
    },
  );

  const { data: dataGruposMacros } = useQuery(
    ['gruposMacros', selectedClient?.value],
    () => getGroups({ customer_id: Number(selectedClient?.value) }).then((res) => res.data.data),
    {
      staleTime: 1000 * 60 * 30,
      enabled: Boolean(selectedClient?.value),
      refetchOnWindowFocus: false,
      select: (data) =>
        data.map(
          (grupo): ICustomSelectOption => ({
            value: grupo.id.toString(),
            label: grupo.grupo_desc,
          }),
        ),
    },
  );

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setPreSelectedValues();
  }, []);

  useEffect(() => {
    if (selectedClient?.value !== '') {
      activeRefetch();
    }
  }, [selectedClient, activeRefetch]);

  const setPreSelectedValues = useCallback(() => {
    if (client.value) setSelectedClient({ value: client.value, label: client.label });
    if (vehicle.length) setSelectedVehicle(vehicle);
    if (gruposMacros.value)
      setSelectedGruposMacros({ value: gruposMacros.value, label: gruposMacros.label });
    if (period?.endDate && period?.startDate) {
      setSelectedRange([
        {
          startDate: period.startDate,
          endDate: period.endDate,
          key: 'selection',
        },
      ]);
    }
    if (referencePoint) setReferencePointSelected(referencePoint);
    if (motorista.value) setSelectedMotorista({ value: motorista.value, label: motorista.label });

    setStartTime(startTime);
    setEndTime(endTime);
  }, [
    client.value,
    vehicle.length,
    gruposMacros.value,
    period?.endDate,
    period?.startDate,
    referencePoint,
    motorista.value,
    startTime,
    endTime,
  ]);

  const validFieldsForm = (params: any) => {
    return params.some(
      (item: any) =>
        (item.id === 'selectedClient' && !item.value.value) ||
        (item.id === 'selectedRange' && (!item.value[0].startDate || !item.value[0].endDate)) ||
        (item.id === 'selectedVehicle' && item.value.length === 0),
    );
  };

  const handleSubmit = useCallback(() => {
    const data = {
      selectedClient,
      selectedVehicle,
      selectedRange,
      selectedMotorista,
      referencePointSelected,
      saveFilters,
      startTime,
      endTime,
      selectedGruposMacros,
    };

    const params = Object.entries(data).map(([id, value]) => ({ id, value }));

    const newErrors = {
      client: !selectedClient?.value,
      vehicle: selectedVehicle.length === 0,
      motorista: !selectedMotorista?.value,
      gruposMacros: !selectedGruposMacros?.value,
    };
    setErrors(newErrors);

    if (validFieldsForm(params)) {
      showToast({
        title: t('error'),
        message: t('fill_in_the_required_fields'),
        type: 'error',
      });
      return;
    }

    const formSavedData = {
      customer_id: Number(data.selectedClient?.value),
      ...(data.selectedVehicle.length > 0 && {
        ativo_id: data.selectedVehicle.map((item) => item.value).join(','),
      }),
      ...(data.selectedMotorista?.value && { driver_id: Number(data.selectedMotorista.value) }),
      ...(data.selectedGruposMacros?.value && {
        group_id: Number(data.selectedGruposMacros.value),
      }),
      initial_data: data.selectedRange[0].startDate
        ? format(
            setSeconds(
              setMinutes(
                setHours(data.selectedRange[0].startDate, parseInt(data.startTime.hour)),
                parseInt(data.startTime.minute),
              ),
              parseInt(data.startTime.second),
            ),
            'dd/MM/yyyy HH:mm:ss',
          )
        : '',
      final_data: data.selectedRange[0].endDate
        ? format(
            setSeconds(
              setMinutes(
                setHours(data.selectedRange[0].endDate, parseInt(data.endTime.hour)),
                parseInt(data.endTime.minute),
              ),
              parseInt(data.endTime.second),
            ),
            'dd/MM/yyyy HH:mm:ss',
          )
        : '',

      ponto_referencia: data.referencePointSelected.isChecked
        ? data.referencePointSelected.value == 0
          ? 100
          : data.referencePointSelected.value
        : 0,
    };

    applyFilter(formSavedData);

    if (data.saveFilters) {
      const insertItem = {
        ...formSavedData,
        ativos: data.selectedVehicle.map((item) => ({
          ativo_id: item.value,
          ativo_plate: item.label,
          ativo_desc: item.label,
        })),
      };

      delete insertItem.ativo_id;

      insertSavedFilter(insertItem).then(() => {
        queryClient.invalidateQueries(`saved_filters/f-macros`);
        showToast({
          title: t('success'),
          message: t('filter_saved_successfully'),
          type: 'success',
        });
      });
    }

    updateContextValues(data);
  }, [
    selectedClient,
    selectedVehicle,
    selectedRange,
    selectedMotorista,
    selectedGruposMacros,
    referencePointSelected,
    saveFilters,
    startTime,
    endTime,
    applyFilter,
    showToast,
    setClient,
    setVehicle,
    setPeriod,
    setReferencePoint,
    setMotorista,
    insertSavedFilter,
    setStartTimeValue,
    setEndTimeValue,
    setGruposMacros,
  ]);

  const updateContextValues = (data: any) => {
    if (data.selectedClient) {
      const { label, value } = data.selectedClient;
      setClient({ value: value, label: label });
    }

    if (data.selectedVehicle && data.selectedVehicle.length > 0) {
      setVehicle(data.selectedVehicle);
    }

    if (selectedRange[0]) {
      const { endDate, startDate } = selectedRange[0];
      setPeriod({ startDate, endDate });
    }

    if (data.selectedMotorista) {
      const { label, value } = data.selectedMotorista;
      setMotorista({ value: value, label: label });
    }

    if (data.referencePointSelected) {
      setReferencePoint(data.referencePointSelected);
    }

    if (data.startTime) {
      setStartTimeValue(data.startTime);
    }
    if (data.endTime) {
      setEndTimeValue(data.endTime);
    }

    if (data.selectedGruposMacros) {
      setGruposMacros(data.selectedGruposMacros);
    }
  };

  const getFirstAndLastDayOfPreviousMonth = useCallback(() => {
    const today = new Date();
    const firstDayOfPreviousMonth = startOfMonth(subMonths(today, 1));
    const lastDayOfPreviousMonth = endOfMonth(subMonths(today, 1));
    return { firstDayOfPreviousMonth, lastDayOfPreviousMonth };
  }, []);

  const selectOptions = useMemo(() => {
    return {
      clientsOptions: clienteData ?? ([] as ICustomSelectOption[]),
      vehicleOptions: dataAtivos ?? ([] as ICustomSelectOption[]),
      motoristaOptions: dataMotoristas ?? ([] as ICustomSelectOption[]),
      gruposMacrosOptions: dataGruposMacros ?? ([] as ICustomSelectOption[]),
    };
  }, [clienteData, dataAtivos, dataMotoristas]);

  return {
    formState: {
      selectedClient: selectedClient ?? emptyValue,
      selectedMotorista: selectedMotorista ?? emptyValue,
      selectedGruposMacros: selectedGruposMacros ?? emptyValue,
      selectedVehicle,
      selectedRange,
      startTime,
      endTime,
      referencePointSelected,
      saveFilters,
      showDatePicker,
    },
    handlers: {
      setSelectedClient,
      setSelectedVehicle,
      setSelectedMotorista,
      setSelectedRange,
      setStartTime,
      setEndTime,
      setReferencePointSelected,
      setSaveFilters,
      setShowDatePicker,
      setSelectedGruposMacros,
    },
    selectOptions,
    errors,
    selectRef,
    handleSubmit,
    language,
    t,
    getFirstAndLastDayOfPreviousMonth,
  };
};

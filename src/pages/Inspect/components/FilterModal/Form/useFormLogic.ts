import { useState, useEffect, useRef, useContext } from 'react';
import { useQuery } from 'react-query';
import { ReportsContext } from '../../../../../contexts/reports';
import { getClientsReactQuery } from '../../../../../components/Tracking/utils/common';
import { getAtivosByClient, getChannels } from '../../../../../services/reports/filter';
import type { SelectOption, FormLogic } from './types';
import type { Ativo, Channel } from 'src/types/filter';

export const useFormLogic = (): FormLogic => {
  const { client, ativo, emptyValue, setChannel, setAtivo } = useContext(ReportsContext);

  const selectRef = useRef<HTMLDivElement | null>(null);
  const [errors, setErrors] = useState({ client: false, ativo: false });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: clientsOptions } = getClientsReactQuery();
  const { data: dataAtivos } = useQuery(
    ['ativos', client.value],
    () => getAtivosByClient(client.value.toString()),
    {
      staleTime: 1000 * 60 * 30,
      enabled: Boolean(client.value),
      refetchOnWindowFocus: false,
    },
  );
  const { data: dataChannel } = useQuery(
    ['channels', ativo.value],
    async () => {
      setLoading(true);
      return await getChannels(ativo.value);
    },
    {
      staleTime: 1000 * 60 * 30,
      enabled: Boolean(ativo.value),
      refetchOnWindowFocus: false,
      onSuccess: () => {
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    setAtivo(emptyValue);
    setChannel(emptyValue);
  }, [client]);

  useEffect(() => {
    setChannel(emptyValue);
  }, [ativo]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const createOptions = (
    data: Ativo[] | Channel[],
    labelKey: string,
    valueKey: string,
  ): SelectOption[] =>
    data?.map((option: any) => ({
      label: option[labelKey],
      value: option[valueKey],
    })) || [emptyValue];

  const selectAtivos: SelectOption[] = createOptions(
    dataAtivos?.status == 200 ? dataAtivos?.data : [],
    'description_ativo',
    'ativo_id',
  );

  const optionsChannels: SelectOption[] = createOptions(
    dataChannel?.status == 200 ? dataChannel?.data.channels : [],
    'channel_name',
    'channel_id',
  );

  return {
    showDatePicker,
    setShowDatePicker,
    selectOptions: {
      clientsOptions:
        clientsOptions?.map((option) => ({
          ...option,
          value: option.value.toString(),
        })) || [],
      selectAtivos,
      optionsChannels,
    },
    errors,
    setErrors,
    selectRef,
    loading,
  };
};

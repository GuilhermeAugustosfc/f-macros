import api from 'src/services/instance';
import type { AxiosResponse } from 'axios';
import { format, setHours, setMinutes, setSeconds } from 'date-fns';
import type { ICustomSelectOption } from '@ftdata/ui';
import type { Range } from 'react-date-range';
import type { TimeRange } from './components/FilterModal/Form/types';
import type {
  DriverResponse,
  CustomerResponse,
  VehicleResponse,
  MacrosGroupResponse,
  SavedFilterResponse,
  SavedFiltersApiResponse,
  GetDriversParams,
  GetCustomersParams,
  GetVehiclesParams,
  GetGroupsParams,
  GetReportsParams,
  GetSavedFiltersParams,
  InsertSavedFilterData,
} from './types';

// Novos endpoints do Postman
export const getDrivers = (params?: GetDriversParams): Promise<AxiosResponse<{ total: number; last_id: number | null; data: DriverResponse[] }>> => {
  return api.get('/fuel/v1/drivers', { params });
};

export const getCustomers = (params?: GetCustomersParams): Promise<AxiosResponse<{ total: number; last_id: number | null; data: CustomerResponse[] }>> => {
  return api.get('/f-work/macros/v1/customers', { params });
};

export const getVehicles = (params?: GetVehiclesParams): Promise<AxiosResponse<{ total: number; last_id: number | null; data: VehicleResponse[] }>> => {
  return api.get('/f-work/macros/v1/ativos/', { params });
};

export const getGroups = (params?: GetGroupsParams): Promise<
  AxiosResponse<{ total: number; last_id: number | null; data: MacrosGroupResponse[] }>
> => {
  return api.get('/f-work/macros/v1/list_macros/', { params });
};

export const insertSavedFilter = (data: InsertSavedFilterData): Promise<AxiosResponse<{ id: number }>> => {
  return api.post('/f-work/macros/v1/reports/filter', data);
};

export const deleteSavedFilter = (
  ids: number[],
): Promise<AxiosResponse<{ num_rows_affected: number }>> => {
  return api.delete(`/f-work/macros/v1/reports/filters/${JSON.stringify(ids)}`);
};

export const getReports = (params?: GetReportsParams): Promise<AxiosResponse<any>> => {
  return api.get('/f-work/macros/v1/reports/', { params });
};

export const getSavedFilters = (params?: GetSavedFiltersParams): Promise<AxiosResponse<SavedFiltersApiResponse>> => {
  return api.get('/f-work/macros/v1/reports/filter', { params });
};

// Funções utilitárias para simplificar a montagem dos dados
export const formatDateTime = (
  date: Date,
  time: TimeRange,
): string => {
  return format(
    setSeconds(
      setMinutes(
        setHours(date, parseInt(time.hour)),
        parseInt(time.minute),
      ),
      parseInt(time.second),
    ),
    'dd/MM/yyyy HH:mm:ss',
  );
};

export const buildReportParams = (data: {
  selectedClient: ICustomSelectOption | null;
  selectedVehicle: ICustomSelectOption[];
  selectedMotorista: ICustomSelectOption | null;
  selectedGruposMacros: ICustomSelectOption[];
  selectedRange: Range[];
  startTime: TimeRange;
  endTime: TimeRange;
  referencePointSelected: { isChecked: boolean; value: number };
}) => {
  return {
    customer_id: Number(data.selectedClient?.value),
    ...(data.selectedVehicle.length > 0 && {
      ativos_ids: data.selectedVehicle.map((item) => item.value).join(','),
    }),
    ...(data.selectedMotorista?.value && { driver_id: Number(data.selectedMotorista.value) }),
    ...(data.selectedGruposMacros.length > 0 && {
      macros_group_ids: data.selectedGruposMacros.map((item) => item.value).join(','),
    }),
    dt_initial: data.selectedRange[0].startDate
      ? formatDateTime(data.selectedRange[0].startDate, data.startTime)
      : '',
    dt_final: data.selectedRange[0].endDate
      ? formatDateTime(data.selectedRange[0].endDate, data.endTime)
      : '',
    ponto_referencia: data.referencePointSelected.isChecked
      ? data.referencePointSelected.value === 0
        ? 100
        : data.referencePointSelected.value
      : 0,
  };
};

export const buildSavedFilterData = (data: {
  selectedClient: ICustomSelectOption | null;
  selectedVehicle: ICustomSelectOption[];
  selectedMotorista: ICustomSelectOption | null;
  selectedGruposMacros: ICustomSelectOption[];
  selectedRange: Range[];
  startTime: TimeRange;
  endTime: TimeRange;
}) => {
  return {
    customer_id: Number(data.selectedClient?.value),
    ...(data.selectedMotorista?.value && { driver_id: Number(data.selectedMotorista.value) }),
    dt_initial: data.selectedRange[0].startDate
      ? formatDateTime(data.selectedRange[0].startDate, data.startTime)
      : '',
    dt_final: data.selectedRange[0].endDate
      ? formatDateTime(data.selectedRange[0].endDate, data.endTime)
      : '',
    ativos_ids: data.selectedVehicle.map((item) => Number(item.value)),
    macro_groups_ids: data.selectedGruposMacros.map((item) => Number(item.value)),
  };
};

// Função para transformar dados da API no formato esperado pelos componentes
export const transformSavedFilterData = (apiData: SavedFilterResponse) => {
  return {
    id: apiData.id,
    customer_id: apiData.customer_id,
    customer_desc: apiData.customer_desc,
    date_created: apiData.dt_created,
    initial_data: apiData.dt_initial,
    final_data: apiData.dt_final,
    ativo_desc: apiData.ativos.length > 0 ? apiData.ativos[0].ativo_desc : '',
    driver_id: apiData.driver_id,
    driver_desc: apiData.driver_desc,
    options: {
      ativos: apiData.ativos.map(ativo => ({
        ativo_id: ativo.ativo_id,
        ativo_desc: ativo.ativo_desc,
      })),
      ponto_referencia: 0, // Este valor não vem da API, pode ser definido como padrão
    },
  };
};


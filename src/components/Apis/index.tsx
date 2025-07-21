import type {
  ActivatedAccessItem,
  ICountData,
  IDataListFilter,
  IListSpeedRegistration,
  SelectProps,
} from '../../shared/DataStructure';
import { type UseQueryResult, useQuery } from 'react-query';
import { type AxiosResponse } from 'axios';
import type {
  IAccess,
  IDeleteListConfig,
  IDeleteListFilter,
  IRequestClient,
  IRequestDrivers,
  IRequestVehicle,
  IRequestVehicleType,
  dataConfig,
} from './types';
import instance from 'src/services/instance';

export const fetchListFilters = async (): Promise<IDataListFilter[]> => {
  const { data } = await instance.get('/f-speed/v1/register/filters/configurations/');
  if (data) {
    return data.reverse();
  } else {
    return [];
  }
};

export const fetchClients = async (): Promise<SelectProps[]> => {
  const { data } = await instance.get<IRequestClient[]>('/f-speed/v1/filters/clients/');
  const newDataFormat = data.map(({ client_id, client_description }) => ({
    value: client_id,
    label: client_description,
  }));
  return newDataFormat;
};

export const useClients = (): UseQueryResult<SelectProps[], unknown> => {
  return useQuery<SelectProps[]>({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });
};

export const fetchVehicles = async (clientId: number): Promise<IRequestVehicle[]> => {
  const { data } = await instance.get<IRequestVehicle[]>(
    `/f-speed/v1/filters/ativos/?cli_id=${clientId}`,
  );
  return data;
};

export const fetchDrivers = async (clientId: number): Promise<SelectProps[]> => {
  const { data } = await instance.get<IRequestDrivers[]>(
    `/f-speed/v1/filters/drivers/?cli_id=${clientId}`,
  );

  const newDataFormat = data.map(({ id, mot_desc }) => ({
    value: id,
    label: mot_desc,
  }));

  return newDataFormat;
};

export const fetchVehicleType = async (clientId?: number): Promise<IRequestVehicleType[]> => {
  const response = await instance.get<IRequestVehicleType[]>(
    `/f-speed/v1/filters/type/${clientId}/`,
  );
  if (!response.data && response.status !== 200) return [];
  return response.data;
};

export const createFilter = async (config: string): Promise<AxiosResponse> => {
  return await instance.post('/f-speed/v1/register/filters/configurations/', config);
};

export const deleteListFilter = async (listRemove: IDeleteListFilter): Promise<AxiosResponse> => {
  return await instance.post(`/f-speed/v1/register/filters/configurations/delete/`, listRemove);
};

//configuration
export const createItemSpeedRegistration = async (config: dataConfig): Promise<AxiosResponse> => {
  return await instance.post(`/f-speed/v1/register/configurations/speed/`, config);
};

export const fetchListSpeedRegistration = async (): Promise<IListSpeedRegistration[]> => {
  const { data } = await instance.get(`/f-speed/v1/register/configurations/speed/`);
  if (data) {
    return data.reverse();
  } else {
    return [];
  }
};

export const editItemSpeedRegistration = async (item: dataConfig): Promise<AxiosResponse> => {
  return await instance.put(`/f-speed/v1/register/configurations/speed/${item.id}/`, item);
};

export const deleteListConfig = async (listRemove: IDeleteListConfig): Promise<AxiosResponse> => {
  return await instance.post(`/f-speed/v1/register/configurations/speed/delete/`, listRemove);
};

export const fetchListAccess = async (): Promise<ActivatedAccessItem[]> => {
  const { data } = await instance.get(`/f-speed/v1/access/ativos/`);
  return data;
};

export const fetchCountAccess = async (): Promise<ICountData> => {
  const { data } = await instance.get(`/f-speed/v1/access/ativos/total/`);
  return data;
};

export const activeAccess = async (listAccess: IAccess): Promise<AxiosResponse> => {
  return await instance.post(`/f-speed/v1/access/ativos/active/`, listAccess);
};

export const deactiveAccess = async (listAccess: IAccess): Promise<AxiosResponse> => {
  return await instance.post(`/f-speed/v1/access/ativos/deactivate/`, listAccess);
};

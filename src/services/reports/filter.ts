import { type AxiosResponse } from 'axios';

import type { Ativo, ChannelRequest, Client, TableVideoItem } from '../../types/filter/index';
import type { SelectProps } from 'src/shared/DataStructure';
import instance from '../instance';

export async function getClients(): Promise<SelectProps[]> {
  const res = await instance.get<Client[]>('/plataform/clients/');
  const data: SelectProps[] = res.data?.map((client: Client) => {
    return { value: client.client_id, label: client.client_description };
  });
  return data;
}

export function getAtivos(): Promise<AxiosResponse<Ativo[]>> {
  return instance.get<Ativo[]>(`/plataform/ativos/`);
}

export function getAtivosByClient(clientId: string): Promise<AxiosResponse<Ativo[]>> {
  return instance.get<Ativo[]>(
    `https://api-mdvr.fulltrackapp.com/mdvr/clients/${clientId}/ativos/`,
  );
}

export function getChannels(ativoId: string | number): Promise<AxiosResponse<ChannelRequest>> {
  return instance.get<ChannelRequest>(
    `https://api-mdvr.fulltrackapp.com/streaming/configuration/ativo/${ativoId}`,
  );
}

export function getVideostracker(
  ativo: string | number,
  channel: string | number,
  startDate: string | undefined,
  endDate: string | undefined,
): Promise<AxiosResponse<TableVideoItem[]>> {
  return instance.get<TableVideoItem[]>(
    `https://api-mdvr.fulltrackapp.com/playbacks/ativo/${ativo}?channel_id=${channel}&date_initial=${startDate}&date_final=${endDate}`,
    {
      validateStatus: () => true,
    },
  );
}

export function setVideostracker(
  file_name: (string | number)[],
  channel_id: number,
  ativo_id: number | string,
): Promise<AxiosResponse<any>> {
  return instance.post<any>(`https://api-mdvr.fulltrackapp.com/playbacks/ativo/${ativo_id}/`, {
    channel_id,
    file_names: file_name,
  });
}

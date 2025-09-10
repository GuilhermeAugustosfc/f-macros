import { type AxiosResponse } from 'axios';

import type { Ativo, Client } from '../../types/filter/index';
import instance from '../instance';
import type { ICustomSelectOption } from 'node_modules/@ftdata/ui/dist/components/CustomSelect';

export async function getClients(): Promise<ICustomSelectOption[]> {
  const res = await instance.get<Client[]>('/plataform/clients/');
  const data: ICustomSelectOption[] = res.data?.map((client: Client) => {
    return { value: client.client_id.toString(), label: client.client_description };
  });
  return data;
}

export function getAtivos(): Promise<AxiosResponse<Ativo[]>> {
  return instance.get<Ativo[]>(`/plataform/ativos/`);
}

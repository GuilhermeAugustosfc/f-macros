import instance from 'src/services/instance';

export interface ActivatedAccessItem {
  ativo_id: number;
  client_id: number;
  client: string;
  plate: string;
  ativo: string;
  is_active: number;
  activation_date: string;
  deactivation_date: string;
}

export interface CountAccessResponse {
  access: number;
  available: number | null;
  unavailable: number;
  demo: number | null;
}

export const getActiveAccessList = async (): Promise<ActivatedAccessItem[]> => {
  const response = await instance.get('/f-work/macros/v1/access/ativos/');
  return response.data;
};

export const getCountAccess = async (): Promise<CountAccessResponse> => {
  const response = await instance.get('/f-work/macros/v1/access/ativos/total/');
  return response.data;
};

export interface ActivateDeactivateRequest {
  ativos_id: number[];
}

export const activateAccess = async (data: ActivateDeactivateRequest): Promise<void> => {
  const response = await instance.post('/f-work/macros/v1/access/ativos/active/', data);
  return response.data;
};

export const deactivateAccess = async (data: ActivateDeactivateRequest): Promise<void> => {
  const response = await instance.post('/f-work/macros/v1/access/ativos/deactivate/', data);
  return response.data;
};

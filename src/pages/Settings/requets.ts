import instance from 'src/services/instance';

export interface CreateMacroGroupRequest {
  description: string;
  customer_id: number;
  ativos_ids: Array<{ ativo_id: number }>;
  macros: Array<{
    description: string;
    macro_color_id: number;
    macro_icone_id: number;
  }>;
}

export const createMacroGroup = async (data: CreateMacroGroupRequest) => {
  const response = await instance.post('/f-work/macros/v1/create/', data);
  return response.data;
};

export interface MacroGroupResponse {
  total: number;
  data: Array<{
    id: number;
    client_description: string;
    description: string;
    dt_updated: string;
    total_ativos: number;
    ativos_ids: Array<{
      ativo_id: number;
      ativo_desc: string;
      plate: string;
    }>;
    macros: Array<{
      description: string;
      macro_color_id: number;
      macro_icone_id: number;
      default_macro?: string;
    }>;
  }>;
}

export const getMacroGroups = async (): Promise<MacroGroupResponse> => {
  const response = await instance.get('/f-work/macros/v1/list/');
  return response.data;
};

export const deleteMacroGroups = async (ids: number[]): Promise<void> => {
  const response = await instance.delete(`/f-work/macros/v1/delete/${JSON.stringify(ids)}`);
  return response.data;
};

export const getMacroGroupById = async (id: number): Promise<MacroGroupResponse['data'][0]> => {
  const response = await instance.get(`/f-work/macros/v1/list/?id=${id}`);
  return response.data.data[0];
};

export const updateMacroGroup = async (id: number, data: CreateMacroGroupRequest): Promise<void> => {
  const response = await instance.put(`/f-work/macros/v1/update/${id}`, data);
  return response.data;
};

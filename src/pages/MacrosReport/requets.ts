import api from 'src/services/instance';
import type { AxiosResponse } from 'axios';

// Tipos das respostas
interface DriverResponse {
  id: number;
  mot_desc: string;
}

interface CustomerResponse {
  client_id: number;
  client_description: string;
}

interface VehicleResponse {
  ativo_id: number;
  ativo: string;
  plate: string;
}

interface MacrosGroupResponse {
  id: number;
  grupo_desc: string;
}

// Novos endpoints do Postman
export const getDrivers = (params?: {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
}): Promise<AxiosResponse<{ total: number; last_id: number | null; data: DriverResponse[] }>> => {
  return api.get('/fuel/v1/drivers', { params });
};

export const getCustomers = (params?: {
  limit?: number;
  search?: string;
  last_id?: number;
}): Promise<AxiosResponse<{ total: number; last_id: number | null; data: CustomerResponse[] }>> => {
  return api.get('/fuel/v1/reports/customers', { params });
};

export const getVehicles = (params?: {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
  group_id?: number;
}): Promise<AxiosResponse<{ total: number; last_id: number | null; data: VehicleResponse[] }>> => {
  return api.get('/fuel/v1/reports/vehicles', { params });
};

export const getGroups = (params?: {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
}): Promise<
  AxiosResponse<{ total: number; last_id: number | null; data: MacrosGroupResponse[] }>
> => {
  // Dados simulados
  const dadosFake: MacrosGroupResponse[] = [
    { id: 1, grupo_desc: 'Grupo Urbano' },
    { id: 2, grupo_desc: 'Grupo Rodoviário' },
    { id: 3, grupo_desc: 'Grupo Especial' },
    { id: 4, grupo_desc: 'Grupo VIP' },
    { id: 5, grupo_desc: 'Grupo Express' },
  ];

  // Simula resposta da API
  const resposta = {
    data: {
      total: dadosFake.length,
      last_id: null,
      data: dadosFake,
    },
  };

  return Promise.resolve(resposta as AxiosResponse<any>);
};

export const insertSavedFilter = (data: any): Promise<AxiosResponse<{ id: number }>> => {
  return api.post('/fuel/v1/reports/insert', data);
};

export const deleteSavedFilter = (
  ids: number[],
): Promise<AxiosResponse<{ num_rows_affected: number }>> => {
  return api.delete(`/fuel/v1/reports/delete/${JSON.stringify(ids)}`);
};

const convertReportDataToParams = (data: any): any => {
  const columns = Object.entries(data.options.colunas)
    .filter((entry) => entry[1] === 1)
    .map(([key]) => key)
    .join(',');

  const createParams = (data: any) => {
    const params = {
      customer_id: data.customer_id,
      ativo_group_id: data.ativo_group_id,
      driver_id: data.driver_id,
      initial_data: data.initial_data,
      final_data: data.final_data,
      columns,
      ponto_referencia: data.options.ponto_referencia,
      preco_combustivel: data.options.preco_combustivel,
      ativos: data.ativo_id ? data.ativo_id : undefined,
      limit: data.limit,
      page: data.page,
      order_field: data.order_field,
      order: data.order,
    };

    // Remove chaves com valores vazios ou zerados
    return Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null && value !== 0 && value !== '',
      ),
    );
  };

  const params = createParams(data);

  return params as any;
};

// Tipos das respostas da API
export interface DriverResponse {
  id: number;
  mot_desc: string;
}

export interface CustomerResponse {
  client_id: number;
  client_description: string;
}

export interface VehicleResponse {
  ativo_id: number;
  ativo: string;
  plate: string;
}

export interface MacrosGroupResponse {
  id: number;
  description: string;
}

// Tipos para filtros salvos
export interface SavedFilterAtivo {
  ativo_id: number;
  ativo_desc: string;
  plate: string;
}

export interface SavedFilterMacroGroup {
  macro_group_id: number;
  description: string;
}

export interface SavedFilterResponse {
  id: number;
  driver_id?: number;
  driver_desc?: string;
  customer_id: number;
  customer_desc: string;
  dt_created: string;
  dt_initial: string;
  dt_final: string;
  ativos: SavedFilterAtivo[];
  macros_groups: SavedFilterMacroGroup[];
}

export interface SavedFiltersApiResponse {
  data: SavedFilterResponse[];
  total: number;
}

// Tipos para parâmetros das funções
export interface GetDriversParams {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
}

export interface GetCustomersParams {
  limit?: number;
  search?: string;
  last_id?: number;
}

export interface GetVehiclesParams {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
  group_id?: number;
}

export interface GetGroupsParams {
  limit?: number;
  search?: string;
  last_id?: number;
  ativo_id?: number;
}

export interface GetReportsParams {
  customer_id?: number;
  dt_initial?: string;
  dt_final?: string;
  ativos_ids?: string;
  macros_group_ids?: string;
  driver_id?: number;
}

export interface GetSavedFiltersParams {
  limit?: number;
  search?: string;
  last_id?: number;
  customer_id?: number;
}

export interface InsertSavedFilterData {
  customer_id: number;
  driver_id?: number;
  dt_initial: string;
  dt_final: string;
  ativos_ids: number[];
  macro_groups_ids: number[];
}

export type IDeleteListConfig = {
    config_ids: number[];
};

export type IDeleteListFilter = {
    filter_ids: number[];
};

export type IAccess = {
    ativos_id: number[];
};

export interface IRequestVehicle {
    ativo_id: number;
    ativo: string;
    plate: string;
    ativo_type: number;
}

export interface IRequestClient {
    client_id: number;
    client_description: string;
}

export interface IRequestDrivers {
    id: number;
    mot_desc: string;
}

export interface IRequestVehicleType {
    id: number;
    type_description: string;
}

export type dataConfig = {
    id?: number;
    client_id?: number;
    type_ativo: number;
    description: string;
    min_average_infraction: string;
    average_infraction: string;
    serious_infraction: string;
    hserious_infraction: string;
    default_speed?: number;
};

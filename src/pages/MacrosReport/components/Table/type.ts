export type VehicleLog = {
    data: string; // formato "10/12/2024 11:38:32"
    driver: string;
    status: 0 | 1 | 2; // 0 - desligado, 1 - movendo, 2 - ligado e parado
    speed: number; // renomeado de speed_km_h
    supply: number; // renomeado de refuel_liters
    draining: number; // renomeado de drain_liters
    loc: [number, number]; // latitude e longitude
    fuel_level: number; // renomeado de fuel_level_liters
    fence: string[]; // array de cercas
    reference_point: string[]; // array de pontos de referência
    coust: number; // renomeado de cust_price
    capacity: number;
    events: 'supply' | 'draining' | 'normal';
    address: string;
};

export interface VehicleData {
    ativo_id: number;
    ativo_desc: string;
    ativo_plate: string;
    odometer: number;
    hourmeter: string;
    comsuption: number;
    idle_comsuption: number;
    movement_comsuption: number;
    consuption_off: number;
    draining: number;
    supply: number;
    consumption_l_h: number;
    comsuption_km_h: number;
    supply_times: number;
    supply_liters: number;
    draining_times: number;
    draining_liters: number;
    current_fuel_level: number;
    average_consuption: number;
    autonomy: number;
    draining_coust: number;
    connected_tanks?: boolean;
    tanks_name?: string[];
}

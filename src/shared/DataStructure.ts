import type { JSX } from 'react';

export interface ISocketTracker {
  alert_id: number;
  ativo_description: string;
  ativo_id: number;
  ativo_name: string;
  ativo_indentification: string;
  ativo_plate: string;
  ativo_type: number;
  client_description: string;
  client_id: number;
  device_id: number;
  driver_name: string;
  dt_gps: string;
  dt_send: string;
  dt_server: string;
  event_id_sintetic: number;
  fuel: { description: string; value_formated: { value: number; unit: string } }[];
  horimeter: number;
  ignition: number;
  indice_id: number;
  latitude: number;
  longitude: number;
  index: number;
  odometer: { value: number; unit: string };
  producer_cat: number;
  producer_id: number;
  satellite: number;
  speed: { value: number; unit: string };
  speed_limit: { value: number; unit: string };
  temperature: { description: string; value_formated: { value: number; unit: string } }[];
  tracker_id: number;
  validate: number;
  is_bloqued: boolean;
}

interface DataTypesSocket {
  lastposition: IVehicleReports[];
}

type ActionMapSocket<M> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        data_type: Key;
      }
    : {
        data_type: Key;
        data: M[Key];
      };
};

export type ProductActionsSocket =
  ActionMapSocket<DataTypesSocket>[keyof ActionMapSocket<DataTypesSocket>];

export interface Options {
  id: number;
  label: string;
}

export interface IDataListFilter {
  id: number;
  configurations: {
    date_initial: string;
    filter_average: number;
    filter_serious: number;
    filter_hserious: number;
    filter_on_tolerance: number;
    ativo_id: number;
    mot_id: number;
    cli_id: number;
    ativo_type: number;
  };
  data_creation: string;
  ativo: string;
  plate: string;
  client_description: string;
  mot_desc: string;
}
export interface FilterSaved {
  client?: string;
  date?: string;
  vehicle?: string;
  driver?: string;
  infractions?: Options[] | string;
}

export interface IFormValuesConfigRegister {
  id?: number;
  client?: SelectProps;
  typeVehicle: SelectPropsTypeVehicle;
  viaClass5?: number;
  nameConfig: string;
  infractionAbove1: string;
  infractionAbove2: string;
  infractionSerious: string;
  edit?: boolean;
}
export interface IFormValues {
  id?: number;
  client: SelectProps;
  date?: Date;
  vehicle: SelectProps;
  driver?: SelectProps;
  infractions: number[];
  toggleSwitch: boolean;
}

export interface IListSpeedRegistration {
  checkbox?: boolean;
  id?: number;
  client_description: string;
  client_id: number;
  type_ativo: number;
  type_description: string;
  description: string;
  min_average_infraction: number;
  average_infraction: number;
  hserious_infraction: number;
  default_speed: number;
}

export interface IVehicleReports {
  id: number;
  address?: string;
  customer: string;
  plate: string;
  vehicle: string;
  driver: string;
  loc: number;
  classe: number;
  speed: number;
  data: string;
  infraction: number;
  speed_limit: number;
}
export interface IDataReports {
  average: number;
  several: number;
  hseveral: number;
  on_tollerance: number;
  without_configuration: number;
  configuration: {
    min_average_infraction: number;
    average_infraction: number;
    serious_infraction: number;
    hserious_infraction: number;
    default_speed: string;
  };
  data: IVehicleReports[];
}

export interface IDataFilters {
  data: IVehicleReports[];
}

export interface IFilters {
  filter: string | null;
}

export interface SelectProps {
  value: number;
  label: string;
}
export interface SelectPropsTypeVehicle {
  value: number;
  label: JSX.Element | string;
}

export interface ICountData {
  access?: number;
  available?: number;
  unavailable?: number;
}

export interface ActivatedAccessItem {
  checkbox: boolean;
  id: number;
  client: string;
  plate: string;
  ativo: string;
  ativo_id: number;
  activation_date: string | null;
  deactivation_date: string | null;
  is_active: number;
}

export interface IListEditConfig {
  client_id: number;
  type_ativo: number;
  description: string;
  min_average_infraction: string;
  average_infraction: string;
  serious_infraction: string;
  hserious_infraction: string;
  default_speed: number;
}

export interface FormErrors {
  client: boolean;
  typeVehicle: boolean;
  viaClass5: boolean;
  nameConfig: boolean;
  infractionAbove: boolean;
  infractionSerious: boolean;
}

export interface settingsStyle {
  'barra-titulo': string;
  'menu-superior': string;
  menu: string;
  'cor-texto': string;
  'cor-texto-menu-superior': string;
  background: string;
  'background-menu-aberto': string;
  index_view_ft: string;
  feedback_color?: 'default' | 'custom';
}

export interface UserSettings {
  slug: string;
  name: string;
  language: string;
  fulltrack_version: string;
  alert_audio: string;
  panic_audio: string;
  theme: string;
  style: settingsStyle;
  unit_coin: string;
  unit_volume: string;
  unit_length: string;
  unit_temperature: string;
  navigator_guide: string;
  first_screen: string;
  hidden_title_fulltrack: string;
  default_language: string;
  default_alert_audio: string;
  default_panic_audio: string;
  photo: string;
  logo: string;
  timezone: string;
}

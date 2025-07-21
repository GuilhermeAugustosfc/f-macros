import type { IconsNames } from 'node_modules/@ftdata/f-icons/dist/types/IconsNames';
import type { StateAlertTypes } from 'node_modules/@ftdata/ui/dist/components/StateAlert';
import type { Dispatch, SetStateAction } from 'react';

export interface FormLogic {
  selectOptions: {
    clientsOptions: SelectOption[];
    selectAtivos: SelectOption[];
    optionsChannels: SelectOption[];
  };
  errors: {
    client: boolean;
    ativo: boolean;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      client: boolean;
      ativo: boolean;
    }>
  >;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  selectRef: React.MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface AlertStateInterface {
  open: boolean;
  message: string;
  icon: IconsNames;
  type: StateAlertTypes;
}

export interface ReferencePoint {
  isChecked: boolean;
  value: number;
}

export interface FormState {
  selectedClient: SelectOption;
  selectedVehicle: SelectOption;
  selectedRange: Range[];
  saveFilters: boolean;
  showDatePicker: boolean;
}

export interface FormErrors {
  client: boolean;
  vehicle: boolean;
  vehicleGroup: boolean;
  motorista: boolean;
}

export interface FormHandlers {
  setSelectedClient: Dispatch<SetStateAction<SelectOption>>;
  setSelectedVehicleGroup: Dispatch<SetStateAction<SelectOption>>;
  setSelectedVehicle: Dispatch<SetStateAction<SelectOption>>;
  setSelectedRange: Dispatch<SetStateAction<Range[]>>;
  setSaveFilters: Dispatch<SetStateAction<boolean>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

export interface SelectOptions {
  clientsOptions: SelectOption[];
  groupOptions: SelectOption[];
  vehicleOptions: SelectOption[];
  motoristaOptions: SelectOption[];
}

export interface UseFormLogicReturn {
  formState: FormState;
  handlers: FormHandlers;
  selectOptions: SelectOptions;
  errors: FormErrors;
  audioRef: React.RefObject<HTMLAudioElement>;
  selectRef: React.RefObject<HTMLDivElement>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  language: string;
  t: (key: string) => string;
  getFirstAndLastDayOfPreviousMonth: () => {
    firstDayOfPreviousMonth: Date;
    lastDayOfPreviousMonth: Date;
  };
}

export interface FormProps {
  close: () => void;
}

export interface CustomColumnConfig {
  isSelected: boolean;
  order: number;
}

export interface CustomColumns {
  data: CustomColumnConfig;
  hora: CustomColumnConfig;
  [key: string]: CustomColumnConfig; // Para permitir acesso dinâmico às propriedades
}

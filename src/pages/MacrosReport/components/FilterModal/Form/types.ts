import type { ICustomSelectOption } from '@ftdata/ui';
import { type Dispatch, type SetStateAction } from 'react';
import { type Range } from 'react-date-range';

export interface ReferencePoint {
  isChecked: boolean;
  value: number;
}

export interface TimeRange {
  hour: string;
  minute: string;
  second: string;
}

export interface FormState {
  selectedClient: ICustomSelectOption;
  selectedVehicle: ICustomSelectOption[];
  selectedMotorista: ICustomSelectOption;
  selectedRange: Range[];
  startTime: TimeRange;
  endTime: TimeRange;
  referencePointSelected: ReferencePoint;
  saveFilters: boolean;
  showDatePicker: boolean;
  selectedGruposMacros: ICustomSelectOption[];
}

export interface FormErrors {
  client: boolean;
  vehicle: boolean;
  motorista: boolean;
  gruposMacros: boolean;
}

export interface FormHandlers {
  setSelectedClient: Dispatch<SetStateAction<ICustomSelectOption | null>>;
  setSelectedVehicle: Dispatch<SetStateAction<ICustomSelectOption[]>>;
  setSelectedMotorista: Dispatch<SetStateAction<ICustomSelectOption | null>>;
  setSelectedRange: Dispatch<SetStateAction<Range[]>>;
  setStartTime: Dispatch<SetStateAction<TimeRange>>;
  setEndTime: Dispatch<SetStateAction<TimeRange>>;
  setReferencePointSelected: Dispatch<SetStateAction<ReferencePoint>>;
  setSaveFilters: Dispatch<SetStateAction<boolean>>;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  setSelectedGruposMacros: Dispatch<SetStateAction<ICustomSelectOption[]>>;
}

export interface SelectOptions {
  clientsOptions: ICustomSelectOption[];
  vehicleOptions: ICustomSelectOption[];
  motoristaOptions: ICustomSelectOption[];
  gruposMacrosOptions: ICustomSelectOption[];
}

export interface UseFormLogicReturn {
  formState: FormState;
  handlers: FormHandlers;
  selectOptions: {
    clientsOptions: ICustomSelectOption[];
    vehicleOptions: ICustomSelectOption[];
    motoristaOptions: ICustomSelectOption[];
    gruposMacrosOptions: ICustomSelectOption[];
  };
  errors: FormErrors;
  selectRef: React.RefObject<HTMLDivElement>;
  handleSubmit: () => void;
  language: string;
  t: (key: string) => string;
  getFirstAndLastDayOfPreviousMonth: () => {
    firstDayOfPreviousMonth: Date;
    lastDayOfPreviousMonth: Date;
  };
}

export interface FormProps {
  applyFilter: (params: any) => void;
  close: () => void;
}

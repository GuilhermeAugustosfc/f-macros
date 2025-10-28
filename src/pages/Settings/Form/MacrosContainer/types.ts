export interface Macro {
  id: string;
  macroId?: number; // ID da macro no backend (para edição)
  name: string;
  color: number; // ID numérico da cor
  iconType?: number; // ID numérico do ícone
  position?: number; // Posição da macro no grupo
  isRequired: boolean;
  isSelected: boolean;
}

export interface MacrosContainerProps {
  maxMacros?: number;
  macros?: Macro[];
  onMacrosChange?: (macros: Macro[]) => void;
  onEditMacro?: (macro: Macro) => void;
  onAddMacro?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  isEditing?: boolean;
}

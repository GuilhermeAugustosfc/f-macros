export interface Macro {
  id: string;
  name: string;
  color: string;
  iconType?: string; // Tipo de ícone selecionado
  isRequired: boolean;
  isSelected: boolean;
}

export interface MacrosContainerProps {
  maxMacros?: number;
  onMacrosChange?: (macros: Macro[]) => void;
  onEditMacro?: (macro: Macro) => void;
  onAddMacro?: () => void;
}

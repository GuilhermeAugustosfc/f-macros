export interface ColorOption {
  id: number;
  color: string;
  name: string;
}

export const colorOptions: ColorOption[] = [
  { id: 1, color: '#85919e', name: 'Padrão' },
  { id: 2, color: '#316ee8', name: 'Azul' },
  { id: 3, color: '#19a675', name: 'Verde' },
  { id: 4, color: '#e95f77', name: 'Vermelho' },
  { id: 5, color: '#d3771e', name: 'Laranja' },
  { id: 6, color: '#8B5CF6', name: 'Roxo' },
  { id: 7, color: '#EC4899', name: 'Rosa' },
  { id: 8, color: '#F59E0B', name: 'Amarelo' },
  { id: 9, color: '#6B7280', name: 'Cinza' },
];

// Função para converter ID da cor para cor real
export const getColorById = (colorId: number): string => {
  return colorOptions.find(c => c.id === colorId)?.color || '#85919e';
};

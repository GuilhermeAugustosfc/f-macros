import React from 'react';

// Importar todos os ícones SVG
import Icone1 from 'src/assets/icones-macros/icone1.svg?react';
import Icone2 from 'src/assets/icones-macros/icone2.svg?react';
import Icone3 from 'src/assets/icones-macros/icone3.svg?react';
import Icone4 from 'src/assets/icones-macros/icone4.svg?react';
import Icone5 from 'src/assets/icones-macros/icone5.svg?react';
import Icone6 from 'src/assets/icones-macros/icone6.svg?react';
import Icone7 from 'src/assets/icones-macros/icone7.svg?react';
import Icone8 from 'src/assets/icones-macros/icone8.svg?react';
import Icone9 from 'src/assets/icones-macros/icone9.svg?react';
import Icone10 from 'src/assets/icones-macros/icone10.svg?react';
import Icone11 from 'src/assets/icones-macros/icone11.svg?react';
import Icone12 from 'src/assets/icones-macros/icone12.svg?react';
import Icone13 from 'src/assets/icones-macros/icone13.svg?react';
import Icone14 from 'src/assets/icones-macros/icone14.svg?react';
import Icone15 from 'src/assets/icones-macros/icone15.svg?react';
import Icone16 from 'src/assets/icones-macros/icone16.svg?react';
import Icone17 from 'src/assets/icones-macros/icone17.svg?react';
import Icone18 from 'src/assets/icones-macros/icone18.svg?react';
import Icone19 from 'src/assets/icones-macros/icone19.svg?react';
import Icone20 from 'src/assets/icones-macros/icone20.svg?react';
import Icone21 from 'src/assets/icones-macros/icone21.svg?react';
import Icone22 from 'src/assets/icones-macros/icone22.svg?react';
import Icone23 from 'src/assets/icones-macros/icone23.svg?react';
import Icone24 from 'src/assets/icones-macros/icone24.svg?react';
import Icone25 from 'src/assets/icones-macros/icone25.svg?react';
import Icone26 from 'src/assets/icones-macros/icone26.svg?react';
import Icone27 from 'src/assets/icones-macros/icone27.svg?react';
import Icone28 from 'src/assets/icones-macros/icone28.svg?react';
import Icone29 from 'src/assets/icones-macros/icone29.svg?react';
import Icone30 from 'src/assets/icones-macros/icone30.svg?react';
import Icone31 from 'src/assets/icones-macros/icone31.svg?react';
import Icone32 from 'src/assets/icones-macros/icone32.svg?react';
import Icone33 from 'src/assets/icones-macros/icone33.svg?react';
import Icone34 from 'src/assets/icones-macros/icone34.svg?react';
import Icone35 from 'src/assets/icones-macros/icone35.svg?react';
import Icone36 from 'src/assets/icones-macros/icone36.svg?react';

export interface IconOption {
  id: number;
  name: string;
  icon: React.ReactElement;
}

// Mapeamento dos ícones
const iconComponents = [
  Icone1,
  Icone2,
  Icone3,
  Icone4,
  Icone5,
  Icone6,
  Icone7,
  Icone8,
  Icone9,
  Icone10,
  Icone11,
  Icone12,
  Icone13,
  Icone14,
  Icone15,
  Icone16,
  Icone17,
  Icone18,
  Icone19,
  Icone20,
  Icone21,
  Icone22,
  Icone23,
  Icone24,
  Icone25,
  Icone26,
  Icone27,
  Icone28,
  Icone29,
  Icone30,
  Icone31,
  Icone32,
  Icone33,
  Icone34,
  Icone35,
  Icone36,
];

// Função para criar as opções de ícones
export const createIconOptions = (iconSize: number = 16): IconOption[] => {
  return iconComponents.map((IconComponent, index) => ({
    id: index + 1,
    name: `Ícone ${index + 1}`,
    icon: <IconComponent width={iconSize} height={iconSize} />,
  }));
};

// Função para obter um ícone específico por ID
export const getIconById = (id: number, iconSize: number = 16): React.ReactElement => {
  const iconIndex = id - 1;
  const IconComponent = iconComponents[iconIndex];

  if (!IconComponent) {
    // Fallback para o primeiro ícone se não encontrar
    return <Icone1 width={iconSize} height={iconSize} />;
  }

  return <IconComponent width={iconSize} height={iconSize} />;
};

// Exportar o ícone padrão
export { Icone1 as DefaultIcon };

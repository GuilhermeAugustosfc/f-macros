import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

interface TableProps {
  scroll: 'near' | 'far';
  size: 'medium' | 'large';
}

const MediaQueryValues = {
  medium: {
    h_0: '28vh',
    h_820: {
      w_700: '28vh',
      w_869: '32vh',
      w_1000: '34vh',
    },
    h_878: {
      w_700: '34vh',
      w_869: '38vh',
      w_1000: '40vh',
    },
    h_970: {
      w_700: '40vh',
      w_869: '42vh',
      w_1000: '44vh',
    },
    h_1100: 'calc(55vh - 3rem)',
  },
  large: {
    h_0: '35vh',
    h_820: {
      w_700: '40vh',
      w_869: '45vh',
      w_1000: '50vh',
    },
    h_878: {
      w_700: '42vh',
      w_869: '50vh',
      w_1000: '55vh',
    },
    h_970: {
      w_700: '43vh',
      w_869: '55vh',
      w_1000: '57vh',
    },
    h_1100: 'calc(55vh - 3rem)',
  },
};

export const TableContainer = styled.div<{ scroll: 'near' | 'far' }>`
  position: relative;
  height: 100%;
  padding: ${({ scroll }) => (scroll === 'near' ? '0 1.5rem' : '0')};
`;

export const TableWrapper = styled.div<TableProps>`
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  max-height: ${({ size }) => (size ? MediaQueryValues[size].h_0 : MediaQueryValues.medium.h_0)};
  overflow-y: auto;
  padding: ${({ scroll }) => (scroll === 'far' ? '0 1.5rem' : '0')};

  table {
    width: 100%;
  }

  // 0px de altura
  @media screen and (min-height: 0px) {
    max-height: ${({ size }) => (size ? MediaQueryValues[size].h_0 : MediaQueryValues.medium.h_0)};
  }

  // 820px de altura
  @media screen and (min-height: 820px) and (min-width: 700px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_820.w_700 : MediaQueryValues.medium.h_820.w_700};
  }

  @media screen and (min-height: 820px) and (min-width: 869px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_820.w_869 : MediaQueryValues.medium.h_820.w_869};
  }

  @media screen and (min-height: 820px) and (min-width: 1000px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_820.w_1000 : MediaQueryValues.medium.h_820.w_1000};
  }

  // 878px de altura
  @media screen and (min-height: 878px) and (min-width: 700px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_878.w_700 : MediaQueryValues.medium.h_878.w_700};
  }

  @media screen and (min-height: 878px) and (min-width: 869px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_878.w_869 : MediaQueryValues.medium.h_878.w_869};
  }

  @media screen and (min-height: 878px) and (min-width: 1000px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_878.w_1000 : MediaQueryValues.medium.h_878.w_1000};
  }

  // 970px de altura

  @media screen and (min-height: 970px) and (min-width: 700px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_970.w_700 : MediaQueryValues.medium.h_970.w_700};
  }

  @media screen and (min-height: 970px) and (min-width: 869px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_970.w_869 : MediaQueryValues.medium.h_970.w_869};
  }

  @media screen and (min-height: 970px) and (min-width: 1000px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_970.w_1000 : MediaQueryValues.medium.h_970.w_1000};
  }

  // 1100px de altura
  @media screen and (min-height: 1100px) {
    max-height: ${({ size }) =>
      size ? MediaQueryValues[size].h_1100 : MediaQueryValues.medium.h_1100};
  }

  // Estilização da barra de rolagem horizontal
  ::-webkit-scrollbar {
    width: 12px;
    height: 10px;
  }
`;

// const MediaQueryValues = {
//     medium: {
//         height: {
//             0: '35vh',
//             820: 'calc(44vh - 3rem)',
//             878: 'calc(47vh - 3rem)',
//             970: 'calc(52vh - 2rem)',
//             1100: 'calc(55vh - 3rem)',
//         },
//         width: {
//             700: '35vh',
//             869: 'calc(44vh - 3rem)',
//             1000: 'calc(47vh - 3rem)',
//         },
//     },
//     large: {
//         height: {
//             0: '60vh',
//             820: '60vh',
//             878: '60vh',
//             970: '60vh',
//             1100: '60vh',
//         },
//         width: {
//             820: {
//                 700: '40',
//                 869: 'calc(44vh - 3rem)',
//                 1000: 'calc(47vh - 3rem)',
//             },
//             878: {
//                 700: '35vh',
//                 869: 'calc(44vh - 3rem)',
//                 1000: 'calc(47vh - 3rem)',
//             },
//             970: {
//                 700: '35vh',
//                 869: 'calc(44vh - 3rem)',
//                 1000: 'calc(47vh - 3rem)',
//             },
//         },
//     },
// };

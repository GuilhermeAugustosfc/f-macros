import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const FooterContainer = styled.tfoot`
  background-color: ${styleguide.COLOR_BRAND_MEDIUM};
  color: ${styleguide.COLOR_NEUTRAL_DAY};
  font-weight: 600;
  text-align: left;

  tr td:first-child {
    position: sticky;
    left: 0;
    background-color: ${styleguide.COLOR_BRAND_MEDIUM};
    border-left: 0;
  }

  tr td {
    height: 48px;
    padding: 0 16px;
    border-left: 1px solid #f4f5f5;
  }

  tr td:not(:first-child) {
    text-align: end;
  }
`;

export const ContainerContent = styled.div`
  height: 100%;
  display: flex;
  overflow-y: scroll;

  & > div > div {
    height: 100%;
    max-height: 100%;
    position: absolute;

    & > table {
      width: 10rem;
      height: 100%;
      max-height: 100%;
    }
  }

  // Esconde a barra de rolagem no Firefox
  scrollbar-width: none;

  // Esconde a barra de rolagem no Chrome, Safari e outros navegadores baseados em WebKit
  &::-webkit-scrollbar {
    display: none;
  }

  // Esconde a barra de rolagem no IE e Edge
  -ms-overflow-style: none;
`;

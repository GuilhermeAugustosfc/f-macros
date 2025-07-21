import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const ContainerVideos = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto: ;
`;

export const ContainerSearch = styled.div`
  background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  display: flex;
  padding: 8px 16px;

  input {
    background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    outline: none;
    width: 100%;
  }

  svg {
    color: ${styleguide.COLOR_NEUTRAL_DARK};
    margin-right: 12px;
  }
`;

export const Container = styled.div`
  height: 77%; //44rem
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 24px;
  width: 100%;

  ::-webkit-scrollbar {
    width: 6px;
    background: rgb(244, 244, 244);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(213, 216, 218);
  }
`;

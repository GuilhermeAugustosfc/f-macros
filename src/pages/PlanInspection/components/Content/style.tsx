import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
export const ContainerContent = styled.div`
  margin: 1.5rem;
`;

export const ContainerInput = styled.div`
  & > div > div {
    border: none;
    background-color: ${tokens.COLOR_NEUTRAL_LIGHTER};
  }

  & > div > div:focus-within {
    border: 1px solid ${tokens.COLOR_NEUTRAL_LIGHT};
  }
`;

export const ContainerTable = styled.div`
  max-width: 100%;
  overflow: auto;
  margin: 0 1.5rem;
  padding-bottom: 10rem;
`;

export const StyledTable = styled.table`
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
`;

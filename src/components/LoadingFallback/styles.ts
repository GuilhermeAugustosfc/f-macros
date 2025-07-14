import styled from 'styled-components';
import * as tokens from '@ftdata/tokens';

export const ComponentLoading = styled.div`
  height: 97vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > h2 {
    color: ${tokens.COLOR_NEUTRAL_DUSK};
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }
`;

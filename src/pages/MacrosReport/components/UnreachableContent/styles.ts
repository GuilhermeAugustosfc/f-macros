import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  flex: 1;

  text-align: center;
  color: ${styleguide.COLOR_NEUTRAL_DUSK};

  strong {
    font-size: 20px;
    font-weight: 500;
    line-height: 120%;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
  }

  button {
    margin-top: 2rem;
  }
`;

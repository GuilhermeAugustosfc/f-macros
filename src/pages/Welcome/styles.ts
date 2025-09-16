import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${styleguide.COLOR_NEUTRAL_LIGHTER};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 1.5rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 85%;
  margin-top: -27px;

  @media (max-width: 64rem) {
    padding: 0 1.5rem;
  }
`;

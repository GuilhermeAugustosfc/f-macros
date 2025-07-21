import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const TBody = styled.tbody`
  border-radius: 0.25rem;
  border-width: 1px;
  font-size: 0.875rem;
  line-height: 1.25rem;

  font-weight: 600;
  border-color: 1px solid ${tokens.COLOR_NEUTRAL_LIGHT};
`;

export const TrBody = styled.tr<{ isEven: boolean }>`
  height: 4rem;
  background: ${({ isEven }) => (isEven ? 'rgba(136, 145, 159, 0.08)' : '')};

  td {
    color: ${tokens.COLOR_NEUTRAL_DUSK};
    padding: 1rem;
    text-align: left;
  }
`;

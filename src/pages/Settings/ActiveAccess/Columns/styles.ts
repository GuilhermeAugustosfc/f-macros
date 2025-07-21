import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const SpanCustomer = styled.div`
  text-transform: capitalize;
`;

export const DivActive = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SpanActive = styled.div<{ getValue: number }>`
  display: block;
  border-radius: 9999px;
  width: 0.75rem;
  height: 0.75rem;
  background: ${({ getValue }) =>
    getValue ? tokens.COLOR_SUCCESS_MEDIUM : tokens.COLOR_NEUTRAL_DARK};
`;

import styled, { keyframes } from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
interface TBodyProps {
  bordeColor: string;
}

export const TBody = styled.tbody<TBodyProps>`
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  border: 1px solid ${({ bordeColor }) => (bordeColor ? bordeColor : tokens.COLOR_NEUTRAL_LIGHT)};
`;

const animationAddBody = keyframes`
    from {
        opacity: 0;
    }
`;
interface TrBodyProps {
  isEven: boolean;
  color: string;
}
export const TrBody = styled.tr<TrBodyProps>`
  height: 4rem;
  background: ${({ isEven, color }) => (isEven ? color : '')};
  animation: ${animationAddBody} 0.5s ease-in;
  color: ${tokens.COLOR_NEUTRAL_DUSK};

  td {
    width: 159px;
    padding-left: 1rem;
    margin: 0 16px;
    text-align: start;
  }
`;

import styled from 'styled-components';
import { CSS, type Transform } from '@dnd-kit/utilities';
import * as tokens from '@ftdata/f-tokens';

export const ContainerAddItem = styled.div`
  display: flex;
  align-items: end;
  padding: 0.5rem 0;
  color: ${tokens.COLOR_ACCENT_MEDIUM};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 150%;

  & > div,
  span {
    cursor: pointer;
  }

  & > div > svg {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ContainerDragInDrop = styled.div<{
  transform: Transform | null;
  transition: string | undefined;
}>`
  transform: ${({ transform }) => CSS.Transform.toString(transform)};
  ${({ transition }) => transition && `transition: ${transition};`}
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 8px;
  background: white;
  cursor: grab;
`;

export const SpanDragInDrop = styled.span`
  min-width: 21rem;
`;

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & > svg {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

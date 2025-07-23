import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const THead = styled.thead`
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: left;
  color: ${tokens.COLOR_NEUTRAL_DARKER};
  height: 5.25rem;
  position: sticky;
  top: 0;
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  box-shadow: -1px -1px 1px 0px white;
  z-index: 1;

  th {
    width: 129px;
    padding: 24px 0;
    font-weight: 600;
    padding-left: 1rem;
    cursor: pointer;
  }
`;

const styles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  userSelect: 'none',
};

export const ThInfo = styled.div<{ sort: boolean }>`
  ${({ sort }) => (sort ? styles : {})}
`;

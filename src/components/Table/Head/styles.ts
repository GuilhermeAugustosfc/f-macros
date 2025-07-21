import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const THead = styled.thead`
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: left;
  color: ${tokens.COLOR_NEUTRAL_DARKER};
  height: 4rem;
  position: sticky;
  top: 0;
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  box-shadow: -1px -1px 1px 0px white;
  z-index: 1;

  th {
    padding-bottom: 0.5rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

const styles = {
  display: 'flex',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  paddingLeft: '1rem',
  gap: '0.75rem',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
};

export const ThInfo = styled.div<{ sort: string }>`
  ${({ sort }) => (sort ? styles : {})}
`;

import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Thead = styled.thead`
  font-size: 0.875rem;
  text-align: left;
  color: ${styleguide.COLOR_NEUTRAL_DAY};
  height: 2.375rem;
  background-color: ${styleguide.COLOR_BRAND_MEDIUM};
  display: flex;
  flex-direction: column;
  width: 24.5rem;
  position: sticky;
  top: 0px;
  border-radius: 4px 4px 0px 0px;
  z-index: 1;

  & > tr {
    width: 100%;

    & > th:first-child {
      width: 5.313rem;
    }
  }
`;

export const Th = styled.th`
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  align-items: center;
  gap: 10px;
  width: 8.75rem;
`;

export const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  userSelect: 'none',
};

export const ContainerOrderIndicatorHeader = styled.div<{ sort: boolean }>`
  ${({ sort }) => (sort ? styles : {})}
`;

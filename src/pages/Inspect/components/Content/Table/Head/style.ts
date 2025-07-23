import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
export const Thead = styled.thead`
  text-align: left;
  color: ${tokens.COLOR_NEUTRAL_DARKER};
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  height: 3.4375rem;

  position: sticky;
  top: 0;
  z-index: 4;

  & > tr > th:first-child {
    padding-left: 0.8% !important;
    border-right: none;
    padding-right: 0;

    @media screen and (max-width: 1515px) {
      padding-left: 0.5% !important;
    }
  }

  & > tr > th:nth-child(2) {
    padding-left: 0;
  }
`;

export const Th = styled.th<{ widthCell: string }>`
  gap: 0.5rem;
  padding: 0.75rem;
  height: 3.5rem;
  font-weight: 600;
  cursor: pointer;
  min-width: ${(props) => props.widthCell};
  overflow: hidden;
  text-overflow: ellipsis;
  width: initial;
`;

export const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  userSelect: 'none',
};

export const ContainerOrderIndicatorHeader = styled.div<{ sort: boolean }>`
  ${(sort) => (sort ? styles : {})}
`;

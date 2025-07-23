import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const TableContainer = styled.div`
  position: relative;
  height: 100%;
`;

export const TableWrapper = styled.div`
  background-color: ${tokens.COLOR_NEUTRAL_DAY};
  height: 100%;

  table {
    width: 100%;
  }
`;

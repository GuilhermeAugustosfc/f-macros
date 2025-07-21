import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Tbody = styled.tbody`
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 24.5rem;

  & > tr:last-child > td:last-child {
    border-radius: 0px 0px 4px 0px;
  }

  & > tr:last-child > td:first-child {
    border-radius: 0px 0px 0px 4px;
  }
`;

export const TrBody = styled.tr<{ isEven: boolean }>`
  border: 1px solid #fff;
  background: ${({ isEven }) =>
    isEven ? styleguide.COLOR_NEUTRAL_LIGHTER : styleguide.COLOR_NEUTRAL_DAY};
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
  width: 100%;
  cursor: pointer;

  & > td:first-child {
    width: 5.313rem;
  }
`;

export const TdBody = styled.td<{ backgroudColor: string }>`
  text-align: left;
  padding: 5px 16px;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  width: 10.4685rem;
  gap: 10px;
  background: ${({ backgroudColor }) => backgroudColor};
  border-left: 1px solid #f4f5f5;
`;

export const TdBodySticky = styled.td<{ backgroudColor: string }>`
  text-align: left;
  position: sticky;
  left: 0;
  z-index: 9;
  padding: 5px 16px;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  background: ${({ backgroudColor }) => backgroudColor};
  border-left: 1px solid #f4f5f5;
`;

export const TD = styled.td`
  height: 25rem;
  width: 25rem;
  padding: 8px;
`;

import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Tbody = styled.tbody`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
  border-left: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
  border-bottom: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
`;

export const TrBody = styled.tr`
  background: #fff;
  color: #26333b;
  font-size: 0.875rem; // 14px para rem
  height: 2.5rem; // 40px para rem
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  & > td:first-child {
    border-right: none;
  }

  & > td:nth-child(2) {
    padding-left: 0;
  }
`;

export const TdBody = styled.td<{ widthCell: string }>`
  border-right: 1px solid #b1b7bb;
  border-bottom: 1px solid #b1b7bb;
  font-weight: bold;
  min-width: ${(props) => props.widthCell};
  padding: 0.75rem;
  & > div {
    display: flex;
    gap: 0.625rem; // 10px para rem
    justify-content: flex-start;
    cursor: pointer;
  }
  text-align: center;
  vertical-align: middle;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

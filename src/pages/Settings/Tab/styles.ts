import styled from 'styled-components';

export const TabComponent = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  padding: 0;
  width: max-content;
`;

export const TabHeader = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  height: 18px;
`;

export const TabIcon = styled.div<{ isActive?: boolean }>`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    stroke: ${({ isActive }) => (isActive ? '#C13E4A' : '#6B757C')};
    width: 18px;
    height: 18px;
  }
`;

export const TabText = styled.p<{ isActive?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  color: ${({ isActive }) => (isActive ? '#C13E4A' : '#6B757C')};
  margin: 0;
`;

export const TabUnderline = styled.div<{ isActive?: boolean }>`
  height: 0;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ isActive }) => (isActive ? '#C13E4A' : 'transparent')};
  }
`;

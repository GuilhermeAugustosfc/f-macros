import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const TabContainer = styled.nav`
  display: flex;
  height: 1.875rem;
  align-items: center;
  gap: 1.5rem;
`;

interface TabButtonProps {
  isActive: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  display: flex;
  align-items: end;
  gap: 0.375rem;
  color: ${(props) =>
    props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 120%;
  position: relative;
  padding-bottom: 0.75rem;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 0.1875rem solid
    ${(props) => (props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : 'transparent')};
  transition: all 0.3s ease;

  & > svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  svg path {
    stroke: ${(props) =>
      props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER};
  }
`;

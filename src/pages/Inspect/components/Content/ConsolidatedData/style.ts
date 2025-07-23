import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';
import type { TypeCardComponent } from './CardComponent';

export const ContainerCards = styled.div`
  display: flex;
  padding: 0rem 1.5rem;
  gap: 1rem;
  margin-top: 1.531rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  border: 1px solid ${tokens.COLOR_NEUTRAL_LIGHT};
  border-radius: ${tokens.BORDER_RADIUS_MD};
  padding: 0.813rem 1rem;
  flex: 0 0 calc((100% - (16px * 4)) / 5); /* 4 espaços de 16px entre 5 cards */
  height: 7.75rem;
  min-width: 13.875rem; /* largura mínima para quebra de linha */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Summary = styled.span`
  font-weight: ${tokens.FONT_WEIGHT_MEDIUM};
  font-size: ${tokens.FONT_SIZE_XS};
  word-wrap: break-word;
  line-height: 150%;
  font-family: ${tokens.FONT_FAMILY_01};
  color: ${tokens.COLOR_NEUTRAL_DARKER};
`;

export const ContainerStatics = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;

  & > div:first-child {
    font-size: ${tokens.FONT_SIZE_XL};
    line-height: 120%;
    font-weight: ${tokens.FONT_WEIGHT_BOLD};
    font-family: ${tokens.FONT_FAMILY_01};
    color: ${tokens.COLOR_NEUTRAL_DUSK};
  }
`;

const typeCardColors: Record<TypeCardComponent, string> = {
  all_completed: tokens.COLOR_ACCENT_DARK,
  approved: tokens.COLOR_SUCCESS_DARK,
  disapproved: tokens.COLOR_DANGER_DARK,
  late: tokens.COLOR_WARNING_DARK,
  repaired: tokens.COLOR_SUCCESS_DARK,
};

export const ContainerPercent = styled.div<{ type: TypeCardComponent }>`
  padding: 0.25rem 0.5rem;
  width: 3.31rem;
  height: 1.25rem;
  text-align: center;
  background: ${({ type }) => typeCardColors[type]};
  border-radius: ${tokens.BORDER_RADIUS_SM};
  color: ${tokens.COLOR_NEUTRAL_DAY};
  font-size: ${tokens.FONT_SIZE_XXS};
  font-weight: ${tokens.FONT_WEIGHT_BOLD};
`;

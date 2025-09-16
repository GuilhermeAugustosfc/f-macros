import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  height: 10rem;
  background: ${styleguide.COLOR_BRAND_DARK};
  color: ${styleguide.COLOR_NEUTRAL_DAY};

  @media (max-width: 64rem) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const ContainerPresentation = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 1.125rem;
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    margin-bottom: 10px;

    span {
      padding: 0 0.5rem;
      text-align: center;
      gap: 0.75rem;
      border-radius: 0.25rem;
      background: ${styleguide.COLOR_NEUTRAL_DAY};
      width: max-content;
      color: ${styleguide.COLOR_NEUTRAL_DUSK};
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
`;

export const ContainerButtonConfiguration = styled.div`
  display: flex;
  height: 3.438rem;
  align-items: center;
`;

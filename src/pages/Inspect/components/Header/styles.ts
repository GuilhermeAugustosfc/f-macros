import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const ContainerTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem 0 1.5rem;
  /* padding: 1rem 1.5rem; */
  /* height: 3.5rem; */
`;

type JustifyProps = {
  justifyContent?: string;
};

export const HeaderContainer = styled.header<JustifyProps>`
  border-bottom: 0.0625rem solid ${styleguide.COLOR_NEUTRAL_LIGHT};
  padding: 1rem 1.5rem;
  display: flex;
  height: 3.5rem;
  justify-content: ${(props) => props.justifyContent || 'flex-start'};

  & > div {
    display: flex;
    background: ${styleguide.COLOR_BRAND_MEDIUM};
    border-radius: ${styleguide.BORDER_RADIUS_SM};
    color: ${styleguide.COLOR_NEUTRAL_DAY};
    padding: 16px 8px;
    gap: 8px;
    align-items: center;

    & > button {
      padding: 0;
    }

    & > button:focus {
      border: none;
      border-style: hidden !important;
    }

    & > svg {
    }
  }
`;

export const TitleHeader = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  gap: 0.75rem;
`;

export const KnowMore = styled.div`
  display: flex;
  align-items: self-end;
  gap: 0.625rem;
  color: ${styleguide.COLOR_ACCENT_MEDIUM};
  font-weight: 600;
  line-height: 120%;
  font-family: ${styleguide.FONT_FAMILY_01};
  cursor: pointer;
  font-size: ${styleguide.FONT_SIZE_SM};
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const FilterContainer = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  // justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
  min-height: 6rem;

  & > div:first-child {
    font-size: ${styleguide.FONT_SIZE_MD};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    font-family: ${styleguide.FONT_FAMILY_01};
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
    display: inline-flex;
    align-items: center;
    max-width: fit-content;
    white-space: nowrap;
  }
`;

export const FilterIconSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Filters = styled.div`
  max-width: 54rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0 1rem;
`;

export const Container = styled.div``;

export const ContainerSearch = styled.div`
  background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  display: flex;
  width: 14.375rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;

  input {
    background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    outline: none;
    width: 100%;
  }

  svg {
    color: ${styleguide.COLOR_NEUTRAL_DARK};
    margin-right: 12px;
  }
`;

export const BadgeFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25em 0.5rem;
  background-color: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  color: ${styleguide.COLOR_NEUTRAL_DUSK};

  & > span {
    font-size: ${styleguide.FONT_SIZE_SM};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    line-height: 120%;
    font-family: ${styleguide.FONT_FAMILY_01};
  }

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

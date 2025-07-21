import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const FooterContainer = styled.tfoot`
  background-color: ${styleguide.COLOR_BRAND_MEDIUM};
  color: ${styleguide.COLOR_NEUTRAL_DAY};
  font-weight: 600;
  text-align: left;

  tr td:first-child {
    position: sticky;
    left: 0;
    background-color: ${styleguide.COLOR_BRAND_MEDIUM};
    border-left: 0;
  }

  tr td {
    height: 48px;
    padding: 0 16px;
    border-left: 1px solid #f4f5f5;
  }

  tr td:not(:first-child) {
    text-align: end;
  }
`;

export const ContainerTH = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  justify-content: flex-start;
  cursor: pointer;

  & > span {
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }

  & > div {
    display: flex;
  }
`;

type PropsStatus = {
  color: 0 | 1 | 2;
};

const indexedColors = [
  styleguide.COLOR_ACCENT_DARK,
  styleguide.COLOR_SUCCESS_DARK,
  styleguide.COLOR_DANGER_DARK,
];

export const SpanStatus = styled.span<PropsStatus>`
  display: flex;
  padding: 0.0625rem 0.1875rem 0.0625rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  border-radius: 0.25rem;

  color: ${styleguide.COLOR_NEUTRAL_DAY};
  text-align: center;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 0.9rem */

  background-color: ${(props) => indexedColors[props.color]};
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 50vh;
  /* min-width: 1024px; */
  /* border-collapse: separate; */
  border-spacing: 0;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > div:first-child {
    width: 100%;
    overflow: auto;
    display: inline-grid;
    max-height: 60vh;

    @media screen and (max-height: 900px) {
      max-height: 50vh;
    }

    @media screen and (max-height: 850px) {
      max-height: 45vh;
    }

    @media screen and (max-height: 700px) {
      max-height: 38vh;
    }
  }

  & > #loading {
    height: 60vh;

    @media screen and (max-height: 900px) {
      height: 50vh;
    }

    @media screen and (max-height: 850px) {
      height: 45vh;
    }

    @media screen and (max-height: 700px) {
      height: 38vh;
    }
  }
`;

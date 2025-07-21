import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const ContainerSpan = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div``;

export const TitleSpan = styled.span`
  margin-bottom: 0.625rem;
  font-size: ${styleguide.FONT_SIZE_MD};
  font-family: ${styleguide.FONT_FAMILY_01};
  font-weight: ${styleguide.FONT_WEIGHT_BOLD};
  line-height: ${styleguide.LINE_HEIGHT_TIGHT};
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
`;

export const SubTitleSpan = styled.span`
  font-size: ${styleguide.FONT_SIZE_SM};
  font-family: ${styleguide.FONT_FAMILY_01};
  font-weight: ${styleguide.FONT_WEIGHT_BOLD};
  line-height: ${styleguide.LINE_HEIGHT_TIGHT};
  color: ${styleguide.COLOR_NEUTRAL_DARKER};
`;

export const ButtonImportVideo = styled.div``;

export const ContainerHeaderContent = styled.div`
  display: flex;
  padding: 1rem 2.125rem 0rem 1.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
`;

export const ContainerActionContent = styled.div`
  height: 100%;
  display: flex;
  /* overflow-y: scroll; */

  // Esconde a barra de rolagem no Firefox
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;

export const ContainerTable = styled.div`
  padding: 1rem 2.125rem 1.5rem 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  & > div:first-child {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    & > div:first-child {
      display: flex;
      row-gap: 1.5rem;
    }
  }
`;

export const ContainerSearch = styled.div`
  background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  display: flex;
  width: 17.875rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  margin-right: 1rem;

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

export const ContainerSelectAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
`;

export const ContainerLayout = styled.div`
  display: flex;
  flex-direction: row;

  & > div:first-child {
    margin-right: 0.75rem;
  }
`;

export const ContainerLayoutGrid = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
`;

export const ButtonLayout = styled.div<{ active: boolean }>`
  display: inline-flex;
  padding: 0.25rem;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  border-radius: 0.375rem;

  background-color: ${(props) =>
    props.active ? styleguide.COLOR_ACCENT_LIGHTER : styleguide.COLOR_NEUTRAL_LIGHTER};

  & > svg {
    color: ${(props) =>
      props.active ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER};
  }
`;

export const ContainerButton = styled.div`
  &,
  & > button > span {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    & > span {
      color: ${styleguide.COLOR_NEUTRAL_DAY};
      font-family: Inter;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
    }
  }

  & > button:first-child {
    margin-right: 1.5rem;
  }

  & > button {
    height: 2.5rem;
  }
`;

export const ContainerCollapse = styled.div`
  & > div {
    z-index: 2;
  }

  & > div:first-child {
    position: absolute;
    top: 17.3rem;
    background-color: red;
    padding: 1.5rem 1rem;
    width: 17.875rem;

    border: 0px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
    background: ${styleguide.COLOR_NEUTRAL_DAY};
    box-shadow: 0px 8px 16px 0px rgba(107, 117, 124, 0.32);

    & > h3 {
      color: ${styleguide.COLOR_NEUTRAL_DARKER};
      font-family: Inter;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
    }
  }

  & > div:last-child {
    position: absolute;
    top: 21.8rem;
    background-color: red;
    padding: 0rem 1rem 1.5rem 1rem;
    width: 17.875rem;

    border-radius: 0rem 0rem 0.375rem 0.375rem;
    border: 0px solid ${styleguide.COLOR_NEUTRAL_LIGHT};
    background: ${styleguide.COLOR_NEUTRAL_DAY};
    box-shadow: 0px 8px 16px 0px rgba(107, 117, 124, 0.32);
  }
`;

export const ContainerTableContent = styled.div`
  width: 100%;
  height: 30rem;
  padding-left: 1.5rem;
  padding-right: 2.13rem;
`;

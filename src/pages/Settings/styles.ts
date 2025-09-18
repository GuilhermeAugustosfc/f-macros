import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const ContainerTabs = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 24px 0 24px;
  background: white;
  width: 100%;
  height: 54px;
  box-sizing: border-box;
`;

export const ContentTabs = styled.div`
  font-family: Inter;
`;

export const ContainerInformation = styled.div`
  .count-access {
    height: 2rem;
    display: flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    background: #3b485b;

    div {
      display: flex;
      align-items: center;
      gap: 8px;

      p {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
      }

      span {
        text-align: center;
        border-radius: 24px;
        background: #fff;
        color: #26333b;
        font-size: 12px;
        font-weight: 600;
        width: 24px;
      }
    }
  }
`;

export const ContainerActions = styled.div`
  display: flex;
  gap: 1.5rem;

  .buttonRemove {
    background: ${styleguide.COLOR_DANGER_MEDIUM};
  }

  .btn-actions {
    display: flex;
    gap: 1.25rem;

    button:last-child {
      background: ${styleguide.COLOR_DANGER_MEDIUM};
    }
  }

  .btn-delete {
    background: ${styleguide.COLOR_DANGER_MEDIUM};
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  background-color: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  padding: ${styleguide.SPACING_SQUISH_NANO};
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  width: 14.5rem;
  border: 2px solid ${styleguide.COLOR_NEUTRAL_LIGHTER};

  & > svg {
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    & > input {
      width: 100%;
      outline: 2px solid transparent;
      outline-offset: 2px;
      font-size: ${styleguide.FONT_SIZE_SM};
      font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
      background-color: transparent;
      color: ${styleguide.COLOR_NEUTRAL_DUSK};

      &:focus {
        border: none;
      }
    }
  }

  :focus-within {
    background: transparent;
    border: none;
  }

  .close {
    cursor: pointer;

    :hover {
      transform: scale(1.3);
    }
  }
`;

export const ContainerTable = styled.div`
  margin-top: 2rem;
  height: 100%;

  table {
    width: 100%;
  }
`;

export const HeaderDescription = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  .container-title {
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      color: ${styleguide.COLOR_NEUTRAL_DARKER};
    }
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: ${styleguide.FONT_SIZE_SM};
  font-weight: 500;
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  width: calc(100% - 56px);
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px 32px;
  box-shadow: 0px 8px 16px 0px rgba(107, 117, 124, 0.32);
  background: #fff;
`;

export const ContainerLoading = styled.div`
  position: relative;
  height: calc(100vh - 30rem);
`;

export const GridContainer = styled.div`
  transform: translateZ(0);
  display: grid;
  grid-template-areas:
    'title'
    'tabs'
    'content';
  grid-template-rows: repeat(2, auto) 1fr;
  height: 100%;
  width: 100%;
`;

export const TittleContainerGrid = styled.div`
  box-sizing: border-box;
  padding: 16px 24px;
  grid-area: title;
`;

export const TabsContainerGrid = styled.div`
  padding: 0;
  grid-area: tabs;
  background: white;
`;

export const ContentContainerGrid = styled.div`
  font-family: Inter;
  overflow-y: auto;
  grid-area: content;
`;

export const ContainerTabContent = styled.div`
  background-color: ${styleguide.COLOR_NEUTRAL_DAY};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 5.5rem - 3.5rem);
  overflow-y: auto;
  padding: 0 1.5rem;
  padding-top: 24px;
  width: 100%;
`;

export const ContainerHeader = styled.div`
  box-sizing: border-box;
  grid-area: header;
`;

export const ContainerTableGrid = styled.div`
  padding-bottom: 6rem;
`;

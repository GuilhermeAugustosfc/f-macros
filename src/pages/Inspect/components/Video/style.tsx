import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

type ContainerVideoProp = {
  positionX: number;
  positionY: number;
  dragging: boolean;
};

export const ContainterVideo = styled.div<ContainerVideoProp>`
  position: fixed;
  user-select: none;
  top: 0;
  z-index: 10;

  background-color: coral;
  color: white;
  border-radius: 0.44675rem;
  border: 0.894px solid ${styleguide.COLOR_NEUTRAL_MEDIUM};
  background: ${styleguide.COLOR_NEUTRAL_DAY};
  box-shadow: 0px 7.148px 14.297px 0px rgba(107, 117, 124, 0.32);

  transform: translate(${(props) => `${props.positionX}px, ${props.positionY}px`});
  cursor: ${(props) => (props.dragging ? 'grabbing' : 'grab')};
  touch-action: none;

  height: auto;
  width: 25.13131rem;

  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  & > div,
  & > div > video {
    width: 100%;
  }

  & > div:last-child {
    display: flex;
    align-items: flex-start;
    gap: 0.89356rem;

    & > button:first-child > span > a {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }
`;

export const ContainerCardInformation = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;

  & > span {
    font-family: Inter;
    line-height: 120%;
    font-style: normal;
    font-weight: 600;
  }

  & > span:nth-child(1) {
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-size: 0.89356rem;
  }

  & > span:nth-child(2) {
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-size: 0.78188rem;
  }

  & > span:nth-child(3) {
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
    font-size: 0.78188rem;
  }

  & > span:nth-child(4) {
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
    font-size: 0.78188rem;
  }
`;

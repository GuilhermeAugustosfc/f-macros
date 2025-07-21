import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ContainerModal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: 100%;
  max-height: 100vh;
  pointer-events: none;
`;

export const ContentModal = styled.div`
  display: flex;
  overflow: hidden;
  overflow-y: auto;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const StateAlert = styled.div`
  height: 3.125rem;
  color: ${styleguide.COLOR_SUCCESS_MEDIUM};
  background-color: ${styleguide.COLOR_SUCCESS_LIGHTER};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  & > div:first-child {
    display: flex;
    align-items: center;
    margin: 10px 0px 0px 10px;

    & > svg {
      margin-right: 1rem;
    }
  }
`;
interface Props {
  width: string;
}

export const ProgressBar = styled.div<Props>`
  background-color: ${styleguide.COLOR_SUCCESS_DARK};
  width: 100%;
  /* width: ${({ width }) => width + '%'}; */
  height: 100%;
  transition: width 5s 0.5s;
`;

export const ConteinerProgressBar = styled.div`
  background-color: ${styleguide.COLOR_SUCCESS_LIGHT};
  width: 100%;
  height: 0.5rem;
`;

import styled from 'styled-components';

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
  max-width: 416px;
  max-height: 100vh;
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

  h2 {
    font-size: inherit;
    line-height: inherit;
  }
`;

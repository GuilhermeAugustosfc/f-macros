import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

export const Container = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${styleguide.SHADOW_LEVEL_02} rgba(107, 117, 124, 0.32);
  height: 78vh;
`;

export const Title3 = styled.h3`
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 4px;
  background-color: #fff;
  max-width: 500px;
  width: 100%;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  transition: all 0.2s;
  text-align: center;
`;

export const TextContent = styled.div`
  h4 {
    margin-bottom: 12px;
    margin-top: 1rem;
    font-weight: 600;
    color: ${styleguide.COLOR_CUSTOM_COLUMNBG};
  }

  p {
    color: ${styleguide.COLOR_NEUTRAL_DARKER};
  }
`;

export const StyledButton = styled.div`
  &:hover {
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
  }
`;

export const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #e191991a;
  height: 200px;
  width: 22.563rem;
  height: 14.375rem;

  @media (max-width: 1024px) {
    height: 150px;
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

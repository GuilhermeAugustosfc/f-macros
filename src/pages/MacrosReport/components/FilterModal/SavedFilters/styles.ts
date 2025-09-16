import styled, { keyframes } from 'styled-components';
import { Button } from '@ftdata/ui';

export const LoadingContainer = styled.div`
  display: flex;
  height: 28.125rem;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const StyledDoubleListContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`;

interface ListContainerProps {
  hasSelectedFilters: boolean;
}

export const ListContainer = styled.div<ListContainerProps>`
  width: 100%;
  max-height: ${({ hasSelectedFilters }) => (hasSelectedFilters ? 'calc(100% - 8.75rem)' : '100%')};
  overflow-y: auto;
`;

export const NoFiltersMessage = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #d5d8da;
  background: #fff;
  background-color: #f5f5f5;
  text-align: center;
  color: #8e969b;
`;

export const SavedFilter = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #d5d8da;
  background: #fff;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  color: #8e969b;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;

  svg {
    width: 1rem;
  }
`;

export const FilterName = styled.span`
  flex: 1;
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1.5rem;
`;

export const BadgeTitle = styled.div`
  display: flex;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--Brand-medium, #f5f5f5);
  color: #26333b;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: #26333b;
    }
  }
`;

export const DeleteBar = styled.div<{ maxHeight: number }>`
  position: absolute;
  bottom: 0%;
  left: 0px;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgb(238, 109, 109);
  color: white;
  animation: 0.4s ease-in-out 0s 1 normal none running growIn;
  transform-origin: center bottom;
  padding: ${({ maxHeight }) => (maxHeight ? '24px' : '0px')};
  z-index: 100;

  /* Adiciona as propriedades de transição */
  overflow: hidden;
  max-height: ${(props) => props.maxHeight}px; /* Altura máxima quando visível */
  transition:
    max-height 0.3s ease-in-out,
    padding 0.3s ease-in-out;

  /* Estado quando não há filtros selecionados */
  &:empty {
    max-height: 0;
    padding: 0;
    border-bottom: none;
  }
`;

export const show = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

export const ContainerButtons = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  background: linear-gradient(
    359.16deg,
    #ffffff 91.54%,
    rgba(255, 255, 255, 0) 99.24%,
    rgba(255, 255, 255, 0.88) 99.24%,
    rgba(255, 255, 255, 0.6) 99.24%
  );
  animation: ${show} 0.3s linear;

  button:first-child,
  button:last-child {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const CustomButton = styled(Button)`
  span {
    display: flex;
  }
`;

export const SavedFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

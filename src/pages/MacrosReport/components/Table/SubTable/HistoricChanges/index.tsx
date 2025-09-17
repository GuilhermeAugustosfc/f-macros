import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { RelatoriosIcon } from '../../../svg';
import { ReportsContext } from '../../../../../../contexts/reports';

interface Props {
  isEven: boolean;
}

const HistoricChanges: React.FC<Props> = ({ isEven }: Props) => {
  const { setIsModalDetalhesOpen } = useContext(ReportsContext);
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Container isEven={isEven}>
      <AnimatedLeftSection isHidden={isHidden}>
        <HistoryCard>
          <HeaderSection>
            <HeaderIcon>
              <RelatoriosIcon width={24} height={24} stroke="#26333b" />
            </HeaderIcon>
            <HeaderText>Alterações Recentes</HeaderText>
            <ViewMoreLink onClick={() => setIsModalDetalhesOpen(true)}>Ver mais</ViewMoreLink>
          </HeaderSection>

          <HistoryList>
            <HistoryItem>
              Macro alterada de "Aguardando mudas" para "Pulverizando a lavoura" por Admin Roberto -
              26/02/2025 10:30:25
            </HistoryItem>
            <HistoryItem>
              Data de início de "Início de jornada" alterada de "26/02/2025 7:45:56" para
              "26/02/2025 8:45:00" por Admin Roberto - 25/02/2025 9:10:07
            </HistoryItem>
          </HistoryList>
        </HistoryCard>
      </AnimatedLeftSection>

      <RightSection>
        <HideButton onClick={toggleVisibility}>
          <HideLabel>{isHidden ? 'Expandir' : 'Ocultar'}</HideLabel>
          <ToggleSwitch isActive={!isHidden}>
            <ToggleSlider isActive={!isHidden} />
          </ToggleSwitch>
        </HideButton>
      </RightSection>
    </Container>
  );
};

const Container = styled.div<{ isEven: boolean }>`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px;
  background-color: ${({ isEven }) => (isEven ? '#F5F5F5' : '#fff')};
  border-bottom: 1px solid #e5e7eb;
`;

const AnimatedLeftSection = styled.div<{ isHidden: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
  max-height: ${({ isHidden }) => (isHidden ? '0px' : '300px')};
  opacity: ${({ isHidden }) => (isHidden ? '0' : '1')};
  animation: ${({ isHidden }) => (isHidden ? slideUp : slideDown)} 0.3s ease-in-out;
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
`;

const HistoryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  position: relative;
  border-left: 3px solid #316ee8;
`;

const HeaderSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  color: #26333b;
  margin: 0;
  white-space: nowrap;
`;

const ViewMoreLink = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  color: #316ee8;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0px;
    opacity: 0;
  }
  to {
    max-height: 300px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 300px;
    opacity: 1;
  }
  to {
    max-height: 0px;
    opacity: 0;
  }
`;

const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
`;

const HistoryItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #6b757c;
  list-style-type: disc;
  margin-left: 18px;

  &::marker {
    color: #6b757c;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  justify-content: center;
  width: 254px;
  padding: 12px 8px 0 0;
`;

const HideButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

const HideLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  color: #222b38;
  white-space: nowrap;
`;

const ToggleSwitch = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 40px;
  height: 24px;
  background-color: ${({ isActive }) => (isActive ? '#316ee8' : '#b1b7bb')};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#2563eb' : '#9ca3af')};
  }
`;

const ToggleSlider = styled.div<{ isActive: boolean }>`
  position: absolute;
  right: ${({ isActive }) => (isActive ? '4px' : '20px')};
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: right 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${ToggleSwitch}:hover & {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export default HistoricChanges;

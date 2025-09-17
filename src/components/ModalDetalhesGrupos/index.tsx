import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '../../pages/MacrosReport/components/svg';
import OrderIndicator from '../../pages/MacrosReport/components/OrderIndicator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, ArcElement, ChartTooltip, ChartLegend);

interface ModalDetalhesGruposProps {
  isOpen: boolean;
  onClose: () => void;
}

Modal.setAppElement('#root');

export const ModalDetalhesGrupos: React.FC<ModalDetalhesGruposProps> = ({ isOpen, onClose }) => {
  const nodeRef = useRef(null);
  const [activeTab, setActiveTab] = useState('fazenda');

  // Dados mockados para cada tab
  const historicoAlteracoesData = {
    fazenda: [
      {
        parametro: 'Início',
        antes: { data: '26/02/2025', hora: '7:45:56' },
        depois: { data: '26/02/2025', hora: '8:00:00' },
        alteradoPor: 'Admin Roberto',
        alteradoEm: { data: '04/09/2025', hora: '9:54:21' },
      },
      {
        parametro: 'Macro',
        antes: 'Aguardando mudas',
        depois: 'Plantando mudas',
        alteradoPor: 'Admin Roberto',
        alteradoEm: { data: '04/09/2025', hora: '9:54:21' },
      },
      {
        parametro: 'Fim',
        antes: { data: '26/02/2025', hora: '7:45:56' },
        depois: { data: '26/02/2025', hora: '8:00:00' },
        alteradoPor: 'Admin Roberto',
        alteradoEm: { data: '04/09/2025', hora: '9:54:21' },
      },
    ],
    colheita: [
      {
        parametro: 'Início',
        antes: { data: '15/03/2025', hora: '6:30:00' },
        depois: { data: '15/03/2025', hora: '7:15:00' },
        alteradoPor: 'Admin Maria',
        alteradoEm: { data: '10/09/2025', hora: '14:20:15' },
      },
      {
        parametro: 'Macro',
        antes: 'Preparando colheita',
        depois: 'Colhendo frutos',
        alteradoPor: 'Admin Maria',
        alteradoEm: { data: '10/09/2025', hora: '14:20:15' },
      },
      {
        parametro: 'Fim',
        antes: { data: '15/03/2025', hora: '6:30:00' },
        depois: { data: '15/03/2025', hora: '7:15:00' },
        alteradoPor: 'Admin Maria',
        alteradoEm: { data: '10/09/2025', hora: '14:20:15' },
      },
    ],
    jornada: [
      {
        parametro: 'Início',
        antes: { data: '20/04/2025', hora: '5:45:30' },
        depois: { data: '20/04/2025', hora: '6:30:45' },
        alteradoPor: 'Admin João',
        alteradoEm: { data: '12/09/2025', hora: '11:35:22' },
      },
      {
        parametro: 'Macro',
        antes: 'Iniciando viagem',
        depois: 'Em trânsito',
        alteradoPor: 'Admin João',
        alteradoEm: { data: '12/09/2025', hora: '11:35:22' },
      },
      {
        parametro: 'Fim',
        antes: { data: '20/04/2025', hora: '5:45:30' },
        depois: { data: '20/04/2025', hora: '6:30:45' },
        alteradoPor: 'Admin João',
        alteradoEm: { data: '12/09/2025', hora: '11:35:22' },
      },
    ],
  };

  const historicoAlteracoes =
    historicoAlteracoesData[activeTab as keyof typeof historicoAlteracoesData];

  // Títulos dinâmicos baseados na tab ativa
  const chartTitles = {
    fazenda: 'Tempo por macro no grupo Fazenda 4 Estações',
    colheita: 'Tempo por macro no grupo Colheita',
    jornada: 'Tempo por macro no grupo Jornada de Viagem',
  };

  // Legendas dinâmicas baseadas na tab ativa
  const legendasByTab = {
    fazenda: [
      { cor: '#19A675', label: 'Início de Jornada' },
      { cor: '#D3771E', label: 'Aguardando Mudas' },
      { cor: '#3A99D5', label: 'Plantando Mudas' },
      { cor: '#E95F77', label: 'Fim de Jornada' },
    ],
    colheita: [
      { cor: '#19A675', label: 'Início de Jornada' },
      { cor: '#D3771E', label: 'Preparando Colheita' },
      { cor: '#3A99D5', label: 'Colhendo Frutos' },
      { cor: '#E95F77', label: 'Fim de Jornada' },
    ],
    jornada: [
      { cor: '#19A675', label: 'Início de Jornada' },
      { cor: '#D3771E', label: 'Preparando Viagem' },
      { cor: '#3A99D5', label: 'Em Trânsito' },
      { cor: '#E95F77', label: 'Fim de Jornada' },
    ],
  };

  const legendas = legendasByTab[activeTab as keyof typeof legendasByTab];

  // Dados do gráfico baseados na tab ativa
  const chartDataByTab = {
    fazenda: {
      labels: ['Início de Jornada', 'Aguardando Mudas', 'Plantando Mudas', 'Fim de Jornada'],
      data: [8.5, 12.3, 63.5, 15.7],
      tooltip: { label: 'Plantando mudas', value: '63,5% - 5:45:56' },
    },
    colheita: {
      labels: ['Início de Jornada', 'Preparando Colheita', 'Colhendo Frutos', 'Fim de Jornada'],
      data: [15.2, 25.8, 45.3, 13.7],
      tooltip: { label: 'Colhendo frutos', value: '45,3% - 3:20:15' },
    },
    jornada: {
      labels: ['Início de Jornada', 'Preparando Viagem', 'Em Trânsito', 'Fim de Jornada'],
      data: [12.1, 18.4, 55.2, 14.3],
      tooltip: { label: 'Em trânsito', value: '55,2% - 4:15:30' },
    },
  };

  const currentChartData = chartDataByTab[activeTab as keyof typeof chartDataByTab];

  const chartData = {
    labels: currentChartData.labels,
    datasets: [
      {
        data: currentChartData.data,
        backgroundColor: ['#19A675', '#D3771E', '#3A99D5', '#E95F77'],
        borderColor: ['#19A675', '#D3771E', '#3A99D5', '#E95F77'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Vamos usar nossa própria legenda
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="modal" unmountOnExit nodeRef={nodeRef}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Detalhes dos Grupos"
        style={modalStyles}
      >
        <ModalContent>
          <Header>
            <Title>Análise Detalhada dos Grupos de Macros - TWD5A23</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon width={24} height={24} />
            </CloseButton>
          </Header>

          <FilterTabs>
            <FilterTab active={activeTab === 'fazenda'} onClick={() => setActiveTab('fazenda')}>
              Fazenda 4 Estações
            </FilterTab>
            <FilterTab active={activeTab === 'colheita'} onClick={() => setActiveTab('colheita')}>
              Colheita
            </FilterTab>
            <FilterTab active={activeTab === 'jornada'} onClick={() => setActiveTab('jornada')}>
              Jornada de Viagem
            </FilterTab>
          </FilterTabs>

          <Content>
            <ChartSection>
              <ChartTitle>{chartTitles[activeTab as keyof typeof chartTitles]}</ChartTitle>
              <ChartContainer>
                <DonutChart>
                  <Doughnut data={chartData} options={chartOptions} />
                </DonutChart>
                <Tooltip>
                  <TooltipText>
                    <div>{currentChartData.tooltip.label}</div>
                    <div>{currentChartData.tooltip.value}</div>
                  </TooltipText>
                </Tooltip>
              </ChartContainer>
              <Legends>
                {legendas.map((legenda, index) => (
                  <Legend key={index}>
                    <LegendColor cor={legenda.cor} />
                    <LegendLabel>{legenda.label}</LegendLabel>
                  </Legend>
                ))}
              </Legends>
            </ChartSection>

            <HistorySection>
              <HistoryTitle>Histórico de Alterações</HistoryTitle>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>
                        <HeaderContent>
                          <HeaderText>Parâmetro</HeaderText>
                          <SortIcon>
                            <OrderIndicator asc={false} desc={false} />
                          </SortIcon>
                        </HeaderContent>
                      </TableHeader>
                      <TableHeader>
                        <HeaderContent>
                          <HeaderText>Antes</HeaderText>
                          <SortIcon>
                            <OrderIndicator asc={false} desc={false} />
                          </SortIcon>
                        </HeaderContent>
                      </TableHeader>
                      <TableHeader>
                        <HeaderContent>
                          <HeaderText>Depois</HeaderText>
                          <SortIcon>
                            <OrderIndicator asc={false} desc={false} />
                          </SortIcon>
                        </HeaderContent>
                      </TableHeader>
                      <TableHeader>
                        <HeaderContent>
                          <HeaderText>Alterado por</HeaderText>
                          <SortIcon>
                            <OrderIndicator asc={false} desc={false} />
                          </SortIcon>
                        </HeaderContent>
                      </TableHeader>
                      <TableHeader>
                        <HeaderContent>
                          <HeaderText>Alterado em</HeaderText>
                          <SortIcon>
                            <OrderIndicator asc={false} desc={false} />
                          </SortIcon>
                        </HeaderContent>
                      </TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historicoAlteracoes.map((item, index) => (
                      <TableRow key={index} even={index % 2 === 0}>
                        <TableCell>{item.parametro}</TableCell>
                        <TableCell>
                          {typeof item.antes === 'string' ? (
                            item.antes
                          ) : (
                            <DateContainer>
                              <DateText>{item.antes.data}</DateText>
                              <TimeText>{item.antes.hora}</TimeText>
                            </DateContainer>
                          )}
                        </TableCell>
                        <TableCell>
                          {typeof item.depois === 'string' ? (
                            item.depois
                          ) : (
                            <DateContainer>
                              <DateText>{item.depois.data}</DateText>
                              <TimeText>{item.depois.hora}</TimeText>
                            </DateContainer>
                          )}
                        </TableCell>
                        <TableCell>{item.alteradoPor}</TableCell>
                        <TableCell>
                          <DateContainer>
                            <DateText>{item.alteradoEm.data}</DateText>
                            <TimeText>{item.alteradoEm.hora}</TimeText>
                          </DateContainer>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </HistorySection>
          </Content>
        </ModalContent>
      </Modal>
    </CSSTransition>
  );
};

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgba(107, 117, 124, 0.32);
  width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 32px 24px 32px;
  border-bottom: 1px solid #d5d8da;
`;

const Title = styled.h2`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.6px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    stroke: #26333b;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 32px;
  border-bottom: 1px solid #d5d8da;
`;

const FilterTab = styled.div<{ active?: boolean }>`
  color: ${(props) => (props.active ? '#316ee8' : '#6b757c')};
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  padding-bottom: 12px;
  border-bottom: 2px solid ${(props) => (props.active ? '#316ee8' : 'transparent')};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-y: auto;
  flex: 1;
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ChartTitle = styled.h3`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  text-align: center;
`;

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
`;

const DonutChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #26333b;
  border-radius: 4px;
  padding: 8px;
  z-index: 10;
`;

const TooltipText = styled.div`
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;

  div:first-child {
    margin-bottom: 4px;
  }
`;

const Legends = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div<{ cor: string }>`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.cor};
  border-radius: 2px;
`;

const LegendLabel = styled.span`
  color: #6b757c;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;

const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HistoryTitle = styled.h3`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
`;

const TableContainer = styled.div`
  border: 1px solid #d5d8da;
  border-radius: 4px;
  overflow: hidden;
  background: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: white;
  border-bottom: 1px solid #d5d8da;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ even?: boolean }>`
  background: ${(props) => (props.even ? 'rgba(136, 145, 159, 0.08)' : 'white')};
  height: 64px;
`;

const TableHeader = styled.th`
  color: #6b757c;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  text-align: left;
  padding: 0;
  border-right: 1px solid #d5d8da;
  height: 52px;

  &:last-child {
    border-right: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 16px;
  height: 100%;
  cursor: pointer;
`;

const HeaderText = styled.span`
  color: #6b757c;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
`;

const SortIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  width: 8px;
  height: 14px;

  &:hover {
    opacity: 1;
  }
`;

const TableCell = styled.td`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  padding: 16px;
  border-right: 1px solid #d5d8da;
  vertical-align: middle;

  &:last-child {
    border-right: none;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateText = styled.div`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
`;

const TimeText = styled.div`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '0',
    borderRadius: '8px',
    width: '800px',
    maxHeight: '90vh',
    boxShadow: '0px 4px 8px 0px rgba(107, 117, 124, 0.32)',
  },
};

import React, {
  useState,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import { CustomTable } from './Table';
import ExpandButton from './ExpandButton';
import Empty from './Empty';
import { ReportsContext } from '../../../contexts/reports';
import { type ReportInsertData } from '../requets';
import { type ICustomSelectOption } from '@ftdata/ui';
import VehiclePagination from './Table/Pagination';
import { type VehicleData } from './Table/type';
import { type Table } from '@tanstack/react-table';

export interface ContentHandle {
  prepareGraphicsForExport: () => Promise<void>;
  resetExportStyles: () => void;
}

interface Props {
  expand: boolean;
  toggleExpand: () => void;
  params: ReportInsertData;
  handleOpenModal: () => void;
  setHasTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content = forwardRef<ContentHandle, Props>(
  ({ expand, params, toggleExpand, handleOpenModal, setHasTable }: Props, ref) => {
    const [activeTab, setActiveTab] = useState<'report' | 'graphic'>('report');
    const showNavbar = !expand;
    const { hasFilter } = useContext(ReportsContext);
    const [vehicleTableData, setVehicleTableData] = useState<Table<VehicleData> | null>(null);
    const [graphicData, setGraphicData] = useState<Table<ICustomSelectOption> | null>(null);

    useEffect(() => {
      setActiveTab('report');
    }, [params]);

    useEffect(() => {
      if (vehicleTableData) {
        setHasTable(true);
        return;
      }
      setHasTable(false);
    }, [vehicleTableData]);

    return (
      <>
        <Container>
          <ContainerTabs
            expand={expand}
            toggleExpand={toggleExpand}
            params={params}
            handleOpenModal={handleOpenModal}
            setHasTable={setHasTable}
          >
            {showNavbar ? <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> : <div />}

            {!expand && <ExpandButton toggleExpand={toggleExpand} />}
          </ContainerTabs>
          <ContainerContent>
            {hasFilter ? (
              <>
                {activeTab === 'report' && (
                  <CustomTable
                    handleOpenModal={handleOpenModal}
                    params={params}
                    setVehicleTableData={setVehicleTableData}
                  />
                )}
              </>
            ) : (
              <Empty openModal={handleOpenModal} />
            )}
          </ContainerContent>
        </Container>
        {activeTab === 'report' &&
          vehicleTableData &&
          hasFilter &&
          vehicleTableData.getPageCount() > 1 && <VehiclePagination table={vehicleTableData} />}
      </>
    );
  },
);

// Ajusta displayName para evitar warning do ESLint (react/display-name)
Content.displayName = 'Content';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 1.5rem;
  position: relative;
`;

const ContainerContent = styled.div`
  // Esconde a barra de rolagem no Firefox
  scrollbar-width: none;

  // Esconde a barra de rolagem no Chrome, Safari e outros navegadores baseados em WebKit
  &::-webkit-scrollbar {
    display: none;
  }

  // Esconde a barra de rolagem no IE e Edge
  -ms-overflow-style: none;
`;

const ContainerTabs = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem 0rem 1.5rem; // 32px para 2rem e 24px para 1.5rem
`;

export default Content;

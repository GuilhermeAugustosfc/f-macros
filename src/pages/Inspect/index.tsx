import React, { useContext, useState } from 'react';
import Header from './components/Header';
import { FilterModal } from './components/FilterModal';
import styled from 'styled-components';
import { ReportsContext } from 'src/contexts/reports';
import Content from './components/Content';
import { TableContext } from 'src/contexts/table';

const ViewReport: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const { clearFilter, setAlertState, alertState } = useContext(ReportsContext);
  const { setSorting } = useContext(TableContext);

  function handleOpenModal() {
    setFilterModalOpen(true);
  }

  return (
    <PageContainer>
      <Header title={'F-Inspect'} />
      <Content handleOpenModal={handleOpenModal} />
      <FilterModal
        isOpen={isFilterModalOpen}
        close={() => {
          setAlertState({ ...alertState, open: false });
          setSorting([
            {
              id: 'insert_at',
              desc: true,
            },
          ]);
          clearFilter();
          setFilterModalOpen(false);
        }}
      />
    </PageContainer>
  );
};
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default ViewReport;

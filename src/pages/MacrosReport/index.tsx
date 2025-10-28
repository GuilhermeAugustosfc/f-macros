import React, { useContext, useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router';
import Header from './components/Header';
import { FilterModal } from './components/FilterModal';
import Content, { type ContentHandle } from './components/Content';
import { ReportsContext } from '../../contexts/reports';
import { MainContainer, ReportWrapper } from './styles';
// import { useConfiguration } from '@ftdata/core';

const FuelReport: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const { hasFilter, clearFilter } = useContext(ReportsContext);
  //   const { pathname } = useLocation();
  // const { setCurrentPage } = useConfiguration();

  const [params, setParams] = useState<any>({} as any);
  const [hasTable, setHasTable] = useState(false);

  const contentRef = useRef<ContentHandle>(null);

  // useEffect(() => {
  //     const title = t('fuel_management_reports_and_charts');
  //     setCurrentPage({ label: title, path: pathname });
  // }, [t, pathname]);

  function handleOpenModal() {
    setFilterModalOpen(true);
  }

  function clearFilterCallback() {
    setFilterModalOpen(false);
  }

  useEffect(() => {
    clearFilterCallback();
    clearFilter();
  }, []);

  return (
    <MainContainer>
      <ReportWrapper $hasPagination={hasTable && hasFilter}>
        <Header title={'Macros Personalizadas'} openFilter={handleOpenModal} />

        <Content
          ref={contentRef}
          setHasTable={setHasTable}
          params={params}
          handleOpenModal={handleOpenModal}
        />

        <FilterModal
          isOpen={isFilterModalOpen}
          open={handleOpenModal}
          clearFilterCallback={clearFilterCallback}
          close={() => setFilterModalOpen(false)}
          applyFilter={(form) => {
            setParams(form);
            setFilterModalOpen(false);
          }}
        />
      </ReportWrapper>
    </MainContainer>
  );
};

export default FuelReport;

import React, { useContext, useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router';
import Header from './components/Header';
import { FilterModal } from './components/FilterModal';
import Content, { type ContentHandle } from './components/Content';
import { ReportsContext } from '../../contexts/reports';
import { useTranslation } from '@ftdata/core';
import { MainContainer, ReportWrapper } from './styles';
// import { useConfiguration } from '@ftdata/core';

const FuelReport: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const { t } = useTranslation('114');
  const [expandView, setExpandView] = useState(false);
  const showHeaderAndFilterOptions = !expandView;
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

  function toggleExpandView() {
    setExpandView((state) => !state);
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
      <ReportWrapper hasPagination={hasTable && hasFilter}>
        <Header
          title={t('fuel_management_reports_and_charts')}
          openFilter={handleOpenModal}
          showHeader={showHeaderAndFilterOptions}
        />

        <Content
          ref={contentRef}
          setHasTable={setHasTable}
          params={params}
          handleOpenModal={handleOpenModal}
          expand={expandView}
          toggleExpand={toggleExpandView}
        />

        <FilterModal
          isOpen={isFilterModalOpen}
          open={handleOpenModal}
          showCleanFilter={hasFilter}
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

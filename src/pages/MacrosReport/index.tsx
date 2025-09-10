import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import Header from './components/Header';
import { FilterModal } from './components/FilterModal';
import Content, { ContentHandle } from './components/Content';
import { DownloadModal } from './components/DownloadModal';
import { ReportsContext } from '../../contexts/reports';
import { useTranslation } from '@ftdata/core';
import { MainContainer, ReportWrapper } from './styles';

const FuelReport: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
    const { t } = useTranslation('114');
    const [expandView, setExpandView] = useState(false);
    const showHeaderAndFilterOptions = !expandView;
    const { hasFilter, clearFilter } = useContext(ReportsContext);
    const { pathname } = useLocation();
    const { setCurrentPage } = useConfiguration();

    const [params, setParams] = useState<ReportInsertData>({} as ReportInsertData);
    const [hasTable, setHasTable] = useState(false);

    const contentRef = useRef<ContentHandle>(null);

    useEffect(() => {
        const title = t('fuel_management_reports_and_charts');
        setCurrentPage({ label: title, path: pathname });
    }, [t, pathname]);

    function handleOpenModal() {
        setFilterModalOpen(true);
    }

    function handleToogleDownloadModal() {
        setDownloadModalOpen((state) => !state);
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
                    openDownload={handleToogleDownloadModal}
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

                <DownloadModal
                    isOpen={isDownloadModalOpen}
                    open={handleToogleDownloadModal}
                    close={() => setDownloadModalOpen(false)}
                    params={params}
                    contentRef={contentRef}
                />
            </ReportWrapper>
        </MainContainer>
    );
};

export default FuelReport;

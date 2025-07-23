import Header from 'src/components/Header';
import { PageContainer } from '../Inspect';
import { useTranslation } from '@ftdata/core';

const FaultHistory = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Header
        title={'F-Inspect'}
        tab="fault_history"
        subTitle={t('list_of_faults_reported_during_inspections')}
      />
    </PageContainer>
  );
};

export default FaultHistory;

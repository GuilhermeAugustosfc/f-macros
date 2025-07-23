import Header from 'src/components/Header';
import { PageContainer } from '../Inspect';
import { useTranslation } from '@ftdata/core';

const PlanInspection = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Header title={'F-Inspect'} tab="plan_inspection" subTitle={t('saved_inspection_plans')} />
    </PageContainer>
  );
};

export default PlanInspection;

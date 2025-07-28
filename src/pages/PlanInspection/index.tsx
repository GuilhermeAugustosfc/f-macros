import Header from 'src/components/Header';
import { useTranslation } from '@ftdata/core';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import Content from './components/Content';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PlanInspection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const LeftIcon = () => {
    return <Icon name="ui plus-add" />;
  };

  return (
    <PageContainer>
      <Container>
        <div>
          <Header
            title={'F-Inspect'}
            tab="plan_inspection"
            subTitle={t('saved_inspection_plans')}
            extraButtons={
              <Button
                onClick={() => navigate('/plan_inspection/add')}
                style={{
                  width: '15.313rem',
                }}
                LeftIcon={LeftIcon}
                variant="primary"
              >
                {t('create_inspection_plan')}
              </Button>
            }
          />
          <Content />
        </div>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  max-height: calc(-3.5rem + 100vh);
  transform: translateZ(0px);
  width: 100%;
  overflow-y: auto;

  & > div {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    max-height: calc(-9rem + 100vh);
  }
`;

const PageContainer = styled.div`
  height: calc(-56px + 100vh);
`;

export default PlanInspection;

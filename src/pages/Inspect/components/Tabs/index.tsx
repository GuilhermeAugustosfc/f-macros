import React from 'react';

// import CheckDone from 'src/assets/svgs/check-done.svg?react';
import CheckList from 'src/assets/svgs/filter-icon.svg?react';
// import SettingsIcon from 'src/assets/svgs/settings-key.svg?react';
import { TabButton, TabContainer } from './style';
import { useTranslation } from '@ftdata/core';
import { useNavigate } from 'react-router-dom';

export type ActiveTab = 'inspection_record' | 'plan_inspection' | 'fault_history';
export type PropsTab = {
  activeTab: ActiveTab;
};

const Tabs: React.FC<PropsTab> = ({ activeTab }: PropsTab) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <TabContainer>
      {/* <TabButton
        isActive={activeTab === 'inspection_record'}
        //  onClick={() => navigate('/inspect')}
      >
        <CheckDone />
        <span>{t('inspection_record')}</span>
      </TabButton> */}
      <TabButton
        isActive={activeTab === 'plan_inspection'}
        onClick={() => navigate('/plan_inspection')}
      >
        <CheckList />
        <span style={{ marginTop: '0.2rem' }}>{t('inspection_plan')}</span>
      </TabButton>
      {/* <TabButton
        isActive={activeTab === 'fault_history'}
        // onClick={() => navigate('/fault_history')}
      >
        <SettingsIcon />
        <span>{t('fault_history')}</span>
      </TabButton> */}
    </TabContainer>
  );
};

export default Tabs;

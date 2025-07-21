import React, { useState } from 'react';

import { PlaybackReportIcon } from '../svg';
import { TabButton, TabContainer } from './style';
import { Icon } from '@ftdata/f-icons';
import { t } from 'src/App';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'live' | 'playback'>('playback');

  return (
    <TabContainer>
      <TabButton
        isActive={activeTab === 'report'}
        onClick={() => window.open(window.location.origin + '/relatorios/infracao')}
      >
        <Icon name="ui warning-triangle" />
        <span style={{ marginTop: '0.2rem' }}>{t('violations_report')}</span>
      </TabButton>
      <TabButton
        isActive={activeTab === 'live'}
        onClick={() => open(window.location.origin + '/mapaGeral_v3/#/')}
      >
        <Icon name="ui video-camera" />
        <span>{t('live')}</span>
      </TabButton>
      <TabButton isActive={activeTab === 'playback'} onClick={() => setActiveTab('playback')}>
        <PlaybackReportIcon />
        <span>{t('playback')}</span>
      </TabButton>
    </TabContainer>
  );
};

export default Tabs;

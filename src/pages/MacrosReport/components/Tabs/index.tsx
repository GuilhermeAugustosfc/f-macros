import React from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';
import { useTranslation } from 'react-i18next';
import { GraphicIcon, ReportIcon } from '../svg';

interface TabsProps {
    activeTab: 'report' | 'graphic';
    setActiveTab: (tab: 'report' | 'graphic') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const { t } = useTranslation('114');
    return (
        <TabContainer>
            <TabButton isActive={activeTab === 'report'} onClick={() => setActiveTab('report')}>
                <ReportIcon />
                {t('reports')}
            </TabButton>
            <TabButton isActive={activeTab === 'graphic'} onClick={() => setActiveTab('graphic')}>
                <GraphicIcon />
                {t('graphics')}
            </TabButton>
        </TabContainer>
    );
};

const TabContainer = styled.nav`
    display: flex;
    height: 1.875rem; // 30px convertido para rem
    align-items: center;
    gap: 1.5rem; // 24px convertido para rem
`;

interface TabButtonProps {
    isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: ${(props) => (props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER)};
    font-size: 0.875rem; // 14px convertido para rem
    font-weight: 600;
    line-height: 120%;
    position: relative;
    padding-bottom: 0.75rem; // 12px convertido para rem
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 0.1875rem solid ${(props) => (props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : 'transparent')}; // 3px convertido para rem
    transition: all 0.3s ease;

    svg path {
        stroke: ${(props) => (props.isActive ? styleguide.COLOR_ACCENT_MEDIUM : styleguide.COLOR_NEUTRAL_DARKER)};
    }
`;

export default Tabs;

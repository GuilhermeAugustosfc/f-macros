import React, { useContext } from 'react';
import { HeaderContainer, IconContainer } from './styles';
import { ReportsContext } from '../../../../../contexts/reports';
import { useTranslation } from 'react-i18next';
import { AddCircleIcon, ArrowLeftIcon, CheckIcon } from '../../svg';

interface Props {
    close: () => void;
    clearFilterCallback: () => void;
    showCleanFilter: boolean;
    changeTab: (index: number) => void;
    changeCheckbox: () => void;
}

export const Header: React.FC<Props> = ({
    close,
    showCleanFilter,
    clearFilterCallback,
    changeTab,
    changeCheckbox,
}: Props) => {
    const { t } = useTranslation('114');
    const { clearFilter } = useContext(ReportsContext);

    function handleClearFilter() {
        clearFilter();
        clearFilterCallback();
    }

    return (
        <HeaderContainer>
            <div>
                <button className="btn-close" onClick={close}>
                    <ArrowLeftIcon />
                </button>
                <strong>{t('filter_2')}</strong>
            </div>
            {showCleanFilter ? (
                <button className="btn-clear" onClick={() => handleClearFilter()}>
                    {t('clear_filters')}
                </button>
            ) : (
                <IconContainer>
                    <CheckIcon onClick={() => changeCheckbox()} />
                    <AddCircleIcon
                        onClick={() => {
                            changeTab(0);
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </IconContainer>
            )}
        </HeaderContainer>
    );
};

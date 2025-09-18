import React, { useContext } from 'react';
import { HeaderContainer } from './styles';
import { ReportsContext } from '../../../../../contexts/reports';
import { useTranslation } from '@ftdata/core';
import { AddCircleIcon, ArrowLeftIcon, CheckIcon } from '../../svg';

interface Props {
  close: () => void;
  clearFilterCallback: () => void;
}

export const Header: React.FC<Props> = ({ close, clearFilterCallback }: Props) => {
  const { t } = useTranslation();
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

      <button className="btn-clear" onClick={() => handleClearFilter()}>
        {t('clear_filters')}
      </button>
    </HeaderContainer>
  );
};

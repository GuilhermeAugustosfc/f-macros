import React, { useContext } from 'react';
import { HeaderContainer } from './styles';
import { ReportsContext } from '../../../../../contexts/reports';
import { Icon } from '@ftdata/f-icons';
import { t } from 'src/App';

interface Props {
  close: () => void;
}

export const Header: React.FC<Props> = ({ close }: Props) => {
  const { clearFilter, hasFilter } = useContext(ReportsContext);
  return (
    <HeaderContainer>
      <div>
        <button className="btn-close" onClick={close}>
          <Icon name="arw arrow-left" color="#26333b" />
        </button>
        <strong>{t('request_videos')}</strong>
      </div>
      {hasFilter ? (
        <button className="btn-clear" onClick={() => clearFilter()}>
          {t('clear_filters')}
        </button>
      ) : (
        <div />
      )}
    </HeaderContainer>
  );
};

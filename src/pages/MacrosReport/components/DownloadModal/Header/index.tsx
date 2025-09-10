import React from 'react';
import { HeaderContainer } from './styles';
import { ArrowLeftIcon } from 'src/pages/MacrosReport/components/svg';
import { useTranslation } from '@ftdata/core';

interface Props {
  close: () => void;
}

export const Header: React.FC<Props> = ({ close }: Props) => {
  const { t } = useTranslation('114');
  return (
    <HeaderContainer>
      <div>
        <button className="btn-close" onClick={close}>
          <ArrowLeftIcon />
        </button>
        <strong>{t('export2')}</strong>
      </div>
    </HeaderContainer>
  );
};

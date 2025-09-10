import { type JSX } from 'react';
import { ContainerCountAccess } from './styles';
interface ICountData {
  access: number;
  available: number;
  unavailable: number;
}
import { useTranslation } from '@ftdata/core';

export default function CountAccess({ access, available, unavailable }: ICountData): JSX.Element {
  const { t } = useTranslation();

  return (
    <ContainerCountAccess>
      <div className="count-access">
        <div>
          <p>{t('total_hits')}</p>
          <span>{access ?? 0}</span>
        </div>
        <div>
          <p>{t('free')}</p>
          <span>{available ?? 0}</span>
        </div>
        <div>
          <p>{t('used')}</p>
          <span>{unavailable ?? 0}</span>
        </div>
      </div>
    </ContainerCountAccess>
  );
}

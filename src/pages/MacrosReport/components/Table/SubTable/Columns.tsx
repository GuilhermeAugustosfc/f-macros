import React from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import ProgressIndicator from '../../ProgressIndicator';
import { IgnitionStatusMovingIcon, IgnitionStatusOffIcon, IgnitionStatusOnIcon } from '../../svg';
import { useSettings } from '@ftdata/core';
import { useTranslation } from '@ftdata/core';
const columnHelper = createColumnHelper<any>();

export const ColumnsFunction = (): ColumnDef<any>[] => {
  const { t } = useTranslation('114');
  const { user } = useSettings();
  const unidadeVolume = user?.unit_volume == 'litro' ? '(L)' : '(gal)';
  const unidadeMedida = user?.unit_length == 'quilometro' ? 'km' : 'mi';
  const status_icons = [
    <IgnitionStatusOffIcon key="off" />,
    <IgnitionStatusOnIcon key="on" />,
    <IgnitionStatusMovingIcon key="moving" />,
  ];

  const allColumns = [
    columnHelper.accessor('data', {
      header: () => <span>{t('dt_gps')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('driver', {
      header: () => <span className="mr-2">{t('driver')}</span>,
      cell: (info) => <span>{info.getValue() == 'PADRAO' ? '-' : info.getValue()}</span>,
    }),
    columnHelper.accessor('status', {
      header: () => <span className="mr-2">{t('status')}</span>,
      cell: (info) => {
        return (
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            {status_icons[info.getValue()]}
          </span>
        );
      },
    }),
    columnHelper.accessor('speed', {
      header: () => (
        <span>
          {t('speed')} {unidadeMedida}/h
        </span>
      ),
      cell: (info) => (
        <span>
          {info.getValue()} {unidadeMedida}/h
        </span>
      ),
    }),
    columnHelper.accessor('supply', {
      header: () => (
        <span>
          {t('supply')} {unidadeVolume}
        </span>
      ),
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('draining', {
      header: () => (
        <span>
          {t('drainage')} {unidadeVolume}
        </span>
      ),
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('address', {
      header: () => <span>{t('address')}</span>,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('fuel_level', {
      header: () => (
        <span>
          {t('fuel_level')} {unidadeVolume}
        </span>
      ),
      cell: (info) => (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <ProgressIndicator
            sufix={unidadeVolume}
            value={info.getValue()}
            max={info.cell.row.original.capacity}
          />
        </span>
      ),
    }),
    columnHelper.accessor('fence', {
      header: () => <span>{t('fence')}</span>,
      cell: (info) => <span>{info.getValue().length ? info.getValue().join(', ') : '-'}</span>,
    }),
    columnHelper.accessor('reference_point', {
      header: () => <span>{t('reference_point')}</span>,
      cell: (info) => <span>{info.getValue().length ? info.getValue().join(', ') : '-'}</span>,
    }),
    columnHelper.accessor('coust', {
      header: () => <span>{t('cost')}</span>,
      cell: (info) => <span>${info.getValue()}</span>,
    }),
  ];

  return allColumns as ColumnDef<any>[];
};

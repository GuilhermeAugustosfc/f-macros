import React from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IgnitionStatusMovingIcon, IgnitionStatusOffIcon, IgnitionStatusOnIcon } from '../../svg';
import { useTranslation } from '@ftdata/core';
const columnHelper = createColumnHelper<any>();

export const ColumnsFunction = (): ColumnDef<any>[] => {
  const { t } = useTranslation('114');
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
    columnHelper.accessor('reference_point', {
      header: () => <span>{t('reference_point')}</span>,
      cell: (info) => <span>{info.getValue().length ? info.getValue().join(', ') : '-'}</span>,
    }),
  ];

  return allColumns as ColumnDef<any>[];
};

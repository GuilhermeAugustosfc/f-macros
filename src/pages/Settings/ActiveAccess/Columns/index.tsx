import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import { DivActive, SpanActive, SpanCustomer } from './styles';
import { type ActivatedAccessItem } from '../../../../shared/DataStructure';
import { useTranslation } from '@ftdata/core';

const columnHelper = createColumnHelper<ActivatedAccessItem>();

export const ColumnsFunction = () => {
  const { t } = useTranslation();
  const columns = [
    columnHelper.accessor('checkbox', {
      cell: (info) => (
        <Checkbox
          onChange={() => info.row.toggleSelected()}
          checked={info.row.getIsSelected()}
          label=""
        />
      ),
      header: (info) => (
        <div
          onClick={() => {
            info.table.toggleAllRowsSelected();
          }}
        >
          <Checkbox onChange={() => null} checked={info.table.getIsAllRowsSelected()} label="" />
        </div>
      ),
    }),
    columnHelper.accessor('ativo_id', {
      cell: (info) => info.getValue().toString() || '-',
      header: () => <span>{t('ID')}</span>,
    }),
    columnHelper.accessor('client', {
      cell: (info) => <SpanCustomer>{info.getValue().toString()}</SpanCustomer>,
      header: () => <span>{t('customer')}</span>,
    }),
    columnHelper.accessor('plate', {
      cell: (info) => (
        <span>
          {info.getValue().toString()} - {info.row.original.ativo}
        </span>
      ),
      header: () => <span>{t('plate')}</span>,
    }),

    columnHelper.accessor('activation_date', {
      cell: (info) => info.getValue()?.toString() || ' - ',
      header: () => <span>{t('activation_date')}</span>,
    }),
    columnHelper.accessor('deactivation_date', {
      cell: (info) => info.getValue()?.toString() || ' - ',
      header: () => <span>{t('deactivation_date')}</span>,
    }),
    columnHelper.accessor('is_active', {
      cell: (info) => (
        <DivActive>
          <SpanActive getValue={info.getValue()}></SpanActive>
          <div>{info.getValue().toString() ? t('activated') : t('deactivated')}</div>
        </DivActive>
      ),
      header: () => <div>{t('status')}</div>,
    }),
  ];

  return columns;
};

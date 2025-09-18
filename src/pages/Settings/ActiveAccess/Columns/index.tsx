import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import { DivActive, SpanActive, SpanCustomer } from './styles';
import { useTranslation } from '@ftdata/core';

interface ActivatedAccessItem {
  checkbox: boolean;
  ativo_id: string;
  client: string;
  plate: string;
  vehicle: string;
  activation_date: string;
  deactivation_date: string;
  is_active: number;
}
const columnHelper = createColumnHelper<ActivatedAccessItem>();

export const ColumnsFunction = (
  selectedRows?: Set<string>,
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<string>>>,
) => {
  const { t } = useTranslation();

  const handleSelectAll = () => {
    if (!setSelectedRows) return;

    if (selectedRows && selectedRows.size > 0) {
      setSelectedRows(new Set());
    } else {
      // Selecionar todos os IDs disponíveis
      const allIds = new Set(['345', '236', '12', '67', '98', '125']);
      setSelectedRows(allIds);
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (!setSelectedRows) return;

    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const columns = [
    columnHelper.accessor('checkbox', {
      cell: (info) => (
        <Checkbox
          onChange={() => handleSelectRow(info.row.original.ativo_id)}
          checked={selectedRows?.has(info.row.original.ativo_id) || false}
          label=""
        />
      ),
      header: () => (
        <div onClick={handleSelectAll}>
          <Checkbox
            onChange={() => null}
            checked={Boolean(selectedRows && selectedRows.size > 0)}
            label=""
          />
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
          {info.getValue().toString()} - {info.row.original.ativo_id}
        </span>
      ),
      header: () => <span>{t('plate')}</span>,
    }),
    columnHelper.accessor('vehicle', {
      cell: (info) => <span>{info.getValue().toString()}</span>,
      header: () => <span>{t('vehicle')}</span>,
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

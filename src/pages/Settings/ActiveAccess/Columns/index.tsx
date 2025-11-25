import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import { DivActive, SpanActive, SpanCustomer } from './styles';
import { useTranslation } from '@ftdata/core';
import { type ActivatedAccessItem } from '../requests';

interface ActivatedAccessItemWithCheckbox extends ActivatedAccessItem {
  checkbox: boolean;
}
const columnHelper = createColumnHelper<ActivatedAccessItemWithCheckbox>();

export const ColumnsFunction = (
  selectedRow?: string | null,
  setSelectedRow?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const { t } = useTranslation();

  const handleSelectAll = () => {
    if (!setSelectedRow) return;
    // Limpar seleção ao clicar no checkbox do header
    setSelectedRow(null);
  };

  const handleSelectRow = (rowId: string) => {
    if (!setSelectedRow) return;

    // Se já está selecionado, deseleciona. Caso contrário, seleciona (substituindo qualquer seleção anterior)
    if (selectedRow === rowId) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowId);
    }
  };

  const columns = [
    columnHelper.accessor('checkbox', {
      cell: (info) => (
        <Checkbox
          onChange={() => handleSelectRow(info.row.original.ativo_id.toString())}
          checked={selectedRow === info.row.original.ativo_id.toString()}
          label=""
        />
      ),
      header: () => (
        <div onClick={handleSelectAll}>
          <Checkbox
            onChange={() => null}
            checked={Boolean(selectedRow)}
            label=""
          />
        </div>
      ),
    }),
    columnHelper.accessor('ativo_id', {
      cell: (info) => info.getValue().toString() || '-',
      header: () => <span>{t('id')}</span>,
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
    columnHelper.accessor('ativo', {
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
          <div>{info.getValue() ? t('activated') : t('deactivated')}</div>
        </DivActive>
      ),
      header: () => <div>{t('status')}</div>,
    }),
  ];

  return columns;
};

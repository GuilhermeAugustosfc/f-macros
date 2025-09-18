import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import { SpanCustomer } from './styles';
import { useTranslation } from '@ftdata/core';

interface MacroGroupItem {
  checkbox: boolean;
  id: string;
  client: string;
  vehicle: string;
  macroGroup: string;
  lastModification: string;
}

const columnHelper = createColumnHelper<MacroGroupItem>();

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
      const allIds = new Set(['1', '2', '3', '4']);
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
          onChange={() => handleSelectRow(info.row.original.id)}
          checked={selectedRows?.has(info.row.original.id) || false}
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
    columnHelper.accessor('client', {
      cell: (info) => <SpanCustomer>{info.getValue().toString()}</SpanCustomer>,
      header: () => <span>{t('client')}</span>,
    }),
    columnHelper.accessor('vehicle', {
      cell: (info) => <span>{info.getValue().toString()}</span>,
      header: () => <span>{t('vehicle')}</span>,
    }),
    columnHelper.accessor('macroGroup', {
      cell: (info) => <span>{info.getValue().toString()}</span>,
      header: () => <span>{t('macro_group')}</span>,
    }),
    columnHelper.accessor('lastModification', {
      cell: (info) => <span>{info.getValue().toString()}</span>,
      header: () => <span>{t('last_modification')}</span>,
    }),
  ];

  return columns;
};

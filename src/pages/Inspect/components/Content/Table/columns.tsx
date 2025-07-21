import React, { useContext, useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import type { chechBox, DataTableItem } from '../types';
import { ContainerTH, SpanStatus } from './styles';
import { PlayCircleIcon } from '../../svg';
import { TableContext } from 'src/contexts/table';
import { t } from 'src/App';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    isHidden?: boolean;
    name?: string;
    noSorting?: boolean;
  }
}

const columnHelper = createColumnHelper<DataTableItem>();

export const ColumnsFunction = (
  setCheckbox: React.Dispatch<React.SetStateAction<chechBox>>,
  checkbox: chechBox,
): ColumnDef<DataTableItem, any>[] => {
  const { setDataSelected } = useContext(TableContext);
  const indexStatus = [t('in_processing'), t('available'), t('processing_error')];

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => (
          <ContainerTH style={{ justifyContent: 'center' }}>
            <Checkbox
              label=""
              checked={
                checkbox.includes(info.row.getValue('id')) ||
                (checkbox == 'all' && info.row.getValue('status') == '1')
              }
              disabled={info.row.getValue('status') == '0'}
              onChange={() => {
                const dataIdRow: string = info.row.getValue('id');
                if (checkbox == 'all') return setCheckbox([dataIdRow]);
                if (!checkbox.includes(dataIdRow)) {
                  setCheckbox([...checkbox, dataIdRow]);
                  return;
                }

                setCheckbox(checkbox.filter((value) => value != dataIdRow));
              }}
              type="checkbox"
              name=""
              id={info.getValue()}
            />
          </ContainerTH>
        ),
        header: () => (
          <ContainerTH style={{ marginLeft: '0.4rem' }}>
            <Checkbox
              label=""
              onChange={() => {
                return;
              }}
              checked={checkbox == 'all'}
              type="checkbox"
              name=""
            />
          </ContainerTH>
        ),
        meta: { isHidden: false, noSorting: true },
      }),
      columnHelper.accessor('plate', {
        cell: (info) => info.getValue(),
        header: () => <div>Placa</div>,
        meta: { isHidden: true, noSorting: true },
      }),
      columnHelper.accessor('client', {
        cell: (info) => {
          return (
            <ContainerTH>
              <span>{info.getValue()}</span>
            </ContainerTH>
          );
        },
        header: () => {
          return (
            <ContainerTH>
              <span>{t('customer')}</span>
            </ContainerTH>
          );
        },
        meta: { noSorting: true },
      }),
      columnHelper.accessor('ativo', {
        cell: (info) => {
          return (
            <ContainerTH>
              <span>
                {info.row.getValue('ativo')} - {info.row.getValue('plate')}
              </span>
            </ContainerTH>
          );
        },
        header: () => {
          return (
            <ContainerTH>
              <span>{t('vehicle')}</span>
            </ContainerTH>
          );
        },
        meta: { noSorting: true },
      }),
      columnHelper.accessor('equipament_id', {
        cell: (info) => <ContainerTH className="font-semibold">{info.getValue()}</ContainerTH>,
        header: () => (
          <ContainerTH>
            <span>{t('equipment')}</span>
          </ContainerTH>
        ),
      }),
      columnHelper.accessor('date_start', {
        cell: (info) => <ContainerTH className="font-semibold">{info.getValue()}</ContainerTH>,
        header: () => (
          <ContainerTH>
            <span>{t('begin')}</span>
          </ContainerTH>
        ),
      }),
      columnHelper.accessor('date_end', {
        cell: (info) => <ContainerTH className="font-semibold">{info.getValue()}</ContainerTH>,
        header: () => (
          <ContainerTH>
            <span>{t('final')}</span>
          </ContainerTH>
        ),
      }),
      columnHelper.accessor('channel_name', {
        cell: (info) => <ContainerTH className="font-semibold">{info.getValue()}</ContainerTH>,
        header: () => (
          <ContainerTH>
            <span>{t('channel')}</span>
          </ContainerTH>
        ),
      }),
      columnHelper.accessor('insert_at', {
        cell: (info) => <ContainerTH className="font-semibold">{info.getValue()}</ContainerTH>,
        header: () => (
          <ContainerTH>
            <span>{t('saved_in')}</span>
          </ContainerTH>
        ),
        meta: { isHidden: false },
      }),
      columnHelper.accessor('status', {
        cell: (info) => (
          <ContainerTH style={{ justifyContent: 'center' }} className="font-semibold">
            <SpanStatus color={Number(info.getValue()) as 0 | 1 | 2}>
              {indexStatus[Number(info.getValue())]}
            </SpanStatus>
          </ContainerTH>
        ),
        header: () => (
          <ContainerTH>
            <span>Status</span>
          </ContainerTH>
        ),
      }),
      columnHelper.accessor('link', {
        cell: (info) => (
          <ContainerTH
            style={{
              justifyContent: 'center',
              cursor: info.row.getValue('status') == '1' ? 'pointer ' : 'not-allowed',
            }}
            onClick={() => {
              if (info.row.getValue('status') == '1') {
                setDataSelected(info.row._valuesCache as unknown as DataTableItem);
              }
            }}
            className="font-semibold"
          >
            <PlayCircleIcon color={info.row.getValue('status') == '1' ? '#26333B' : '#B1B7BB'} />
          </ContainerTH>
        ),
        header: () => (
          <ContainerTH>
            <span>{t('watch')}</span>
          </ContainerTH>
        ),
        meta: { isHidden: false, noSorting: true },
      }),
    ],
    [checkbox],
  );

  return columns;
};

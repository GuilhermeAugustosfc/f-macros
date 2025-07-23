import { useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@ftdata/ui';
import type { DataTableItem } from '../types';
import { ContainerTH, SpanStatus } from './styles';
import { PlayCircleIcon } from '../../svg';
import { useTranslation } from '@ftdata/core';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    isHidden?: boolean;
    name?: string;
    noSorting?: boolean;
  }
}

const columnHelper = createColumnHelper<DataTableItem>();

export const ColumnsFunction = (): ColumnDef<DataTableItem, any>[] => {
  const { t } = useTranslation();
  const indexStatus = [t('in_processing'), t('available'), t('processing_error')];

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => (
          <ContainerTH style={{ justifyContent: 'center' }}>
            {/* <Checkbox
              label=""
              disabled={info.row.getValue('status') == '0'}
              onChange={() => info.row.toggleSelected()}
              checked={info.row.getIsSelected()}
              type="checkbox"
              name=""
              id={info.getValue()}
            /> */}
          </ContainerTH>
        ),
        header: (info) => (
          <ContainerTH
            style={{ marginLeft: '0.4rem' }}
            // onClick={() => {
            //   info.table.toggleAllRowsSelected();
            // }}
          >
            <Checkbox
              label=""
              onChange={() => {
                return;
              }}
              // checked={info.table.getIsAllRowsSelected()}
              checked={false}
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
    [],
  );

  return columns;
};

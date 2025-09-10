import React from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { VehicleData } from '../type';
import {
  AbastecimentoIcon,
  AddCircleIcon,
  ConsumoDesligadoIcon,
  ConsumoKmHoraIcon,
  ConsumoLitrosHoraIcon,
  ConsumoLitrosIcon,
  ConsumoMovimentoIcon,
  ConsumoOciosoIcon,
  DrenagemIcon,
  HodometroIcon,
  HorimetroIcon,
  MinusIcon,
  VehicleIcon,
} from '../../svg';

const columnHelper = createColumnHelper<VehicleData>();

import styled from 'styled-components';
import { CustomColumns } from '../../FilterModal/Form/types';
import { formatNumber } from 'src/components/Tracking/utils/common';
import { useConfiguration } from '@ftdata/core';
import { useTranslation } from 'react-i18next';

const DivValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  cursor: pointer;
  svg,
  path {
    stroke: white;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  path {
    stroke: white;
  }
`;

export const ColumnsFunction = (
  customColumns: CustomColumns,
  allExpanded: boolean,
  toggleAllRowsExpanded: () => void,
): ColumnDef<VehicleData, unknown>[] => {
  const { t } = useTranslation('114');
  const { settings } = useConfiguration();
  const unidadeVolume = settings?.unit_volume == 'litro' ? '(L)' : '(gal)';
  const unidadeMedida = settings?.unit_length == 'quilometro' ? '(km)' : '(milhas)';
  const allColumns = [
    columnHelper.accessor('ativo_id', {
      header: () => (
        <IconContainer>
          {allExpanded ? (
            <MinusIcon stroke="white" onClick={toggleAllRowsExpanded} />
          ) : (
            <AddCircleIcon stroke="white" onClick={toggleAllRowsExpanded} />
          )}
        </IconContainer>
      ),
      cell: (info) => (
        <IconContainer>
          {!info.row.getIsExpanded() ? (
            <AddCircleIcon stroke="#26333B" onClick={() => info.row.toggleExpanded()} />
          ) : (
            <MinusIcon stroke="#26333B" onClick={() => info.row.toggleExpanded()} />
          )}
        </IconContainer>
      ),
    }),
    columnHelper.accessor('ativo_desc', {
      header: () => (
        <DivValue>
          <VehicleIcon stroke="white" />
          <span>{t('vehicle')}</span>
        </DivValue>
      ),
      cell: (info) => <DivValue>{info.row.original.ativo_desc}</DivValue>,
    }),
    columnHelper.accessor('tanks_name', {
      header: () => (
        <DivValue>
          <MinusIcon />
          <span>{t('tank')}</span>
        </DivValue>
      ),
      cell: (info) => <DivValue>{info.row.original.tanks_name?.join(', ')}</DivValue>,
    }),
    columnHelper.accessor('odometer', {
      header: () => (
        <DivValue>
          <HodometroIcon />
          <span>
            {t('hodometro')} {unidadeMedida}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return (
          <DivValue>
            {formatNumber(info.row.original.odometer)} {unidadeMedida}
          </DivValue>
        );
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('hourmeter', {
      header: () => (
        <DivValue>
          <HorimetroIcon />
          <span>{t('horimeter')} (h)</span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{info.row.original.hourmeter}</DivValue>;
      },
    }),
    columnHelper.accessor('comsuption', {
      header: () => (
        <DivValue>
          <ConsumoLitrosIcon />
          <span>
            {t('total_consumption')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.comsuption)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('idle_comsuption', {
      header: () => (
        <DivValue>
          <ConsumoOciosoIcon />
          <span>
            {t('idle_consumption')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.idle_comsuption)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('movement_comsuption', {
      header: () => (
        <DivValue>
          <ConsumoMovimentoIcon />
          <span>
            {t('consumption_on_the_move')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.movement_comsuption)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('consuption_off', {
      header: () => (
        <DivValue>
          <ConsumoDesligadoIcon />
          <span>
            {t('consumption_off')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return (
          <DivValue>
            {formatNumber(info.row.original.consuption_off)} {unidadeVolume}
          </DivValue>
        );
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('draining_liters', {
      header: () => (
        <DivValue>
          <DrenagemIcon />
          <span>
            {t('drainage')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.draining_liters)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('supply_liters', {
      header: () => (
        <DivValue>
          <AbastecimentoIcon />
          <span>
            {t('supply')} {unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.supply_liters)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('consumption_l_h', {
      header: () => (
        <DivValue>
          <ConsumoLitrosHoraIcon />
          <span>
            {t('consumption_2')} {unidadeVolume}/h
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue> {formatNumber(info.row.original.consumption_l_h)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
    columnHelper.accessor('comsuption_km_h', {
      header: () => (
        <DivValue>
          <ConsumoKmHoraIcon />
          <span>
            {t('consumption_2')} {unidadeMedida}/{unidadeVolume}
          </span>
        </DivValue>
      ),
      cell: (info) => {
        return <DivValue>{formatNumber(info.row.original.comsuption_km_h)}</DivValue>;
      },
    }) as ColumnDef<VehicleData, string>,
  ];

  const columnMapping = {
    draining_liters: 'drenagens',
    supply_liters: 'abastecimentos',
    odometer: 'hodometro',
    hourmeter: 'horimetro',
    total_liters: 'volumeTotalConsumido',
    idle_comsuption: 'consumoOcioso',
    movement_comsuption: 'consumoEmMovimento',
    consumption_l_h: 'consumoEmLH',
    comsuption_km_h: 'consumoEmKMH',
    consuption_off: 'consumoDesligado',
  };

  const selectedColumns = Object.entries(customColumns)
    .filter((entry) => entry[1].isSelected)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key]) => key);

  const filteredAndOrderedColumns = allColumns.filter((column) => {
    const columnWithAccessorKey = column as { accessorKey: string };
    const columnId = columnWithAccessorKey.accessorKey;

    if (columnId === 'ativo_id' || columnId === 'ativo_desc' || columnId === 'tanks_name') {
      return true; // Sempre incluir estas colunas
    }

    const mappedKey = columnMapping[columnId as keyof typeof columnMapping];
    return selectedColumns.includes(mappedKey);
  });

  // Reordenar as colunas filtradas
  const reorderedColumns = [
    filteredAndOrderedColumns[0], // vehicle.id
    filteredAndOrderedColumns[1], // vehicle.ativo_description
    filteredAndOrderedColumns[2], // vehicle.tanks_name
    ...selectedColumns
      .map((key) =>
        filteredAndOrderedColumns.find(
          (col) =>
            (col as { accessorKey: string }).accessorKey ===
            Object.keys(columnMapping).find(
              (k) => columnMapping[k as keyof typeof columnMapping] === key,
            ),
        ),
      )
      .filter(Boolean),
  ];

  return reorderedColumns.filter(Boolean) as ColumnDef<VehicleData, unknown>[];
};

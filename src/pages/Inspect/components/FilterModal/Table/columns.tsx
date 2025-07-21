import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { type TableVideoItem } from 'src/types/filter';
import { Checkbox } from '@ftdata/ui';
import moment from 'moment';
import { t } from 'src/App';

const columnHelper = createColumnHelper<TableVideoItem>();

export const ColumnsFunction = (
  setCheckbox: React.Dispatch<React.SetStateAction<(string | number)[]>>,
  checkbox: Array<string | number>,
): any => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('file_name', {
        cell: (info) => (
          <div style={{ width: '10px' }}>
            <Checkbox
              label=""
              style={{
                background: 'ccc',
              }}
              checked={checkbox.includes(info.getValue())}
              onChange={() => {
                const dataRow: string = info.getValue();
                if (!checkbox.includes(dataRow)) {
                  setCheckbox([...checkbox, dataRow]);
                  return;
                }

                setCheckbox(checkbox.filter((value) => value != dataRow));
              }}
              type="checkbox"
              name=""
              id={info.getValue()}
            />
          </div>
        ),
        header: () => <span></span>,
      }),
      columnHelper.accessor('date', {
        cell: (info) => (
          <div className="font-semibold">{moment(info.getValue()).format('DD/MM/yyyy')}</div>
        ),
        header: () => <span>{t('dt_gps')}</span>,
      }),
      columnHelper.accessor('hour', {
        cell: (info) => <div className="font-semibold">{info.getValue()}</div>,
        header: () => <span>{t('hour')}</span>,
      }),
    ],
    [checkbox],
  );

  return columns;
};

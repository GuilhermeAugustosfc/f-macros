import React, { useMemo } from 'react';
import { Button, CustomSelect as Select, Input, Switch, MultiSelect } from '@ftdata/ui';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ptBR, es, enUS } from 'date-fns/locale';
import {
  Action,
  FormControl,
  SaveFilter,
  SwitchReference,
  FormContainer,
  FormContent,
  TimeRowContainer,
} from './styles';
import { type FormProps } from './types';
import { useFormLogic } from './useFormLogic';
import {
  CalendarIcon,
  ClientIcon,
  DriverHeaderIcon,
  GroupIcon,
  ReferencePointIcon,
} from '../../svg';
import { addDays, format, startOfMonth } from 'date-fns';
import { TimeSelector } from './TimeSelector';

export const Form: React.FC<FormProps> = React.memo(({ applyFilter, close }: FormProps) => {
  const {
    formState,
    handlers,
    selectOptions,
    errors,
    selectRef,
    handleSubmit,
    language,
    t,
    getFirstAndLastDayOfPreviousMonth,
  } = useFormLogic(applyFilter);

  const { endDate, startDate } = formState.selectedRange[0];

  const dateRanges = useMemo(
    () => ({
      initialRange: startDate ? format(startDate, 'dd/MM/yyyy') : '',
      endRange: endDate ? format(endDate, 'dd/MM/yyyy') : '',
      initialRangeWithTime: startDate
        ? `${format(startDate, 'dd/MM/yyyy')} ${formState.startTime.hour}:${formState.startTime.minute}:${
            formState.startTime.second
          }`
        : '',
      endRangeWithTime: endDate
        ? `${format(endDate, 'dd/MM/yyyy')} ${formState.endTime.hour}:${formState.endTime.minute}:${
            formState.endTime.second
          }`
        : '',
    }),
    [startDate, endDate, formState.startTime, formState.endTime],
  );

  return (
    <FormContainer>
      <FormContent height={window.innerHeight <= 730 ? '75%' : '82%'}>
        <Select
          label="Cliente"
          icon={<ClientIcon width={24} height={24} />}
          width="100%"
          placeholder={t('select')}
          options={selectOptions.clientsOptions}
          isError={errors.client}
          helpText={errors.client ? t('this_field_is_required') : ''}
          required
          t={t}
          selected={formState.selectedClient}
          setSelected={handlers.setSelectedClient}
        />

        <FormControl ref={selectRef}>
          <div className="textField">
            <label htmlFor="">{t('period')}</label>
            <label className="required">*</label>
          </div>
          <button
            type="button"
            onClick={() => handlers.setShowDatePicker(!formState.showDatePicker)}
            className="btn-calendar"
          >
            <CalendarIcon width={24} height={24} />
            {dateRanges.initialRangeWithTime && dateRanges.endRangeWithTime
              ? `${dateRanges.initialRangeWithTime} - ${dateRanges.endRangeWithTime}`
              : t('choose')}
          </button>

          {formState.showDatePicker && (
            <DateRangePicker
              className="date-range-custom"
              locale={language.includes('pt') ? ptBR : language.includes('en') ? enUS : es}
              onChange={(item) => handlers.setSelectedRange([item.selection])}
              moveRangeOnFirstSelection={false}
              maxDate={new Date()}
              months={1}
              ranges={formState.selectedRange}
              direction="vertical"
              editableDateInputs={false}
              renderStaticRangeLabel={(e) => (
                <div onClick={() => handlers.setShowDatePicker(false)}>{e.label}</div>
              )}
              staticRanges={[
                {
                  label: t('yesterday'),
                  hasCustomRendering: true,
                  range: () => ({
                    startDate: addDays(new Date(), -1),
                    endDate: addDays(new Date(), -1),
                  }),
                  isSelected: () => false,
                },
                {
                  label: t('last_7_day'),
                  hasCustomRendering: true,
                  range: () => ({
                    startDate: addDays(new Date(), -7),
                    endDate: addDays(new Date(), -1),
                  }),
                  isSelected: () => false,
                },
                {
                  label: t('last_30_days'),
                  hasCustomRendering: true,
                  range: () => ({
                    startDate: addDays(new Date(), -30),
                    endDate: addDays(new Date(), -1),
                  }),
                  isSelected: () => false,
                },
                {
                  label: t('this_month'),
                  hasCustomRendering: true,
                  range: () => ({
                    startDate: startOfMonth(new Date()),
                    endDate: addDays(new Date(), -1),
                  }),
                  isSelected: () => false,
                },
                {
                  label: t('last_month'),
                  hasCustomRendering: true,
                  range: () => {
                    const { firstDayOfPreviousMonth, lastDayOfPreviousMonth } =
                      getFirstAndLastDayOfPreviousMonth();
                    return {
                      startDate: firstDayOfPreviousMonth,
                      endDate: lastDayOfPreviousMonth,
                    };
                  },
                  isSelected: () => false,
                },
              ]}
            />
          )}

          <TimeRowContainer>
            <TimeSelector
              label={t('start_time') || 'Horário de Início'}
              time={formState.startTime}
              onChange={handlers.setStartTime}
            />

            <TimeSelector
              label={t('end_time') || 'Horário de Fim'}
              time={formState.endTime}
              onChange={handlers.setEndTime}
            />
          </TimeRowContainer>
        </FormControl>

        <MultiSelect
          label={t('vehicles')}
          placeholder={t('select')}
          value={formState.selectedVehicle}
          options={selectOptions.vehicleOptions}
          onChangeItems={(selectedOptions: any) => {
            handlers.setSelectedVehicle(selectedOptions);
          }}
          isError={!!errors.vehicle}
          helpText={errors.vehicle ? t('this_field_is_required') : ''}
          required
          selectAll
          translation={t}
        />

        <Select
          icon={<DriverHeaderIcon width={24} height={24} />}
          width="100%"
          label="Motorista"
          placeholder={t('select')}
          options={[{ label: t('all_drivers'), value: '0' }, ...selectOptions.motoristaOptions]}
          isError={!!errors.motorista}
          helpText={errors.motorista ? t('this_field_is_required') : ''}
          required
          t={t}
          selected={formState.selectedMotorista}
          setSelected={handlers.setSelectedMotorista}
        />

        <Select
          icon={<GroupIcon width={24} height={24} />}
          width="100%"
          label={'Grupos de macros'}
          placeholder={t('select')}
          options={[{ label: t('all_drivers'), value: '0' }, ...selectOptions.gruposMacrosOptions]}
          isError={!!errors.gruposMacros}
          helpText={errors.gruposMacros ? t('this_field_is_required') : ''}
          required
          t={t}
          selected={formState.selectedGruposMacros}
          setSelected={handlers.setSelectedGruposMacros}
        />

        <SwitchReference>
          <div>{t('radius_of_reference_point_in_meters')}</div>
          <Switch
            checked={formState.referencePointSelected.isChecked}
            onChange={() =>
              handlers.setReferencePointSelected((state) => ({
                ...state,
                isChecked: !state.isChecked,
              }))
            }
            size="medium"
          />
          {formState.referencePointSelected.isChecked && (
            <Input
              width="100%"
              type="number"
              defaultValue={formState.referencePointSelected.value}
              placeholder={t('write')}
              icon={<ReferencePointIcon width={24} height={24} />}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlers.setReferencePointSelected((state) => ({
                  ...state,
                  value: Number(e.target.value),
                }))
              }
            />
          )}
        </SwitchReference>

        <SaveFilter>
          {t('save_filter')}
          <Switch
            checked={formState.saveFilters}
            onChange={() => handlers.setSaveFilters((state) => !state)}
            size="medium"
          />
        </SaveFilter>
      </FormContent>
      <Action>
        <Button variant="primary" className="btn-apply" onClick={handleSubmit}>
          {t('apply_filters')}
        </Button>
        <Button onClick={close} variant="secondary" className="btn-cancel">
          {t('cancel')}
        </Button>
      </Action>
    </FormContainer>
  );
});

Form.displayName = 'Form';

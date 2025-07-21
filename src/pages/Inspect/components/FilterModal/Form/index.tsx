import React, { useContext, useEffect, useState } from 'react';
import { Button, Collapse, Radio, MultiSelect } from '@ftdata/ui';
import {
  Action,
  FormControl,
  FormContainer,
  FormContent,
  RadioContainer,
  InputGroup,
} from './styles';
import { type FormProps, type SelectOption } from './types';
import { useFormLogic } from './useFormLogic';
import { SkeletonChannel } from './Components/components';
import { RequestVideos } from '../RequestVideos';
import { ReportsContext } from 'src/contexts/reports';
import { DateRangePicker } from 'rsuite';
import 'rsuite/DateRangePicker/styles/index.css';
import './index.css';
import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { Icon } from '@ftdata/f-icons';
import moment from 'moment';
import { t } from 'src/App';

const Form: React.FC<FormProps> = ({ close }: FormProps) => {
  const { selectOptions, errors, loading, setErrors } = useFormLogic();
  const {
    setHasFilter,
    client,
    ativo,
    period,
    channel,
    setChannel,
    setAtivo,
    setClient,
    setPeriod,
  } = useContext(ReportsContext);

  const { combine, afterToday, allowedMaxDays } = DateRangePicker;

  const [collapseChannel, setCollapseChannel] = useState<boolean>(false);
  const [requestVideos, setRequestVideos] = useState<boolean>(false);
  const DomToReactWrapper: React.ElementType = () => <Icon name="eml calendar-schedule" />;

  const handlerCollapse = () => {
    setCollapseChannel(selectOptions.optionsChannels.length > 0 ? !collapseChannel : false);
  };

  useEffect(() => {
    if (selectOptions.optionsChannels.length > 0) setCollapseChannel(true);
    if (channel.value == '' && selectOptions.optionsChannels.length > 0)
      setChannel(selectOptions.optionsChannels[0]);
  }, [selectOptions.optionsChannels]);

  if (requestVideos)
    return (
      <RequestVideos
        close={close}
        setErrors={setErrors}
        backToForm={() => {
          setRequestVideos(false);
          setHasFilter(true);
        }}
      />
    );

  return (
    <FormContainer>
      <FormContent>
        <MultiSelect
          width="100%"
          placeholder={t('select')}
          label={t('customer')}
          translation={t}
          options={selectOptions.clientsOptions || ({} as SelectOption[])}
          onChange={() => setClient(client)}
          helpText={errors.client ? t('this_field_is_required') : ''}
          required
          value={[]}
        />

        <MultiSelect
          width="100%"
          label={t('vehicles')}
          translation={t}
          placeholder={t('select')}
          onChangeItems={() => setAtivo(ativo)}
          options={selectOptions.selectAtivos}
          helpText={errors.ativo ? t('this_field_is_required') : ''}
          required
          value={[]}
        />

        <FormControl>
          <div className="textField">
            <label htmlFor=""> {t('dt_gps')} </label>
            <label className="required">*</label>
          </div>

          <DateRangePicker
            format="dd/MM/yyyy HH:mm:ss"
            defaultCalendarValue={[startOfDay(new Date()), endOfDay(new Date())]}
            character=" – "
            style={{ width: '100%' }}
            value={period && Array.isArray(period) ? [period[0], period[1]] : null}
            shouldDisableDate={combine(afterToday(), allowedMaxDays(5))}
            onChange={(e: any) => {
              if (e) {
                setPeriod(e);
                return;
              }

              setPeriod(null);
            }}
            placement="auto"
            placeholder={t('select')}
            caretAs={DomToReactWrapper}
            ranges={[
              {
                label: t('today'),
                value: [startOfDay(new Date()), endOfDay(new Date())],
              },
              {
                label: t('yesterday'),
                value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))],
              },
              {
                label: t('last_5_days'),
                value: [startOfDay(subDays(new Date(), 4)), endOfDay(new Date())],
              },
            ]}
          />
        </FormControl>

        <div>
          <Collapse
            title={t('channel')}
            showCollapse={collapseChannel}
            margin="8px"
            handleChange={handlerCollapse}
            // maxHeight="100%"
          >
            <RadioContainer>
              {loading ? (
                <SkeletonChannel />
              ) : (
                selectOptions.optionsChannels.map((option, index) => {
                  return (
                    <InputGroup key={index}>
                      <Radio
                        checked={option.label == channel.label}
                        label={option.label}
                        name={option.label}
                        value={option.value}
                        onChange={() =>
                          setChannel({
                            label: option.label,
                            value: option.value,
                          })
                        }
                      />
                    </InputGroup>
                  );
                })
              )}
            </RadioContainer>
          </Collapse>
        </div>
      </FormContent>
      <Action>
        <Button
          disabled={
            !(
              client.value.toString().length > 0 &&
              ativo.value.toString().length > 0 &&
              channel.value.toString().length > 0 &&
              period &&
              Array.isArray(period) &&
              moment(period[0], 'DD/MM/YYYY HH:mm:ss').isValid() &&
              moment(period[1], 'DD/MM/YYYY HH:mm:ss').isValid()
            )
          }
          variant="primary"
          type="submit"
          className="btn-apply"
          onClick={() => {
            setHasFilter(false);
            setRequestVideos(true);
          }}
        >
          {t('request_videos')}
        </Button>
        <Button onClick={() => close()} type="button" variant="secondary" className="btn-cancel">
          {t('cancel')}
        </Button>
      </Action>
    </FormContainer>
  );
};

export default Form;

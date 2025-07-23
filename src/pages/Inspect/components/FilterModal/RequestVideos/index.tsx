import React, { useContext, useEffect, useMemo, useState, type JSX } from 'react';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import { Action } from '../Form/styles';
import { Container, ContainerSearch, ContainerVideos } from './style';
import { ReportsContext } from 'src/contexts/reports';
import { ComponentLoading, EmptyState } from '../Form/Components/components';
import ContentTable from '../Table/Content';
import { getVideostracker, setVideostracker } from 'src/services/reports/filter';
import moment from 'moment';
import { type TableVideoItem } from 'src/types/filter';
import { useTranslation } from '@ftdata/core';

type PropsVideo = {
  close: () => void;
  backToForm: () => void;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      client: boolean;
      ativo: boolean;
    }>
  >;
};

export type EmptyStateProps = 'success' | 'noData' | 'error' | 'timeout' | null;

export const RequestVideos = ({ close, backToForm, setErrors }: PropsVideo): JSX.Element => {
  const { t } = useTranslation();
  const { client, ativo, period, channel, setAlertState } = useContext(ReportsContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [emptyState, setEmptyState] = useState<EmptyStateProps>(null);
  const [videosSelected, setVideosSelected] = useState<Array<string | number>>([]);
  const [search, setSearch] = useState<string>('');
  const [dataTable, setDataTable] = useState<TableVideoItem[]>([]);

  useEffect(() => {
    setLoading(true);

    const newErrors = {
      client: !Boolean(client.value),
      ativo: !Boolean(ativo.value),
      channel: !Boolean(channel.value),
      period: !validPeriod(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((value) => value) || period == null) {
      backToForm();
      return;
    }

    getVideostracker(
      ativo.value.toLocaleString(),
      channel.value.toString(),
      moment(Array.isArray(period) ? period[0] : '').format('DD/MM/YYYY HH:mm:ss'),
      moment(Array.isArray(period) ? period[1] : '').format('DD/MM/YYYY HH:mm:ss'),
    )
      .then((res) => {
        setLoading(false);
        if (res.status == 408) {
          stateError('timeout');
          return;
        }

        if (!res || !res.data || !Array.isArray(res.data)) {
          stateError('error');
          return;
        }

        if (res.status == 204) {
          stateError('noData');
          return;
        }

        if (res.status == 200 || res.status == 201) {
          if (res.data.length > 0) {
            setEmptyState('success');
            setTimeout(() => {
              setDataTable(res.data);
              setEmptyState(null);
            }, 2500);
            return;
          }

          stateError('noData');
          return;
        }
      })
      .catch(() => {
        stateError('error');
      });
  }, []);

  const stateError = (state: EmptyStateProps) => {
    setEmptyState(state);
    setTimeout(() => {
      backToForm();
    }, 3000);
  };

  const validPeriod = () => {
    if (period == null || !Array.isArray(period)) return false;
    if (
      moment(period[0], 'DD/MM/YYYY HH:mm:ss').isValid() &&
      moment(period[1], 'DD/MM/YYYY HH:mm:ss').isValid()
    )
      return true;

    return false;
  };

  const sendRequestVideos = () => {
    setLoadingRequest(true);
    setVideostracker(videosSelected, parseInt(channel.value.toString()), ativo.value)
      .then((res) => {
        if ((res && res.status && res.status == 201) || res.status == 200) {
          setAlertState({
            icon: 'ui checkmark-done-check',
            message: t('selected_videos_in_processing'),
            open: true,
            type: 'success',
          });

          setLoadingRequest(false);

          setTimeout(() => {
            backToForm();
          }, 2000);

          return;
        }

        setAlertState({
          icon: 'ui delete-disabled-circle',
          message: t('error_saving_video'),
          open: true,
          type: 'danger',
        });
        setLoadingRequest(false);
      })
      .catch(() => {
        setAlertState({
          icon: 'ui delete-disabled-circle',
          message: t('error_saving_video'),
          open: true,
          type: 'danger',
        });
        setLoadingRequest(false);
      });
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const filteredData = useMemo(() => {
    const normalizedSearchInput = normalizeText(search);
    return dataTable.filter((row) =>
      Object.values(row).some((value) =>
        normalizeText(String(value)).includes(normalizedSearchInput),
      ),
    );
  }, [dataTable, search]);

  if (emptyState !== null)
    return (
      <EmptyState
        colorErr={emptyState}
        iconName={emptyState == 'success' ? 'ui checkmark-done-check' : 'ui delete-disabled-circle'}
        text={
          emptyState == 'success'
            ? t('videos_requested_successfully')
            : t('there_are_no_videos_for_the_chosen_date')
        }
      />
    );

  if (!loading)
    return (
      <>
        <Container>
          <ContainerSearch>
            <Icon name="ui search-loupe" />
            <input onChange={(e) => setSearch(e.target.value)} type="text" />
          </ContainerSearch>
          <ContainerVideos>
            <ContentTable
              data={filteredData}
              checkbox={videosSelected}
              setCheckbox={setVideosSelected}
              isLoading={false}
            />
          </ContainerVideos>
        </Container>
        <Action>
          <Button
            disabled={!(videosSelected.length > 0 && videosSelected.length < 6) || loadingRequest}
            variant="primary"
            type="submit"
            className="btn-apply"
            loading={loadingRequest}
            onClick={() => sendRequestVideos()}
          >
            {t('request_videos')}
          </Button>
          <Button
            disabled={loadingRequest}
            onClick={() => close()}
            loading={loadingRequest}
            type="button"
            variant="secondary"
            className="btn-cancel"
          >
            {t('cancel')}
          </Button>
        </Action>
      </>
    );

  return <ComponentLoading />;
};

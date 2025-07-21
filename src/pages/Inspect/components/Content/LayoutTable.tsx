import { useContext, useEffect, useState, type JSX } from 'react';
import {
  ContainerActionContent,
  ContainerButton,
  ContainerHeaderContent,
  ContainerLayoutGrid,
  ContainerSpan,
  ContainerTable,
  SubTitleSpan,
  TitleSpan,
} from './style';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import * as styleguide from '@ftdata/f-tokens';
import Empty from '../Empty';
import Table from './Table';
import {
  deleteAllVideos,
  deleteVideos,
  getDataTable,
  putVideosDownload,
} from 'src/services/reports/playback';
import { type NOTIFICATION_TYPE, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Popover } from 'src/components/Popover';
import { TableContext } from 'src/contexts/table';
import { ConfirmationModal } from 'src/components/ConfirmationModal';
import { t } from 'src/App';

type PropsLayout = {
  handleOpenModal: () => void;
};

export const notification = (
  headerTitle: string,
  title: string,
  message: string,
  type: NOTIFICATION_TYPE,
): void => {
  Store.addNotification({
    content: (
      <Popover
        title={headerTitle}
        subTitle={title}
        description={message}
        iconName={type == 'danger' ? 'ui warning-circle' : 'ui checkmark-done-check'}
        type={type}
      />
    ),
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      pauseOnHover: false,
      duration: 2000,
      onScreen: false,
    },
  });
};

const LayoutTable = ({ handleOpenModal }: PropsLayout): JSX.Element => {
  const { checkbox, dataTable, setDataTable, sorting, search, setIsLoading, pagination } =
    useContext(TableContext);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [sorting, search, pagination]);

  const fetchData = () => {
    setIsLoading(true);
    getDataTable({ search, sorting, pagination })
      .then((data) => {
        if (data.status == 204) {
          if (search.value == '') {
            setEmptyState(true);
            setIsLoading(false);
            return;
          }

          setDataTable({
            data: [],
            total: 0,
          });

          setIsLoading(false);
        }

        if (data.status == 200 && data.data && data.data.data) {
          if (data.data.total == 0 && search.value == '') {
            setEmptyState(true);
            setIsLoading(false);
            return;
          }

          setEmptyState(false);
          setDataTable(data.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // const debouncedFetch = debounce((query: any) => {
  //   setSearch({
  //     value: query,
  //     label: search.label,
  //   });
  // }, 500);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   debouncedFetch(query);
  // };

  const deleteVideosPlayback = () => {
    setLoadingDelete(true);
    setModalIsOpen(false);
    if (checkbox == 'all') {
      deleteAllVideos()
        .then((response) => {
          setLoadingDelete(false);
          response.status === 200
            ? notification(
                t('deleting_videos'),
                t('videos_deleted_successfully') + '!',
                '',
                'success',
              )
            : notification(
                t('video_deletion_failed'),
                t('an_unexpected_problem_has_occurred'),
                t('please_check_your_connection_and_try_again'),
                'danger',
              );
          fetchData();
        })
        .catch((err) => {
          setLoadingDelete(false);
          notification(
            t('video_deletion_failed'),
            t('an_unexpected_problem_has_occurred'),
            t('please_check_your_connection_and_try_again'),
            'danger',
          );
          console.log(err);
        });
      return;
    }

    if (Array.isArray(checkbox)) {
      deleteVideos(checkbox)
        .then((response) => {
          setLoadingDelete(false);
          response.status === 200
            ? notification(
                t('deleting_videos'),
                t('videos_deleted_successfully') + '!',
                '',
                'success',
              )
            : notification(
                t('video_deletion_failed'),
                t('an_unexpected_problem_has_occurred'),
                t('please_check_your_connection_and_try_again'),
                'danger',
              );
          fetchData();
        })
        .catch((err) => {
          notification(
            t('video_deletion_failed'),
            t('an_unexpected_problem_has_occurred'),
            t('please_check_your_connection_and_try_again'),
            'danger',
          );
          setLoadingDelete(false);
          console.log(err);
        });
    }
  };

  const downloadVideos = (videoId?: number[]) => {
    setLoadingDownload(true);
    const download =
      videoId && videoId.length > 0 ? videoId : Array.isArray(checkbox) ? checkbox : [];
    putVideosDownload(download)
      .then((response) => {
        response.status === 200
          ? notification(
              'Download',
              t('video_download_requested_successfully') + '!',
              '',
              'success',
            )
          : notification(
              t('download_failed'),
              t('an_unexpected_problem_has_occurred'),
              t('please_check_your_connection_and_try_again'),
              'danger',
            );

        setLoadingDownload(false);
      })
      .catch((err) => {
        setLoadingDownload(false);
        notification(
          t('download_failed'),
          t('an_unexpected_problem_has_occurred'),
          t('please_check_your_connection_and_try_again'),
          'danger',
        );
        console.log(err);
      });
  };

  return (
    <div>
      <ContainerHeaderContent>
        <ContainerSpan>
          <TitleSpan>{t('playback')}</TitleSpan>
          <SubTitleSpan>{t('video_history_for_accurate_event_analysis')}</SubTitleSpan>
        </ContainerSpan>

        <ContainerButton>
          {Array.isArray(checkbox) && checkbox.length > 0 && (
            <Button
              onClick={() => downloadVideos()}
              variant="primary"
              small
              loading={loadingDownload}
              disabled={
                checkbox.length > 5 ||
                dataTable.data.filter(
                  (check: { id: string; status: string }) =>
                    checkbox.includes(check.id) && check.status == '2',
                ).length > 0
              }
            >
              <Icon name="ui download-save-simple" color="#fff" />
              <span> {t('download')} </span>
            </Button>
          )}

          {(checkbox.length > 0 || checkbox == 'all') && (
            <Button
              variant="primary"
              small
              loading={loadingDelete}
              style={{
                backgroundColor: styleguide.COLOR_DANGER_MEDIUM,
              }}
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              <Icon name="ui trash-delete-bin-1" color="#fff" />
              <span> {t('delete_selected')} </span>
            </Button>
          )}
        </ContainerButton>
      </ContainerHeaderContent>

      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={deleteVideosPlayback}
        title={t('do_you_really_want_to_delete_this_record')}
        message={t('really_want_delete_type_confirm')}
      />

      <ContainerActionContent>
        {!emptyState ? (
          <div style={{ width: '100%' }}>
            <ContainerTable>
              <ContainerLayoutGrid>
                <Table />
              </ContainerLayoutGrid>
            </ContainerTable>
          </div>
        ) : (
          <Empty openModal={handleOpenModal} />
        )}
      </ContainerActionContent>
    </div>
  );
};

export default LayoutTable;

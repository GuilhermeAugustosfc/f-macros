import { useContext, useEffect, useState, type JSX } from 'react';
import {
  ContainerActionContent,
  ContainerButton,
  ContainerHeaderContent,
  ContainerLayoutGrid,
  ContainerTable,
} from './style';
import { Button, Loading } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import * as styleguide from '@ftdata/f-tokens';
import Empty from '../Empty';
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
import ConsolidatedData from './ConsolidatedData';
import { useTranslation } from '@ftdata/core';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ColumnsFunction } from './Table/columns';
import { useQuery } from 'react-query';
import { fetchListAccess } from 'src/components/Apis';
import { ContainerLoading, ContainerTableGrid } from 'src/pages/Settings/styles';
import type { DataTableItem } from './types';
import TableComponent from 'src/components/Table';
import { Pagination } from 'src/components/Table/Pagination';

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
  const { t } = useTranslation();
  const { search, setSearch, sorting, setSorting, dataTable, pagination, setDataTable } =
    useContext(TableContext);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [emptyState, setEmptyState] = useState<boolean>(false);
  const columns = ColumnsFunction();

  const {
    data,
    isLoading,
    // refetch: refetchListAccess,
  } = useQuery(
    'inspectList',
    async () => {
      const response = await getDataTable({ search, sorting, pagination });
      return response.data.data;
    },
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 100 },
  );

  const table = useReactTable<DataTableItem>({
    data: data || [],
    columns: columns,
    state: {
      globalFilter: search,
      sorting,
    },
    onSortingChange: setSorting,
    globalFilterFn: (row, _columnID, value: string) => {
      const plate = `${row.original.plate.toLocaleLowerCase()} - ${row.original.ativo.toLocaleLowerCase()}`;
      const isPlate = plate.includes(value.toLocaleLowerCase());
      const isClient = row.original.client.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      return isPlate || isClient;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  // useEffect(() => {
  //   fetchData();
  // }, [sorting, search, pagination]);

  // const fetchData = () => {
  //   getDataTable({ search, sorting, pagination })
  //     .then((data) => {
  //       if (data.status == 204) {
  //         if (search.value == '') {
  //           setEmptyState(true);
  //           return;
  //         }

  //         setDataTable({
  //           data: [],
  //           total: 0,
  //         });
  //       }

  //       if (data.status == 200 && data.data && data.data.data) {
  //         if (data.data.total == 0 && search.value == '') {
  //           setEmptyState(true);
  //           return;
  //         }

  //         setEmptyState(false);
  //         setDataTable(data.data);
  //       }
  //     })
  //     .catch(() => {});
  // };

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
    if (table.getIsAllRowsSelected()) {
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

    if (table.getIsSomeRowsSelected()) {
      deleteVideos(table.getSelectedRowModel().rows.map((row) => row.original.id))
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

  return (
    <div>
      <ContainerHeaderContent>
        {/* <ContainerButton>
          {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
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
        </ContainerButton> */}
      </ContainerHeaderContent>

      <ConsolidatedData />

      {isLoading ? (
        <ContainerLoading>
          <Loading size={'xl'} variant={'light'} />
        </ContainerLoading>
      ) : data && table ? (
        <ContainerTableGrid>
          <TableComponent<DataTableItem> table={table} setSorting={setSorting} pagination={<></>} />
        </ContainerTableGrid>
      ) : (
        <div></div>
        // <Empty />
      )}

      {/* <ContainerActionContent>
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
      </ContainerActionContent> */}

      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={deleteVideosPlayback}
        title={t('do_you_really_want_to_delete_this_record')}
        message={t('really_want_delete_type_confirm')}
      />

      {!isLoading && <Pagination table={table} />}
    </div>
  );
};

export default LayoutTable;

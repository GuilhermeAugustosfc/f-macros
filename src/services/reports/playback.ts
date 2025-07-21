import { type AxiosResponse } from 'axios';

import instance from '../instance';
import type {
  DataTableItemResponse,
  FilterTable,
} from 'src/pages/Inspect/components/Content/types';

export function deleteAllVideos(): Promise<AxiosResponse<any>> {
  return instance.delete<any>(`https://api-mdvr.fulltrackapp.com/playbacks/`);
}

export function deleteVideos(videoId: (string | number)[]): Promise<AxiosResponse<any>> {
  const videos_id = videoId.map((id, index) => `playbacks_id[${index}]=${id}`).join('&');
  return instance.delete<any>(`https://api-mdvr.fulltrackapp.com/playbacks?${videos_id}`);
}

export function deleteVideo(videoId: string | number): Promise<AxiosResponse<any>> {
  return instance.delete<any>(`https://api-mdvr.fulltrackapp.com/playbacks/${videoId}`);
}

export function putVideosDownload(file_id: (string | number)[]): Promise<AxiosResponse<any>> {
  const playback = file_id.map((item) => parseInt(item.toString()));
  return instance.post<any>(`https://api-mdvr.fulltrackapp.com/playbacks/download/`, {
    playbacks_id: playback,
  });
}

export function geturlVideo(videoId: string): Promise<AxiosResponse<any>> {
  return instance.get(`https://api-mdvr.fulltrackapp.com/playbacks/view/${videoId}`);
}

export function getDataTable({
  search,
  sorting,
  pagination,
}: FilterTable): Promise<AxiosResponse<DataTableItemResponse>> {
  let sortingFilter = '';
  if (sorting && sorting?.length > 0) {
    sortingFilter = `&order=${sorting[0].desc ? 'DESC' : 'ASC'}&order_by=${sorting[0].id}`;
  }

  let searchFilter = '';
  if (search && search.value.trim().length > 0) {
    searchFilter = `&search_text=${search.value}&search_by=${search.label}`;
  }

  return instance.get(
    `https://api-mdvr.fulltrackapp.com/playbacks/?${
      'limit=' +
      pagination.pageSize +
      '&offset=' +
      pagination.pageIndex * pagination.pageSize +
      sortingFilter +
      searchFilter
    }`,
  );
}

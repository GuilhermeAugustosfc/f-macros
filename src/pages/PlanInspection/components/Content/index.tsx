import { ContainerContent, ContainerInput } from './style';
import { useTranslation } from '@ftdata/core';
import { Input } from '@ftdata/ui';
import Table from '../Table';
import { useQuery } from 'react-query';
import { getDataTable, getParams } from 'src/services/reports/playback';
import { useContext } from 'react';
import debounce from 'lodash/debounce';
import { TableContext } from 'src/contexts/table';

const Content = () => {
  const { t } = useTranslation();
  const { sorting, pagination, search, setSearch } = useContext(TableContext);

  const { data, isLoading } = useQuery(
    `get_table_data/${getParams({ search, pagination, sorting })}`,
    async () => {
      const response = await getDataTable({ search, pagination, sorting });
      return response.data;
    },
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 100 },
  );

  const debouncedFetch = debounce((query: string) => {
    setSearch({
      value: query,
      label: search.label,
    });
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedFetch(query);
  };

  return (
    <ContainerContent>
      <ContainerInput>
        <Input
          icon={'ui search-loupe'}
          placeholder={t('research') + '...'}
          onChange={handleSearch}
          type="text"
        />
      </ContainerInput>

      <Table data={data} loading={isLoading} />
    </ContainerContent>
  );
};
export default Content;

import React from 'react';

import { Paragraph, Title } from '@ftdata/ui';
import styled from 'styled-components';
import EmptListSensoresIcon from 'src/assets/svgs/emptyStates/empty-table.svg?react';
import { useTranslation } from '@ftdata/core';

const Empty: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ContainerEmpty>
      <EmptListSensoresIcon />
      <Title
        size="section"
        style={{
          marginBottom: '1rem',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          width: '400px',
        }}
      >
        {t('no_fuel_sensor_found')}
      </Title>
      <Paragraph
        size="caption"
        style={{
          // width: '400px',
          color: '#6B757C',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '150%',
        }}
      >
        {t(
          'click_add_sensor_to_enter_it_manually_or_import_data_to_upload_a_csv_file_from_your_computer',
        )}
      </Paragraph>
    </ContainerEmpty>
  );
};

const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;

  div {
    max-width: 300px;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  & > svg {
    width: 16.875rem;
    height: 16.875rem;
    margin-bottom: 1rem;
  }
`;

export default Empty;

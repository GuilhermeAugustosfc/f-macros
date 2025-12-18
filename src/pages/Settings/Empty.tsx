import React from 'react';

import { Paragraph, Title, Button } from '@ftdata/ui';
import styled from 'styled-components';
import EmptListSensoresIcon from 'src/assets/svgs/emptyStates/empty-table.svg?react';
import { useTranslation } from '@ftdata/core';
import { AddCircleIcon } from 'src/pages/MacrosReport/components/svg';

interface EmptyProps {
  titleKey?: string;
  paragraphKey?: string;
  onButtonClick?: () => void;
  buttonTextKey?: string;
}

const Empty: React.FC<EmptyProps> = ({ titleKey, paragraphKey, onButtonClick, buttonTextKey }) => {
  const { t } = useTranslation();

  // Valores padrão caso não sejam passados props
  const defaultTitleKey = titleKey || 'no_macro_groups_found';
  const defaultParagraphKey =
    paragraphKey ||
    'click_add_macro_group_to_enter_it_manually_or_import_data_to_upload_a_csv_file_from_your_computer';

  return (
    <ContainerEmpty>
      <EmptListSensoresIcon />
      <Title
        size="section"
        style={{
          marginBottom: '1rem',
          fontStyle: 'normal',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          width: '400px',
        }}
      >
        {t(defaultTitleKey)}
      </Title>
      <Paragraph
        size="caption"
        style={{
          // width: '400px',
          color: '#6B757C',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '150%',
        }}
      >
        {t(defaultParagraphKey)}
      </Paragraph>
      {onButtonClick && buttonTextKey && (
        <ButtonContainer>
          <Button LeftIcon={AddCircleIcon} variant="primary" onClick={onButtonClick}>
            {t(buttonTextKey)}
          </Button>
        </ButtonContainer>
      )}
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

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
`;

export default Empty;

import React from 'react';
import * as styleguide from '@ftdata/f-tokens';
import { Button, Paragraph, Title } from '@ftdata/ui';
import styled from 'styled-components';
import { EmptyReportIcon } from '../svg';
import { Icon } from '@ftdata/f-icons';
import { t } from 'src/App';

interface Props {
  openModal: () => void;
}

const Empty: React.FC<Props> = ({ openModal }: Props) => {
  return (
    <ContainerEmpty>
      <EmptyReportIcon />
      <div>
        <Title size="md"> {t('no_videos_requested')} </Title>
        <Paragraph size="caption" style={{ width: '338px', textAlign: 'center' }}>
          {t('not_requested_videos_fview')}
        </Paragraph>
        <Button variant="primary" onClick={openModal} tabIndex={0}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="ui download-save-simple"
              color={styleguide.COLOR_NEUTRAL_DAY}
              style={{
                marginBottom: 0,
              }}
            />
            <span
              style={{
                marginLeft: '-0.75rem',
              }}
            >
              {t('request_videos')}
            </span>
          </div>
        </Button>
      </div>
    </ContainerEmpty>
  );
};

const ContainerEmpty = styled.div`
  height: 40rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;

  svg {
    margin-bottom: 24px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

export default Empty;

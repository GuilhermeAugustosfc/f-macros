import React from 'react';
import { Container } from './styles';
import { TimeoutIcon, UnreachableContentIcon } from '../svg';
import { t } from 'src/App';

export const UnreachableContent: React.FC = () => {
  return (
    <Container>
      <UnreachableContentIcon />
      <span>{t('no_videos_found')}</span>
      <p>{t('we_did_not_find_any_data_with_the_filtered_terms_try_redoing_the_filtering')}</p>
    </Container>
  );
};

export const TimeoutContent: React.FC = () => {
  return (
    <Container>
      <TimeoutIcon />
      <span>{t('offline_equipment')}</span>
      <p>
        {t('this_device_is_offline_or_the_response_time_has_been_exceeded_please_try_again_later')}
      </p>
    </Container>
  );
};

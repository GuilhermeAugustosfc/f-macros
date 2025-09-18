import React, { type JSX } from 'react';
import {
  ButtonsContainer,
  ConfirmDeleteContainer,
  IconContainer,
  InfoContent,
  Wrapper,
} from './styles';
import { Button } from '@ftdata/ui';
import { useTranslation } from '@ftdata/core';
import { Icon } from '@ftdata/f-icons';
import * as tokens from '@ftdata/f-tokens';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <ConfirmDeleteContainer>
        <Wrapper>
          <IconContainer>
            <Icon name="ui trash-delete-bin-1" color="currentColor" size="3rem" />
          </IconContainer>
          <InfoContent>
            <h2>{t('your_filters_will_be_cleared')}</h2>
            <p>
              {t(
                'do_you_really_want_to_delete_the_selected_filters_they_will_be_excluded_from_saved_filters',
              )}
            </p>
          </InfoContent>

          <ButtonsContainer>
            <Button
              variant="primary"
              onClick={onConfirm}
              style={{ backgroundColor: tokens.COLOR_DANGER_MEDIUM }}
            >
              {t('yes_i_want_to_continue')}
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              {t('cancel')}
            </Button>
          </ButtonsContainer>
        </Wrapper>
      </ConfirmDeleteContainer>
    </>
  );
}

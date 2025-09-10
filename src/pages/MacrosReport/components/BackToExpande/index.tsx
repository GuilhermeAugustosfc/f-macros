import React from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { useTranslation } from '@ftdata/core';
import { useSettings } from '@ftdata/core';
import { Icon } from '@ftdata/f-icons';
interface BackToExpandProps {
  toggleExpand: () => void;
  setComponentLeftMenu: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

export const BackToExpand: React.FC<BackToExpandProps> = ({
  toggleExpand,
  setComponentLeftMenu,
}) => {
  const { t } = useTranslation('114');
  const { style } = useSettings();
  return (
    <BackButton
      color={style['cor-texto-menu-superior']}
      onClick={() => {
        toggleExpand();
        setComponentLeftMenu(null);
      }}
    >
      <Icon name="arw arrow-left" color={style['cor-texto-menu-superior']} />
      {t('back')}
    </BackButton>
  );
};

interface BackButtonProps {
  color: string;
}

const BackButton = styled.div<BackButtonProps>`
  display: flex;
  align-items: center;
  gap: ${styleguide.SPACING_INLINE_02};
  font-size: ${styleguide.FONT_SIZE_MD};
  font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
  color: ${({ color }) => (color ? color : styleguide.COLOR_NEUTRAL_DUSK)};
  cursor: pointer;
`;

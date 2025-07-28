import { Paragraph, Title } from '@ftdata/ui';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { Icon, type IconsNames } from '@ftdata/f-icons';
import { useTranslation } from '@ftdata/core';
import type { JSX } from 'react';

interface ContainerProps {
  backgroundType: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: ${(props) =>
    props.backgroundType === 'danger'
      ? styleguide.COLOR_DANGER_DARKER
      : styleguide.COLOR_SUCCESS_DARKER};
  box-shadow: 0px 4px 8px 0px rgba(107, 117, 124, 0.32);
  color: ${styleguide.COLOR_NEUTRAL_DAY};
  padding: 16px;
  width: 360px;

  span {
    font-size: 12px;
    font-weight: 500;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  svg:last-child {
    cursor: pointer;
  }

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
  }

  h5 {
    margin-bottom: 4px;
  }
`;

type Props = {
  id: string | number;
  description?: string;
  title: string;
  subTitle: string;
  iconName: IconsNames;
  type: 'success' | 'danger';
  closeToast?: () => void;
};

export const Popover = ({
  title,
  subTitle,
  description,
  iconName,
  type,
  closeToast,
}: Props): JSX.Element => {
  const { t } = useTranslation('114');

  return (
    <>
      <Container backgroundType={type}>
        <div>
          <div>
            <Icon color="#FFF" name={iconName} />
            <span>{title}</span>
          </div>
          <Icon color="#FFF" name="ui delete-disabled" onClick={closeToast} />
        </div>
        <div>
          <Title size="sm">{subTitle}</Title>
          <Paragraph size="caption">{description}</Paragraph>
          <span>{t('just_now')}</span>
        </div>
      </Container>
    </>
  );
};

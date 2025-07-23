import { Paragraph, Title } from '@ftdata/ui';
import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { Icon } from '@ftdata/f-icons';
import type { JSX } from 'react';
import type { IconsNames } from 'node_modules/@ftdata/f-icons/dist/types/IconsNames';
import { useTranslation } from '@ftdata/core';

interface ContainerProps {
  backgroundType: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: ${(props) =>
    props.backgroundType == 'danger'
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
  description?: string;
  title: string;
  subTitle: string;
  iconName: IconsNames;
  type: string;
};

export const Popover = ({
  description,
  title,
  subTitle,
  iconName,
  type,
}: Props): JSX.Element | null => {
  const { t } = useTranslation();

  return (
    <Container backgroundType={type}>
      <div>
        <div>
          <Icon color="#FFF" name={iconName} />
          <span>{title}</span>
        </div>
        <Icon color="#FFF" name="ui delete-disabled" />
      </div>
      <div>
        <Title size="sm">{subTitle}</Title>
        <Paragraph size="caption">{description}</Paragraph>
        <span>{t('just_now')}</span>
      </div>
    </Container>
  );
};

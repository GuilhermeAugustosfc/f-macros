import { Loading } from '@ftdata/ui';
import {
  ContainerIcon,
  EmptyStateContainer,
  LoadingContainer,
  SkeletonChannelLoading,
} from '../styles';
import { Icon } from '@ftdata/f-icons';
import * as styleguide from '@ftdata/f-tokens';
import { TimeoutContent, UnreachableContent } from '../../../UnreachableContent';
import type { JSX } from 'react';
import type { EmptyStateProps } from '../../RequestVideos';
import { t } from 'src/App';
import type { IconsNames } from 'node_modules/@ftdata/f-icons/dist/types/IconsNames';

export const ComponentLoading = (): JSX.Element => {
  return (
    <LoadingContainer>
      <Loading
        style={{
          height: '6rem',
          position: 'relative',
        }}
        size="xl"
        variant="light"
      />
      <span> {t('requesting_file_list')}... </span>
    </LoadingContainer>
  );
};

export const SkeletonChannel = (): JSX.Element => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((_item, index) => {
        return <SkeletonChannelLoading key={index} />;
      })}
    </div>
  );
};

export const EmptyState = ({
  text,
  iconName,
  colorErr,
}: {
  text: string;
  iconName: IconsNames;
  colorErr: EmptyStateProps;
}): JSX.Element => {
  if (colorErr == 'noData') {
    return <UnreachableContent />;
  }

  if (colorErr == 'timeout') {
    return <TimeoutContent />;
  }

  return (
    <EmptyStateContainer colorErr={colorErr ?? '#C13E4A'}>
      <ContainerIcon>
        <Icon
          weight=".5"
          name={iconName}
          color={
            colorErr == 'success' ? styleguide.COLOR_SUCCESS_MEDIUM : styleguide.COLOR_DANGER_MEDIUM
          }
        />
      </ContainerIcon>
      <span>{text}</span>
    </EmptyStateContainer>
  );
};

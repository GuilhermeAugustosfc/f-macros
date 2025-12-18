import React, { type JSX } from 'react';

import { TabComponent, TabHeader, TabIcon, TabText, TabUnderline } from './styles';
interface TabProps {
  title: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab = ({ icon: Icon, title, isActive = false, onClick }: TabProps): JSX.Element => {
  return (
    <TabComponent isActive={isActive} onClick={onClick}>
      <TabHeader>
        <TabIcon isActive={isActive}>
          <Icon />
        </TabIcon>
        <TabText isActive={isActive}>{title}</TabText>
      </TabHeader>
      <TabUnderline isActive={isActive} />
    </TabComponent>
  );
};

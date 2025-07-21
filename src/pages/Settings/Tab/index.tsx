import React, { type JSX } from 'react';

import { TabComponent } from './styles';
interface TabProps {
  title: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export const Tab = ({ icon: Icon, title }: TabProps): JSX.Element => {
  return (
    <TabComponent>
      <Icon />
      <p>{title}</p>
    </TabComponent>
  );
};

import React from 'react';
import * as styleguide from '@ftdata/f-tokens';

interface Props {
  asc?: boolean;
  desc?: boolean;
}

const OrderIndicator: React.FC<Props> = ({ asc, desc }: Props) => {
  const color = {
    active: styleguide.COLOR_NEUTRAL_DARK,
    inactive: styleguide.COLOR_NEUTRAL_LIGHT,
  };

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" fill="none" viewBox="0 0 8 6">
        <path fill={asc ? color.active : color.inactive} d="M4 0l3.464 6H.536L4 0z"></path>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" fill="none" viewBox="0 0 8 7">
        <path fill={desc ? color.active : color.inactive} d="M4 6.75L.536.75h6.928L4 6.75z"></path>
      </svg>
    </div>
  );
};

export default OrderIndicator;

import React from 'react';
// import { BackToExpand } from '../BackToExpande';
// import { useConfiguration } from '@ftdata/core';
import { ExpandFullScreenIcon } from '../svg';

interface ExpandButtonProps {
  toggleExpand: () => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ toggleExpand }) => {
  //   const { setComponentLeftMenu } = useConfiguration();

  const handleClick = () => {
    toggleExpand();
    // setComponentLeftMenu(() => (
    //     <BackToExpand toggleExpand={toggleExpand} setComponentLeftMenu={setComponentLeftMenu} />
    // ));
  };

  return (
    <button onClick={handleClick} aria-label="expandir tela">
      <ExpandFullScreenIcon data-testid="expand-icon" />
    </button>
  );
};

export default ExpandButton;

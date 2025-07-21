import React from 'react';
import { Container } from './style';
import LayoutTable from './LayoutTable';

interface Props {
  handleOpenModal: () => void;
}

const Content: React.FC<Props> = ({ handleOpenModal }: Props) => {
  return (
    <Container>
      <LayoutTable handleOpenModal={handleOpenModal}></LayoutTable>
    </Container>
  );
};

export default Content;

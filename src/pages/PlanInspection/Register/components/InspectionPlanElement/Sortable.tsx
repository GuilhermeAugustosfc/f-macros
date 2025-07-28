import { useSortable } from '@dnd-kit/sortable';
import { Checkbox } from '@ftdata/ui';
import DragIcon from 'src/assets/svgs/mouseDragIcon.svg?react';
import PenIcon from 'src/assets/svgs/pen.svg?react';
import { ContainerButton, ContainerDragInDrop, SpanDragInDrop } from './style';
import { Icon } from '@ftdata/f-icons';
import * as tokens from '@ftdata/f-tokens';

interface SortableItemProps {
  item: {
    id: string;
    label: string;
  };
  openModal: (id: string) => void;
  confirmationDelete: (id: string) => void;
}

const SortableItem = ({ item, openModal, confirmationDelete }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <ContainerDragInDrop ref={setNodeRef} transition={transition} transform={transform}>
      <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
        <DragIcon />
      </div>

      <Checkbox checked={true} label="" type="checkbox" />

      <SpanDragInDrop>{item.label}</SpanDragInDrop>

      <ContainerButton>
        <PenIcon
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            console.log(item.id);

            openModal(item.id);
          }}
        />
        <Icon
          color={tokens.COLOR_DANGER_MEDIUM}
          name="ui trash-delete-bin-1"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            confirmationDelete(item.id);
          }}
        />
      </ContainerButton>
    </ContainerDragInDrop>
  );
};

export default SortableItem;

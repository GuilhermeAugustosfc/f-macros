import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './Sortable';
import { ContainerAddItem } from './style';
import PlusAdd from 'src/assets/svgs/plus-add.svg?react';
import { useState } from 'react';
import { ModalRegister } from '../Modal';
import { ConfirmationModal } from 'src/components/ConfirmationModal';
import { useTranslation } from '@ftdata/core';

const DraggableList = ({
  items,
  setItems,
}: {
  items: { id: string; label: string }[];
  setItems: (items: { id: string; label: string }[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const { t } = useTranslation();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ModalRegister
        isOpen={isOpen}
        message=""
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
        title=""
      />

      <ConfirmationModal
        isOpen={isOpenConfirmation}
        onClose={() => setIsOpenConfirmation(false)}
        onConfirm={() => {}}
        title={t('do_you_really_want_to_delete_this_record')}
        message={t('really_want_delete_type_confirm')}
      />
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem
            key={item.id}
            item={item}
            confirmationDelete={() => {
              setIsOpenConfirmation(true);
            }}
            openModal={(data) => {
              console.log(data);

              setIsOpen(true);
              // setDataEdit()
            }}
          />
        ))}

        <ContainerAddItem onClick={() => setIsOpen(true)}>
          <div>
            <PlusAdd />
          </div>
          <span>Adicionar Item</span>
        </ContainerAddItem>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;

import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Input } from '@ftdata/ui';
import { MyButton } from 'src/components/MyButton';
import { GroupDescriptionIcon } from 'src/pages/MacrosReport/components/svg';
import { type Macro } from '../MacrosContainer/types';
import { ColorDropdown } from './ColorDropdown';
import { IconDropdown } from './IconDropdown';

interface MacroEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (macro: Macro) => void;
  macro?: Macro;
}

Modal.setAppElement('#root');

export const MacroEditModal: React.FC<MacroEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  macro,
}) => {
  const nodeRef = useRef(null);
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedIconType, setSelectedIconType] = useState(1);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);

  // Atualizar os estados quando a macro mudar
  React.useEffect(() => {
    if (macro) {
      setTitle(macro.name);
      setSelectedColor(macro.color);
      setSelectedIconType(macro.iconType || 1);
    } else {
      setTitle('');
      setSelectedColor(1);
      setSelectedIconType(1);
    }
  }, [macro]);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    const updatedMacro: Macro = {
      id: macro?.id || `macro-${Date.now()}`,
      name: title.trim(),
      color: selectedColor,
      iconType: selectedIconType,
      isRequired: macro?.isRequired || false,
      isSelected: macro?.isSelected || true,
    };

    onSave(updatedMacro);
    onClose();
  };

  const handleClose = () => {
    // Resetar para valores padrão
    setTitle('');
    setSelectedColor(1);
    setSelectedIconType(1);
    setColorDropdownOpen(false);
    setIconDropdownOpen(false);
    onClose();
  };

  return (
    <CSSTransition in={isOpen} timeout={100} classNames="modal" unmountOnExit nodeRef={nodeRef}>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Editar Macro"
        style={modalStyles}
      >
        <ModalContent>
          <ModalTitle>{macro ? 'Editar macro' : 'Nova macro'}</ModalTitle>

          <FormContainer>
            <FieldContainer>
              <FieldLabel>
                Título <Required>*</Required>
              </FieldLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escreva"
                maxLength={45}
                error={title.trim() === ''}
                helpText={title.trim() === '' ? 'Título é obrigatório' : ''}
                width="100%"
                icon={<GroupDescriptionIcon width={24} height={24} />}
              />
              <CharacterCount>Caracteres: {title.length}/45</CharacterCount>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Ícone da macro</FieldLabel>
              <DropdownsContainer>
                <ColorDropdown
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                  isOpen={colorDropdownOpen}
                  onToggle={() => setColorDropdownOpen(!colorDropdownOpen)}
                  onClose={() => setColorDropdownOpen(false)}
                />

                <IconDropdown
                  selectedIconType={selectedIconType}
                  selectedColor={selectedColor}
                  onIconChange={setSelectedIconType}
                  isOpen={iconDropdownOpen}
                  onToggle={() => setIconDropdownOpen(!iconDropdownOpen)}
                  onClose={() => setIconDropdownOpen(false)}
                />
              </DropdownsContainer>
            </FieldContainer>
          </FormContainer>

          <ModalActions>
            <MyButton variant="secondary" title="Cancelar" action={handleClose} />
            <MyButton variant="primary" title="Salvar" action={handleSave} />
          </ModalActions>
        </ModalContent>
      </Modal>
    </CSSTransition>
  );
};

const ModalContent = styled.div`
  padding: 32px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ModalTitle = styled.h2`
  color: #26333b;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.6px;
  margin: 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #26333b;
  line-height: 1.2;
`;

const Required = styled.span`
  color: #c13e4a;
`;

const CharacterCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #6b757c;
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
`;

const DropdownsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '0',
    borderRadius: '8px',
    width: '504px',
    minHeight: '400px',
    boxShadow: '0px 4px 8px 0px rgba(107, 117, 124, 0.32)',
  },
};

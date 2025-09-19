import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Input } from '@ftdata/ui';
import { MyButton } from 'src/components/MyButton';
import { GroupDescriptionIcon, ArrowDownCalender } from 'src/pages/MacrosReport/components/svg';
import { type Macro } from '../MacrosContainer/types';

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
  const colorDropdownRef = useRef<HTMLDivElement | null>(null);
  const iconDropdownRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#85919e');
  const [selectedIconType, setSelectedIconType] = useState('location');
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);

  const colorOptions = [
    { id: 'default', color: '#85919e', name: 'Padrão' },
    { id: 'blue', color: '#316ee8', name: 'Azul' },
    { id: 'green', color: '#19a675', name: 'Verde' },
    { id: 'red', color: '#e95f77', name: 'Vermelho' },
    { id: 'orange', color: '#d3771e', name: 'Laranja' },
    { id: 'purple', color: '#8B5CF6', name: 'Roxo' },
    { id: 'pink', color: '#EC4899', name: 'Rosa' },
    { id: 'yellow', color: '#F59E0B', name: 'Amarelo' },
    { id: 'gray', color: '#6B7280', name: 'Cinza' },
  ];

  const iconTypeOptions = [
    { id: 'location', name: 'Localização', icon: '📍' },
    { id: 'time', name: 'Tempo', icon: '⏰' },
    { id: 'status', name: 'Status', icon: '✅' },
    { id: 'work', name: 'Trabalho', icon: '🔧' },
    { id: 'transport', name: 'Transporte', icon: '🚛' },
    { id: 'security', name: 'Segurança', icon: '🔒' },
    { id: 'maintenance', name: 'Manutenção', icon: '⚙️' },
    { id: 'delivery', name: 'Entrega', icon: '📦' },
    { id: 'other', name: 'Outro', icon: '❓' },
  ];

  // Atualizar os estados quando a macro mudar
  React.useEffect(() => {
    if (macro) {
      setTitle(macro.name);
      setSelectedColor(macro.color);
      setSelectedIconType(macro.iconType || 'location');
    } else {
      setTitle('');
      setSelectedColor('#85919e');
      setSelectedIconType('location');
    }
  }, [macro]);

  // Fechar dropdowns somente quando clicar fora do respectivo container
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideColor = !!colorDropdownRef.current?.contains(target);
      const clickedInsideIcon = !!iconDropdownRef.current?.contains(target);

      if (colorDropdownOpen && !clickedInsideColor) setColorDropdownOpen(false);
      if (iconDropdownOpen && !clickedInsideIcon) setIconDropdownOpen(false);
    };

    if (colorDropdownOpen || iconDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [colorDropdownOpen, iconDropdownOpen]);

  const handleSave = () => {
    if (!title.trim()) return;

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
    setSelectedColor('#85919e');
    setSelectedIconType('location');
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
                width="100%"
                icon={<GroupDescriptionIcon width={24} height={24} />}
              />
              <CharacterCount>Caracteres: {title.length}/45</CharacterCount>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Ícone da macro</FieldLabel>
              <DropdownsContainer>
                {/* Dropdown de Cor */}
                <ColorDropdown ref={colorDropdownRef}>
                  <DropdownButton
                    onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                    isOpen={colorDropdownOpen}
                  >
                    <ColorPreview color={selectedColor} />
                    <DropdownArrow isOpen={colorDropdownOpen}>
                      <ArrowDownCalender width={16} height={16} />
                    </DropdownArrow>
                  </DropdownButton>

                  {colorDropdownOpen && (
                    <DropdownMenu>
                      {colorOptions.map((color) => (
                        <DropdownItem
                          key={color.id}
                          onClick={() => {
                            setSelectedColor(color.color);
                            setColorDropdownOpen(false);
                          }}
                          isSelected={selectedColor === color.color}
                        >
                          <ColorPreview color={color.color} />
                          {selectedColor === color.color && <CheckIcon>✓</CheckIcon>}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </ColorDropdown>

                {/* Dropdown de Tipo de Ícone */}
                <IconTypeDropdown ref={iconDropdownRef}>
                  <DropdownButton
                    onClick={() => setIconDropdownOpen(!iconDropdownOpen)}
                    isOpen={iconDropdownOpen}
                  >
                    <IconTypePreview backgroundColor={selectedColor}>
                      <IconTypeIcon>
                        {iconTypeOptions.find((icon) => icon.id === selectedIconType)?.icon || '📍'}
                      </IconTypeIcon>
                    </IconTypePreview>
                    <DropdownArrow isOpen={iconDropdownOpen}>
                      <ArrowDownCalender width={16} height={16} />
                    </DropdownArrow>
                  </DropdownButton>

                  {iconDropdownOpen && (
                    <DropdownMenu>
                      {iconTypeOptions.map((icon) => (
                        <DropdownItem
                          key={icon.id}
                          onClick={() => {
                            setSelectedIconType(icon.id);
                            setIconDropdownOpen(false);
                          }}
                          isSelected={selectedIconType === icon.id}
                        >
                          <IconTypePreview backgroundColor={'#3b485b'}>
                            <IconTypeIcon>{icon.icon}</IconTypeIcon>
                          </IconTypePreview>
                          {selectedIconType === icon.id && <CheckIcon>✓</CheckIcon>}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </IconTypeDropdown>
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

const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid ${({ isOpen }) => (isOpen ? '#316ee8' : '#e1e5e9')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;

  &:hover {
    background: #f1f3f4;
    border-color: #316ee8;
  }

  &:focus {
    outline: none;
    border-color: #316ee8;
    box-shadow: 0 0 0 2px rgba(49, 110, 232, 0.1);
  }
`;

const DropdownArrow = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b757c;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  width: 144px;
  padding: 16px;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
  overflow: visible;
  display: grid;
  grid-template-columns: repeat(3, 32px);
  grid-template-rows: repeat(3, 32px);
  gap: 8px;
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#f0f4ff' : 'transparent')};
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#e8f2ff' : '#f9fafb')};
  }
`;

const CheckIcon = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 10px;
  color: #316ee8;
  font-weight: bold;
  background: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownsContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const ColorDropdown = styled.div`
  position: relative;
`;

const IconTypeDropdown = styled.div`
  position: relative;
  flex: 1;
`;

const ColorPreview = styled.div<{ color: string }>`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  background: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const IconTypePreview = styled.div<{ backgroundColor?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: ${({ backgroundColor }) => backgroundColor ?? '#3b485b'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const IconTypeIcon = styled.span`
  font-size: 10px;
  color: white;
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

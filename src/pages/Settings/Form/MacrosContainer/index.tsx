import { type JSX, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox } from '@ftdata/ui';
import {
  DownIcon,
  AddCircleIcon,
  CadeadoIcon,
  SandwitchIcon,
  EditIcon,
  TrashIcon,
} from 'src/pages/MacrosReport/components/svg';
import { getIconById } from '../MacroEditModal/icons';
import { getColorById } from '../MacroEditModal/colorMapping';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import type { Macro, MacrosContainerProps } from './types';

export const MacrosContainer = ({
  maxMacros = 15,
  onMacrosChange,
  onEditMacro,
  onAddMacro,
  macros = [],
  hasError = false,
  errorMessage = '',
  isEditing = false,
}: MacrosContainerProps): JSX.Element => {
  const [middleMacros, setMiddleMacros] = useState<Macro[]>([]);

  // Macros estáticas (início e fim)
  const inicioMacro: Macro = {
    id: 'inicio-jornada',
    name: 'Início de jornada',
    color: 3, // Verde
    iconType: 1, // Ícone padrão para início
    isRequired: true,
    isSelected: true,
  };

  const fimMacro: Macro = {
    id: 'fim-jornada',
    name: 'Fim de jornada',
    color: 4, // Vermelho
    iconType: 36, // Ícone padrão para fim
    isRequired: true,
    isSelected: true,
  };

  // Sincronizar middleMacros com as macros recebidas via prop
  // Filtrar apenas as macros que não são estáticas (início e fim)
  useEffect(() => {
    const dynamicMacros = macros.filter(
      (macro) => macro.id !== 'inicio-jornada' && macro.id !== 'fim-jornada',
    );
    setMiddleMacros(dynamicMacros);
  }, [macros]);

  // Array completo para contagem - apenas as macros do meio
  const allMacros = middleMacros;

  // Estado para controlar o drag
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [macroToDelete, setMacroToDelete] = useState<string | null>(null);

  const selectedMacrosCount = [inicioMacro, ...allMacros, fimMacro].filter(
    (macro) => macro.isSelected,
  ).length;


  // Função para renderizar o ícone correto baseado no iconType
  const renderMacroIcon = (macro: Macro) => {
    if (macro.iconType) {
      return getIconById(macro.iconType, 16);
    }
    return <DownIcon />; // Fallback para o ícone padrão
  };

  // Rastrear movimento do mouse durante drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedIndex !== null) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (draggedIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [draggedIndex]);

  const handleMacroToggle = (macroId: string) => {
    const updatedMiddleMacros = middleMacros.map((macro) =>
      macro.id === macroId ? { ...macro, isSelected: !macro.isSelected } : macro,
    );
    setMiddleMacros(updatedMiddleMacros);
    onMacrosChange?.(updatedMiddleMacros);
  };

  const handleAddMacro = () => {
    onAddMacro?.();
  };

  const handleEditMacro = (macroId: string) => {
    const macro = middleMacros.find((m) => m.id === macroId);
    if (macro) {
      onEditMacro?.(macro);
    }
  };

  const handleDeleteMacro = (macroId: string) => {
    const macro = middleMacros.find((m) => m.id === macroId);
    if (macro?.isRequired) return; // Não permitir deletar macros obrigatórias

    setMacroToDelete(macroId);
    setShowDeleteModal(true);
  };

  const confirmDeleteMacro = () => {
    if (!macroToDelete) return;

    const updatedMiddleMacros = middleMacros.filter((macro) => macro.id !== macroToDelete);
    setMiddleMacros(updatedMiddleMacros);
    onMacrosChange?.(updatedMiddleMacros);
    setShowDeleteModal(false);
    setMacroToDelete(null);
  };

  // Funções de drag and drop nativo
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');

    // Calcular offset do mouse em relação ao elemento
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Só limpa se realmente saiu do elemento
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      setDragOffset(null);
      setMousePosition(null);
      return;
    }

    // Se for o mesmo item, não faz nada
    if (draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      setDragOffset(null);
      setMousePosition(null);
      return;
    }

    // Reordenar apenas as macros do meio
    const newMiddleMacros = Array.from(middleMacros);
    const [draggedItem] = newMiddleMacros.splice(draggedIndex, 1);

    // Inserir o item na nova posição
    newMiddleMacros.splice(dropIndex, 0, draggedItem);

    setMiddleMacros(newMiddleMacros);
    onMacrosChange?.(newMiddleMacros);

    setDraggedIndex(null);
    setDragOverIndex(null);
    setDragOffset(null);
    setMousePosition(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDragOffset(null);
    setMousePosition(null);
  };

  return (
    <Container>
      <MacrosHeader>
        <MacrosTitle>Selecione e ordene as macros para este grupo</MacrosTitle>
        <MacrosCount>
          {selectedMacrosCount}/{maxMacros}
        </MacrosCount>
      </MacrosHeader>
      
      {hasError && errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}

      <MacrosList>
        {/* Macro de início - estática */}
        <MacroItem canDrag={false}>
          <DragHandle>
            <CadeadoIcon width={24} height={24} />
          </DragHandle>
          <MacroTag color={getColorById(inicioMacro.color)}>
            {renderMacroIcon(inicioMacro)}
            {inicioMacro.name}
          </MacroTag>
          <MacroRequired>(Obrigatório)</MacroRequired>
        </MacroItem>

        {/* Macros do meio - com drag and drop nativo */}
        {middleMacros.length > 0 && (
          <MiddleMacrosContainer>
            {middleMacros.map((macro, index) => (
              <MacroItem
                key={macro.id}
                draggable={true}
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(e, index);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDragOver(e, index);
                }}
                onDragLeave={(e) => {
                  e.stopPropagation();
                  handleDragLeave(e);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDrop(e, index);
                }}
                onDragEnd={(e) => {
                  e.stopPropagation();
                  handleDragEnd();
                }}
                isDragging={draggedIndex === index}
                isDragOver={dragOverIndex === index}
                canDrag={true}
                style={{
                  opacity: draggedIndex === index ? 0.3 : 1,
                  transform: draggedIndex === index ? 'scale(0.95)' : 'none',
                }}
              >
                <DragHandle
                  onMouseDown={(e) => e.stopPropagation()}
                  onDragStart={(e) => e.stopPropagation()}
                >
                  <SandwitchIcon width={24} height={24} />
                </DragHandle>

                <Checkbox
                  checked={macro.isSelected}
                  label=""
                  onChange={() => handleMacroToggle(macro.id)}
                />

                <MacroTag color={getColorById(macro.color)}>
                  {renderMacroIcon(macro)}
                  {macro.name}
                </MacroTag>

                {!isEditing && (
                  <>
                    <DragHandle
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMacro(macro.id);
                      }}
                    >
                      <EditIcon width={24} height={24} />
                    </DragHandle>
                    <DragHandle
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMacro(macro.id);
                      }}
                    >
                      <TrashIcon width={24} height={24} />
                    </DragHandle>
                  </>
                )}
              </MacroItem>
            ))}
          </MiddleMacrosContainer>
        )}

        {/* Macro de fim - estática */}
        <MacroItem canDrag={false}>
          <DragHandle>
            <CadeadoIcon width={24} height={24} />
          </DragHandle>
          <MacroTag color={getColorById(fimMacro.color)}>
            {renderMacroIcon(fimMacro)}
            {fimMacro.name}
          </MacroTag>
          <MacroRequired>(Obrigatório)</MacroRequired>
        </MacroItem>
      </MacrosList>

      <AddMacroButton onClick={handleAddMacro}>
        <AddCircleIcon width={24} height={24} />
        Adicionar novo status
      </AddMacroButton>

      {/* Drag Ghost - elemento que segue o mouse */}
      {draggedIndex !== null && mousePosition && dragOffset && (
        <DragGhost
          style={{
            left: mousePosition.x - dragOffset.x,
            top: mousePosition.y - dragOffset.y,
          }}
        >
          <DragHandle>
            <SandwitchIcon width={24} height={24} />
          </DragHandle>
          <Checkbox
            checked={middleMacros[draggedIndex]?.isSelected || false}
            label=""
            onChange={() => {}}
          />
          <MacroTag color={getColorById(middleMacros[draggedIndex]?.color || 1)}>
            {middleMacros[draggedIndex] ? (
              renderMacroIcon(middleMacros[draggedIndex])
            ) : (
              <DownIcon />
            )}
            {middleMacros[draggedIndex]?.name || ''}
          </MacroTag>
          <DragHandle>
            <EditIcon width={24} height={24} />
          </DragHandle>
          <DragHandle>
            <TrashIcon width={24} height={24} />
          </DragHandle>
        </DragGhost>
      )}

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMacroToDelete(null);
        }}
        onConfirm={confirmDeleteMacro}
        macroName={middleMacros.find((m) => m.id === macroToDelete)?.name}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 32px;
  position: relative;
  overflow: visible;
`;

const MacrosHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;

const MacrosTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #26333b;
  white-space: nowrap;
  line-height: 1.2;
`;

const MacrosCount = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #6b757c;
  white-space: nowrap;
  line-height: 1.5;
`;

const MacrosList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

const MiddleMacrosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

const MacroItem = styled.div<{ isDragging?: boolean; isDragOver?: boolean; canDrag?: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 42px;
  padding: 8px 0;
  cursor: ${({ isDragging, canDrag }) => (isDragging ? 'grabbing' : canDrag ? 'grab' : 'default')};
  opacity: ${({ isDragging }) => (isDragging ? 0.8 : 1)};
  background: ${({ isDragging, isDragOver }) =>
    isDragging ? '#f0f4ff' : isDragOver ? '#e8f2ff' : 'transparent'};
  border-radius: 4px;
  transition: all 0.2s ease;
  box-shadow: ${({ isDragging }) => (isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : 'none')};
  border: ${({ isDragging, isDragOver }) =>
    isDragging ? '1px solid #316ee8' : isDragOver ? '1px solid #316ee8' : '1px solid transparent'};
  transform: ${({ isDragging }) => (isDragging ? 'scale(1.02)' : 'none')};

  &:hover {
    background: ${({ canDrag }) => (canDrag ? '#f5f5f5' : 'transparent')};
  }
`;

const DragHandle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`;

const MacroTag = styled.div<{ color: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 4px 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
  line-height: 1.5;
`;

const MacroRequired = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #6b757c;
  white-space: nowrap;
  line-height: 1.5;
`;

const AddMacroButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  background: none;
  border: none;
  cursor: pointer;
  color: #316ee8;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.5;
`;

const DragGhost = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  min-height: 42px;
  padding: 8px 12px;
  background: rgba(240, 244, 255, 0.95);
  border: 1px solid #316ee8;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  pointer-events: none;
  transform: rotate(2deg);
  opacity: 0.9;
`;

const ErrorMessage = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #c13e4a;
  margin-top: 4px;
  line-height: 1.5;
`;

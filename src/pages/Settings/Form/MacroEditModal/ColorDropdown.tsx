import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowDownCalender } from 'src/pages/MacrosReport/components/svg';
import { colorOptions, getColorById } from './colorMapping';

interface ColorDropdownProps {
  selectedColor: number;
  onColorChange: (colorId: number) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ColorDropdown: React.FC<ColorDropdownProps> = ({
  selectedColor,
  onColorChange,
  isOpen,
  onToggle,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInside = !!dropdownRef.current?.contains(target);

      if (isOpen && !clickedInside) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleColorSelect = (colorId: number) => {
    onColorChange(colorId);
    onClose();
  };

  return (
    <ColorDropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={onToggle} isOpen={isOpen}>
        <ColorPreview color={getColorById(selectedColor)} />
        <DropdownArrow isOpen={isOpen}>
          <ArrowDownCalender width={16} height={16} />
        </DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          {colorOptions.map((color) => (
            <DropdownItem
              key={color.id}
              onClick={() => handleColorSelect(color.id)}
              isSelected={selectedColor === color.id}
            >
              <ColorPreview color={color.color} />
              {selectedColor === color.id && <CheckIcon>✓</CheckIcon>}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </ColorDropdownContainer>
  );
};

const ColorDropdownContainer = styled.div`
  position: relative;
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

const ColorPreview = styled.div<{ color: string }>`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  background: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

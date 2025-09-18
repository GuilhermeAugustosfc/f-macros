import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RouteIcon, ArrowDownCalender } from 'src/pages/MacrosReport/components/svg';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

const columnHelper = createColumnHelper<any>();

const DivValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  cursor: pointer;
  svg,
  path {
    stroke: white;
  }
`;

const CellValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  svg,
  path {
    stroke: #26333b;
  }
`;

const MacroButton = styled.button<{ color: string }>`
  background: ${({ color }) => color};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
    stroke: white;
  }
`;

const DateTimeCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  font-size: 12px;
  line-height: 1.2;
`;

const AddressCell = styled.div`
  font-size: 12px;
  color: #26333b;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0066cc;
  }
`;

const DriverCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #26333b;
`;

const EditableCell = styled.div<{ isEditable: boolean }>`
  position: relative;
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : 'default')};
`;

const EditIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #316ee8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingSelect = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999999;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(107, 117, 124, 0.32);
  max-height: 218px;
  overflow-x: clip;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  padding: 8px 0;
`;

const SelectOption = styled.button<{ isSelected?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: clip;
  padding: 8px 16px;
  width: 100%;
  text-align: left;

  &:hover {
    background: #f8f9fa;
  }
`;

const OptionMacroButton = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  justify-content: center;
  width: max-content;

  svg {
    width: 18px;
    height: 18px;
    stroke: white;
    flex-shrink: 0;
  }
`;

const OptionText = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: white;
  white-space: nowrap;
  margin: 0;
`;

const HoverArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${EditableCell}:hover & {
    opacity: 1;
  }
`;

const DatePickerContainer = styled.div`
  /* position: absolute; */
  max-width: 0px;
  max-height: 0px;
  .rs-picker-toggle-wrapper {
    opacity: 0;
    max-width: 0px;
    max-height: 0px;
  }
`;

// Componente para célula editável de data
const EditableDateCell = ({
  value,
  onSave,
  isEdited,
}: {
  value: any;
  onSave: (newValue: any) => void;
  isEdited: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDateChange = (newDate: Date | null) => {
    if (!newDate) return;

    const newValue = {
      date: newDate.toLocaleDateString('pt-BR'),
      time: newDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    setEditValue(newValue);
    onSave(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <EditableCell
      isEditable={true}
      onClick={() => setIsEditing(true)}
      // onMouseLeave={() => setIsEditing(false)}
    >
      <DateTimeCell>
        <div>{editValue.date}</div>
        <div>{editValue.time}</div>
      </DateTimeCell>
      <HoverArrow>
        <ArrowDownCalender />
      </HoverArrow>
      {isEdited && <EditIcon />}
      {isEditing && (
        <DatePickerContainer>
          <DatePicker
            format="dd/MM/yyyy HH:mm:ss"
            onChange={handleDateChange}
            onClose={handleCancel}
            defaultValue={new Date()}
            placement="bottomStart"
            cleanable={false}
            editable={false}
            open={isEditing}
            container={() => document.body}
          />
        </DatePickerContainer>
      )}
    </EditableCell>
  );
};

// Componente para célula editável de macro
const EditableMacroCell = ({
  value,
  onSave,
  isEdited,
}: {
  value: any;
  onSave: (newValue: any) => void;
  isEdited: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const macroOptions = [
    {
      value: 'inicio',
      name: 'Início de jornada',
      color: '#19A675', // Visual/Green
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: 'aguardando',
      name: 'Aguardando mudas',
      color: '#D3771E', // Visual/Yellow
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      value: 'pulverizando',
      name: 'Pulverizando lavoura',
      color: '#6390F5', // Visual/Blue
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: 'plantando',
      name: 'Plantando mudas',
      color: '#3A99D5', // Visual/Cyan
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 13L12 8L17 13M12 8V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: 'fim',
      name: 'Fim de jornada',
      color: '#E95F77', // Visual/Red
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 9L15 15M15 9L9 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const handleOptionClick = (selectedOption: any) => {
    const newValue = {
      name: selectedOption.name,
      color: selectedOption.color,
      icon: selectedOption.icon,
    };
    setEditValue(newValue);
    onSave(newValue);
    setIsEditing(false);
  };

  const handleCellClick = () => {
    setIsEditing(!isEditing);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isEditing]);

  return (
    <EditableCell ref={selectRef} isEditable={true} onClick={handleCellClick}>
      <MacroButton color={editValue.color}>
        {editValue.icon}
        {editValue.name}
      </MacroButton>
      {isEdited && <EditIcon />}
      <FloatingSelect isOpen={isEditing}>
        {macroOptions.map((option) => (
          <SelectOption
            key={option.value}
            onClick={() => handleOptionClick(option)}
            isSelected={editValue.value === option.value}
          >
            <OptionMacroButton color={option.color}>
              {option.icon}
              <OptionText>{option.name}</OptionText>
            </OptionMacroButton>
          </SelectOption>
        ))}
      </FloatingSelect>
    </EditableCell>
  );
};

export const ColumnsFunction = (): ColumnDef<any>[] => {
  const [editedCells, setEditedCells] = useState<Record<string, boolean>>({});

  const handleSave = (rowId: string, field: string, newValue: any) => {
    // Aqui você pode implementar a lógica para salvar no backend
    console.log(`Salvando ${field} para linha ${rowId}:`, newValue);
    setEditedCells((prev) => ({ ...prev, [`${rowId}-${field}`]: true }));
  };

  const allColumns = [
    columnHelper.accessor('macro', {
      header: () => <span>Macros</span>,
      cell: (info) => {
        const macro = info.getValue();
        const rowId = info.row.id;
        const isEdited = editedCells[`${rowId}-macro`];

        return (
          <EditableMacroCell
            value={macro}
            onSave={(newValue) => handleSave(rowId, 'macro', newValue)}
            isEdited={isEdited}
          />
        );
      },
    }),
    columnHelper.accessor('inicio', {
      header: () => (
        <DivValue>
          <span>Início</span>
        </DivValue>
      ),
      cell: (info) => {
        const value = info.getValue();
        const rowId = info.row.id;
        const isEdited = editedCells[`${rowId}-inicio`];

        return (
          <EditableDateCell
            value={value}
            onSave={(newValue) => handleSave(rowId, 'inicio', newValue)}
            isEdited={isEdited}
          />
        );
      },
    }),
    columnHelper.accessor('fim', {
      header: () => (
        <DivValue>
          <span>Fim</span>
        </DivValue>
      ),
      cell: (info) => {
        const value = info.getValue();
        const rowId = info.row.id;
        const isEdited = editedCells[`${rowId}-fim`];

        return (
          <EditableDateCell
            value={value}
            onSave={(newValue) => handleSave(rowId, 'fim', newValue)}
            isEdited={isEdited}
          />
        );
      },
    }),
    columnHelper.accessor('duracao', {
      header: () => (
        <DivValue>
          <span>Duração</span>
        </DivValue>
      ),
      cell: (info) => <CellValue>{info.getValue()}</CellValue>,
    }),
    columnHelper.accessor('endereco', {
      header: () => (
        <DivValue>
          <span>Endereço</span>
        </DivValue>
      ),
      cell: (info) => <AddressCell>{info.getValue()}</AddressCell>,
    }),
    columnHelper.accessor('ponto_referencia', {
      header: () => (
        <DivValue>
          <span>Ponto de Referência</span>
        </DivValue>
      ),
      cell: (info) => <CellValue>{info.getValue()}</CellValue>,
    }),
    columnHelper.accessor('rota', {
      header: () => (
        <DivValue>
          <span>Rota</span>
        </DivValue>
      ),
      cell: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RouteIcon width={20} height={20} />
        </div>
      ),
    }),
    columnHelper.accessor('motorista', {
      header: () => (
        <DivValue>
          <span>Motorista</span>
        </DivValue>
      ),
      cell: (info) => (
        <DriverCell>
          <span>{info.getValue().name}</span>
        </DriverCell>
      ),
    }),
  ];

  return allColumns as ColumnDef<any>[];
};

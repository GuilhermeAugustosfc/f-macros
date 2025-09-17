import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RouteIcon, ArrowDownCalender } from 'src/pages/MacrosReport/components/svg';
import { CustomSelect as Select } from '@ftdata/ui';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import styled from 'styled-components';
import { useState } from 'react';

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
  z-index: 9999;
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

const DatePickerContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 99999;
  background: white;
  border: 1px solid #d5d8da;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 280px;
  z-index: 99999;
  .rs-picker-date {
    width: 100%;
    z-index: 99999;
  }

  .rs-picker-date-menu {
    box-shadow: none;
    border: none;
    z-index: 99999;
  }

  .rs-picker-dropdown {
    z-index: 99999 !important;
  }

  .rs-picker-dropdown-menu {
    z-index: 99999 !important;
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99999;
  background: white;
  border: 1px solid #d5d8da;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

  const handleSave = (newDate: Date | null) => {
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

  return (
    <EditableCell
      isEditable={true}
      onClick={() => setIsEditing(true)}
      onMouseLeave={() => setIsEditing(false)}
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
            onChange={handleSave}
            onClose={() => setIsEditing(false)}
            defaultValue={new Date()}
            oneTap
            placement="bottomStart"
            cleanable={false}
            editable={false}
            style={{ zIndex: 99999 }}
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
  const [selected, setSelected] = useState<any>(null);

  const macroOptions = [
    { value: 'plantando', label: 'Plantando Mudas', color: '#3A99D5', icon: '🌱' },
    { value: 'aguardando', label: 'Aguardando Mudas', color: '#D3771E', icon: '⏳' },
    { value: 'colhendo', label: 'Colhendo Frutos', color: '#19A675', icon: '🍎' },
    { value: 'transito', label: 'Em Trânsito', color: '#E95F77', icon: '🚛' },
  ];

  const handleSave = (selectedOption: any) => {
    const newValue = {
      name: selectedOption.label,
      color: selectedOption.color,
      icon: selectedOption.icon,
    };
    setEditValue(newValue);
    onSave(newValue);
    setIsEditing(false);
  };

  const t = (key: string) => key; // Mock translation function

  return (
    <EditableCell isEditable={true} onClick={() => setIsEditing(true)}>
      <MacroButton color={editValue.color}>
        {editValue.icon}
        {editValue.name}
      </MacroButton>
      {isEdited && <EditIcon />}
      {isEditing && (
        <SelectContainer>
          <Select
            t={t}
            options={macroOptions}
            selected={selected}
            setSelected={setSelected}
            placeholder="Selecione uma macro"
            onChange={handleSave}
          />
        </SelectContainer>
      )}
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

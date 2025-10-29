import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RouteIcon, ArrowDownCalender } from 'src/pages/MacrosReport/components/svg';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import styled from 'styled-components';
import { useState } from 'react';
import { updateReport } from 'src/pages/MacrosReport/requets';

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
  rowData,
}: {
  value: any;
  onSave: (newValue: any) => void;
  isEdited: boolean;
  rowData: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDateChange = async (newDate: Date | null) => {
    if (!newDate) return;

    const newValue = {
      date: newDate.toLocaleDateString('pt-BR'),
      time: newDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    // Formatar valores para envio
    const oldValueFormatted = `${editValue.date} ${editValue.time}`;
    const newValueFormatted = `${newValue.date} ${newValue.time}`;

    // Determinar a descrição da macro
    const macroUpdated = rowData.desc_macro_chave || rowData.desc_macro || '';

    try {
      // Chamar o endpoint para atualizar
      await updateReport(rowData.id, {
        macro_updated: macroUpdated,
        old_value: oldValueFormatted,
        new_value: newValueFormatted,
      });

      setEditValue(newValue);
      onSave(newValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      // Aqui você pode adicionar um toast de erro se necessário
    }
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

        return (
          <MacroButton color={macro.color}>
            {macro.icon}
            {macro.name}
          </MacroButton>
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
        const rowData = info.row.original;
        const isEdited = editedCells[`${rowId}-inicio`];

        return (
          <EditableDateCell
            value={value}
            onSave={(newValue) => handleSave(rowId, 'inicio', newValue)}
            isEdited={isEdited}
            rowData={rowData}
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
        const rowData = info.row.original;
        const isEdited = editedCells[`${rowId}-fim`];

        return (
          <EditableDateCell
            value={value}
            onSave={(newValue) => handleSave(rowId, 'fim', newValue)}
            isEdited={isEdited}
            rowData={rowData}
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

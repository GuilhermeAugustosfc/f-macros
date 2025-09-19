import { type JSX, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, CustomSelect as Select, Collapse } from '@ftdata/ui';
import {
  ClientIcon,
  VehicleIcon,
  GroupDescriptionIcon,
} from 'src/pages/MacrosReport/components/svg';
import { useTranslation } from '@ftdata/core';
import { MacrosContainer } from './MacrosContainer';
import { type Macro } from './MacrosContainer/types';
import { MacroEditModal } from './MacroEditModal';

export const Form = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [isMacrosOpen, setIsMacrosOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMacro, setEditingMacro] = useState<Macro | undefined>();
  const [macros, setMacros] = useState<Macro[]>([]);

  const handleMacrosChange = (updatedMacros: Macro[]) => {
    setMacros(updatedMacros);
    console.log('Macros atualizadas:', updatedMacros);
  };

  const handleEditMacro = (macro: Macro) => {
    setEditingMacro(macro);
    setIsModalOpen(true);
  };

  const handleAddMacro = () => {
    setEditingMacro(undefined);
    setIsModalOpen(true);
  };

  const handleSaveMacro = (updatedMacro: Macro) => {
    if (editingMacro) {
      // Editando macro existente
      const updatedMacros = macros.map((macro) =>
        macro.id === updatedMacro.id ? updatedMacro : macro,
      );
      setMacros(updatedMacros);
    } else {
      // Adicionando nova macro
      const updatedMacros = [...macros, updatedMacro];
      setMacros(updatedMacros);
    }
    setIsModalOpen(false);
    setEditingMacro(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMacro(undefined);
  };

  return (
    <Container>
      <TitleSection>
        <TitleContainer>
          <Title>Criar Grupo de Macros</Title>
          <Subtitle>Cadastre um novo grupo de macros para sua frota</Subtitle>
        </TitleContainer>
      </TitleSection>

      <FormContainer>
        <Collapse
          margin="24px"
          title="Informações"
          showCollapse={isInfoOpen}
          handleChange={() => setIsInfoOpen(!isInfoOpen)}
        >
          <InfoFieldsContainer>
            <SensorTypeContainer>
              <FieldWrapper>
                <FieldLabel>
                  Título do Grupo de Macros <Required>*</Required>
                </FieldLabel>
                <Input
                  placeholder="Fazenda 4 Estações"
                  width="100%"
                  icon={<GroupDescriptionIcon width={24} height={24} />}
                />
              </FieldWrapper>

              <Select
                label="Cliente"
                placeholder="Selecionar"
                icon={<ClientIcon width={24} height={24} />}
                width="100%"
                options={[
                  { label: 'Cliente 1', value: '1' },
                  { label: 'Cliente 2', value: '2' },
                ]}
                required
                t={t}
                selected={selectedClient}
                setSelected={setSelectedClient}
              />

              <Select
                label="Veículo"
                placeholder="Selecionar"
                icon={<VehicleIcon width={24} height={24} />}
                width="100%"
                options={[
                  { label: 'Veículo 1', value: '1' },
                  { label: 'Veículo 2', value: '2' },
                ]}
                required
                t={t}
                selected={selectedVehicle}
                setSelected={setSelectedVehicle}
              />
            </SensorTypeContainer>
          </InfoFieldsContainer>
        </Collapse>

        <Collapse
          title="Definir as macros do grupo"
          showCollapse={isMacrosOpen}
          handleChange={() => setIsMacrosOpen(!isMacrosOpen)}
          margin="24px"
        >
          <MacrosContainer
            maxMacros={15}
            onMacrosChange={handleMacrosChange}
            onEditMacro={handleEditMacro}
            onAddMacro={handleAddMacro}
          />
        </Collapse>

        <ActionButtons>
          <Button variant="primary">Salvar</Button>
          <Button variant="secondary">Cancelar</Button>
        </ActionButtons>
      </FormContainer>

      <MacroEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMacro}
        macro={editingMacro}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleSection = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 834px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #d5d8da;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: max-content;
  line-height: 1.2;
  place-items: start;
  position: relative;
  flex-shrink: 0;
`;

const Title = styled.p`
  grid-area: 1 / 1;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin: 0;
  position: relative;
  color: #26333b;
  font-size: 20px;
  letter-spacing: -0.6px;
  width: 427.246px;
`;

const Subtitle = styled.p`
  grid-area: 1 / 1;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin: 28px 0 0 0;
  position: relative;
  color: #6b757c;
  font-size: 14px;
  white-space: nowrap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 29px 24px 32px 24px;
  width: 100%;
`;

const InfoFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 32px;
`;

const SensorTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  div {
    width: 100%;
    flex: 1;
    justify-content: space-between;
    display: flex;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const FieldLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #26333b;
  white-space: nowrap;
  line-height: 1.2;
`;

const Required = styled.span`
  color: #c13e4a;
`;

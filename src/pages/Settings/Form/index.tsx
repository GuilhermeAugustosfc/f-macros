import { type JSX, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, CustomSelect as Select, Collapse, MultiSelect } from '@ftdata/ui';
import {
  ClientIcon,
  GroupDescriptionIcon,
} from 'src/pages/MacrosReport/components/svg';
import { useTranslation } from '@ftdata/core';
import { useQuery } from 'react-query';
import { MacrosContainer } from './MacrosContainer';
import { type Macro } from './MacrosContainer/types';
import { MacroEditModal } from './MacroEditModal';
import { getCustomers, getVehicles } from 'src/pages/MacrosReport/requets';
import { createMacroGroup, getMacroGroupById, updateMacroGroup } from '../requets';
import { type ICustomSelectOption } from '@ftdata/ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from 'src/contexts/toast';

export const Form = (): JSX.Element => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const isEditing = Boolean(editId);
  
  const [selectedClient, setSelectedClient] = useState<ICustomSelectOption | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<ICustomSelectOption[]>([]);
  const [groupTitle, setGroupTitle] = useState<string>('');
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [isMacrosOpen, setIsMacrosOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMacro, setEditingMacro] = useState<Macro | undefined>();
  const [macros, setMacros] = useState<Macro[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    groupTitle: false,
    client: false,
    vehicle: false,
    macros: false
  });

  // Query para buscar clientes
  const { data: clientesData } = useQuery(
    ['clients'],
    () => getCustomers().then((res) => res.data.data),
    {
      staleTime: 1000 * 60 * 60 * 2, // 2 horas
      refetchOnWindowFocus: false,
      select: (data) =>
        data.map(
          (cliente): ICustomSelectOption => ({
            label: cliente.client_description,
            value: cliente.client_id.toString(),
          }),
        ),
    },
  );

  // Query para buscar veículos baseado no cliente selecionado
  const { data: veiculosData } = useQuery(
    ['vehicles', selectedClient?.value],
    () => getVehicles({ customer_id: Number(selectedClient?.value) }),
    {
      staleTime: 1000 * 60 * 30, // 30 minutos
      enabled: Boolean(selectedClient?.value),
      refetchOnWindowFocus: false,
      select: (data) =>
        data.data.data.map(
          (veiculo): ICustomSelectOption => ({
            value: String(veiculo.ativo_id),
            label: `${veiculo.plate} - ${veiculo.ativo}`,
          }),
        ),
    },
  );

  // Query para buscar dados do grupo quando estiver editando
  const { data: macroGroupData, isLoading: isLoadingGroup } = useQuery(
    ['macroGroup', editId],
    () => getMacroGroupById(Number(editId)),
    {
      enabled: Boolean(editId),
      refetchOnWindowFocus: false,
    },
  );

  // Reset veículo quando cliente muda
  useEffect(() => {
    setSelectedVehicle([]);
  }, [selectedClient]);

  // Carregar dados quando estiver editando
  useEffect(() => {
    if (macroGroupData && isEditing) {
      // Preencher título
      setGroupTitle(macroGroupData.description);
      
      // Preencher cliente
      const clientOption = clientesData?.find(
        client => client.label === macroGroupData.client_description
      );
      if (clientOption) {
        setSelectedClient(clientOption);
      }
      
      // Preencher veículos
      const vehicleOptions = macroGroupData.ativos_ids.map(ativo => ({
        value: String(ativo.ativo_id),
        label: `${ativo.plate} - ${ativo.ativo_desc}`,
      }));
      setSelectedVehicle(vehicleOptions);
      
      // Preencher macros
      const macrosData = macroGroupData.macros.map((macro, index) => ({
        id: `macro-${index}`,
        name: macro.description,
        color: macro.macro_color_id,
        iconType: macro.macro_icone_id,
        isRequired: Boolean(macro.default_macro),
        isSelected: false,
      }));
      setMacros(macrosData);
    }
  }, [macroGroupData, isEditing, clientesData]);

  // Função para limpar erros quando o usuário interage
  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleMacrosChange = (updatedMacros: Macro[]) => {
    setMacros(updatedMacros);
    clearError('macros');
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
      // Editando macro existente - atualizar na lista
      const updatedMacros = macros.map((macro) =>
        macro.id === updatedMacro.id ? updatedMacro : macro,
      );
      setMacros(updatedMacros);
    } else {
      // Adicionando nova macro - adicionar na lista
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

  const handleSave = async () => {
    try {
      // Resetar erros
      setErrors({
        groupTitle: false,
        client: false,
        vehicle: false,
        macros: false
      });

      // Validações básicas
      const hasGroupTitleError = !groupTitle.trim();
      const hasClientError = !selectedClient;
      const hasVehicleError = selectedVehicle.length === 0;
      const hasMacrosError = macros.length === 0;

      // Se há erros, atualizar estados e retornar
      if (hasGroupTitleError || hasClientError || hasVehicleError || hasMacrosError) {
        setErrors({
          groupTitle: hasGroupTitleError,
          client: hasClientError,
          vehicle: hasVehicleError,
          macros: hasMacrosError
        });
        return;
      }

      setIsLoading(true);

      // Mapear dados para o formato da API
      const requestData = {
        description: groupTitle.trim(),
        customer_id: Number(selectedClient.value),
        ativos_ids: selectedVehicle.map(vehicle => ({
          ativo_id: Number(vehicle.value)
        })),
        macros: macros.map(macro => ({
          description: macro.name,
          macro_color_id: macro.color, // ID numérico da cor (1-9)
          macro_icone_id: macro.iconType || 1 // ID numérico do ícone (1-36)
        }))
      };

      console.log('Dados a serem enviados:', requestData);

      // Fazer a requisição (create ou update)
      if (isEditing && editId) {
        await updateMacroGroup(Number(editId), requestData);
        showToast({
          title: 'Sucesso',
          message: 'Grupo de macros atualizado com sucesso!',
          type: 'success'
        });
      } else {
        await createMacroGroup(requestData);
        showToast({
          title: 'Sucesso',
          message: 'Grupo de macros criado com sucesso!',
          type: 'success'
        });
      }
      
      // Navegar de volta para a lista
      navigate('/settings');

    } catch (error) {
      console.error('Erro ao salvar grupo de macros:', error);
      showToast({
        title: 'Erro',
        message: 'Erro ao salvar grupo de macros. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    navigate('/settings');
  };

  // Mostrar loading quando estiver carregando dados para edição
  if (isEditing && isLoadingGroup) {
    return (
      <Container>
        <TitleSection>
          <TitleContainer>
            <Title>Carregando...</Title>
            <Subtitle>Buscando dados do grupo de macros</Subtitle>
          </TitleContainer>
        </TitleSection>
      </Container>
    );
  }

  return (
    <Container>
      <TitleSection>
        <TitleContainer>
          <Title>{isEditing ? 'Editar Grupo de Macros' : 'Criar Grupo de Macros'}</Title>
          <Subtitle>
            {isEditing ? 'Edite as informações do grupo de macros' : 'Cadastre um novo grupo de macros para sua frota'}
          </Subtitle>
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
                  value={groupTitle}
                  onChange={(e) => {
                    setGroupTitle(e.target.value);
                    clearError('groupTitle');
                  }}
                  error={errors.groupTitle}
                  helpText={errors.groupTitle ? 'Título é obrigatório' : ''}
                />
              </FieldWrapper>

              <Select
                label="Cliente"
                placeholder="Selecionar"
                icon={<ClientIcon width={24} height={24} />}
                width="100%"
                options={clientesData ?? []}
                required
                t={t}
                selected={selectedClient}
                setSelected={(client) => {
                  setSelectedClient(client);
                  clearError('client');
                }}
                isError={errors.client}
                helpText={errors.client ? 'Cliente é obrigatório' : ''}
                disabled={isEditing}
              />

              <MultiSelect
                label="Veículo"
                placeholder="Selecionar"
                width="100%"
                value={selectedVehicle}
                options={veiculosData ?? []}
                onChangeItems={(selectedOptions: ICustomSelectOption[]) => {
                  setSelectedVehicle(selectedOptions);
                  clearError('vehicle');
                }}
                required
                translation={t}
                selectAll
                disabled={!selectedClient}
                isError={errors.vehicle}
                helpText={errors.vehicle ? 'Selecione pelo menos um veículo' : ''}
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
            macros={macros}
            onMacrosChange={handleMacrosChange}
            onEditMacro={handleEditMacro}
            onAddMacro={handleAddMacro}
            hasError={errors.macros}
            errorMessage={errors.macros ? 'Adicione pelo menos uma macro' : ''}
            isEditing={isEditing}
          />
        </Collapse>

        <ActionButtons>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button variant="secondary" disabled={isLoading} onClick={handleCancel}>Cancelar</Button>
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
  > div {
    width: 100%;
    flex: 1;
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

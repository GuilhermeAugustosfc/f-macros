import { type JSX, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Input, CustomSelect as Select, Collapse } from '@ftdata/ui';
import ReactSelect from 'react-select';
import { ClientIcon, GroupDescriptionIcon } from 'src/pages/MacrosReport/components/svg';
import { useTranslation } from '@ftdata/core';
import { useQuery } from 'react-query';
import { MacrosContainer } from './MacrosContainer';
import { type Macro } from './MacrosContainer/types';
import { MacroEditModal } from './MacroEditModal';
import { getCustomers, getVehicles } from 'src/pages/MacrosReport/requets';
import {
  createMacroGroup,
  getMacroGroupById,
  updateMacroGroup,
  type UpdateMacroGroupRequest,
  type CreateMacroGroupRequest,
} from '../requets';
import { type ICustomSelectOption } from '@ftdata/ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from 'src/contexts/toast';
import { getColorById, getColorIdByHex } from './MacroEditModal/colorMapping';

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
    macros: false,
  });

  // Estados para rastrear valores originais (para detectar alterações)
  const [originalVehicles, setOriginalVehicles] = useState<ICustomSelectOption[]>([]);
  const [originalMacros, setOriginalMacros] = useState<Macro[]>([]);

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
            label: cliente.customer_desc,
            value: cliente.customer_id.toString(),
          }),
        ),
    },
  );

  // Query para buscar veículos baseado no cliente selecionado
  const { data: veiculosData } = useQuery(
    ['vehicles', selectedClient?.value],
    () => getVehicles({ cli_id: Number(selectedClient?.value) }),
    {
      staleTime: 1000 * 60 * 30, // 30 minutos
      enabled: Boolean(selectedClient?.value),
      refetchOnWindowFocus: false,
      select: (data) =>
        data.data.data.map(
          (veiculo): ICustomSelectOption => ({
            value: String(veiculo.ativo_id),
            label: `${veiculo.plate} - ${veiculo.ativo || veiculo.ativo_desc}`,
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

  useEffect(() => {
    if (!isEditing) {
      setSelectedVehicle([]);
    }
  }, [selectedClient, isEditing]);

  useEffect(() => {
    if (macroGroupData && isEditing) {
      setGroupTitle(macroGroupData.description);

      const clientOption = clientesData?.find(
        (client) => client.label === macroGroupData.client_description,
      );
      if (clientOption) {
        setSelectedClient(clientOption);
      }

      const vehicleOptions = macroGroupData.ativos_ids.map((ativo) => ({
        value: String(ativo.ativo_id),
        label: `${ativo.plate} - ${ativo.ativo_desc}`,
      }));
      setSelectedVehicle(vehicleOptions);
      setOriginalVehicles(vehicleOptions);

      const macrosData = macroGroupData.macros
        .filter((macro) => !macro.default_macro)
        .map((macro, index) => ({
          id: `macro-${index}`,
          name: macro.description,
          color: getColorIdByHex(macro.macro_color_id),
          iconType: macro.macro_icone_id,
          isRequired: Boolean(macro.default_macro),
          isSelected: false,
        }));
      setMacros(macrosData);
      setOriginalMacros(macrosData);
    }
  }, [macroGroupData, isEditing, clientesData]);

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
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
      const updatedMacros = macros.map((macro) =>
        macro.id === updatedMacro.id ? { ...updatedMacro, position: macro.position } : macro,
      );
      setMacros(updatedMacros);
    } else {
      const newPosition = macros.length + 1;
      const newMacro = { ...updatedMacro, position: newPosition };
      const updatedMacros = [...macros, newMacro];
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
      setErrors({
        groupTitle: false,
        client: false,
        vehicle: false,
        macros: false,
      });

      const hasGroupTitleError = !groupTitle.trim();
      const hasClientError = !selectedClient;
      const hasVehicleError = selectedVehicle.length === 0;
      const hasMacrosError = macros.length === 0;

      if (hasGroupTitleError || hasClientError || hasVehicleError || hasMacrosError) {
        setErrors({
          groupTitle: hasGroupTitleError,
          client: hasClientError,
          vehicle: hasVehicleError,
          macros: hasMacrosError,
        });
        return;
      }

      setIsLoading(true);

      if (isEditing && editId) {
        const vehiclesChanged =
          JSON.stringify(selectedVehicle.map((v) => v.value).sort()) !==
          JSON.stringify(originalVehicles.map((v) => v.value).sort());

        const macrosChanged =
          JSON.stringify(
            macros.map((m) => ({
              name: m.name,
              color: m.color,
              iconType: m.iconType,
              position: m.position,
            })),
          ) !==
          JSON.stringify(
            originalMacros.map((m) => ({
              name: m.name,
              color: m.color,
              iconType: m.iconType,
              position: m.position,
            })),
          );

        const updateData: UpdateMacroGroupRequest = {
          description: groupTitle.trim(),
          customer_id: Number(selectedClient.value),
          ...(vehiclesChanged && {
            ativos_ids: selectedVehicle.map((vehicle) => ({
              ativo_id: Number(vehicle.value),
            })),
          }),
          ...(macrosChanged && {
            macros: macros.map((macro, index) => ({
              ...(macro.macroId ? { id: macro.macroId } : {}),
              description: macro.name,
              macro_color_id: getColorById(macro.color),
              macro_icone_id: macro.iconType || 1,
              position: macro.position ?? index + 1,
            })),
          }),
        };

        await updateMacroGroup(Number(editId), updateData);
        showToast({
          title: t('success'),
          message: t('macro_group_updated_successfully'),
          type: 'success',
        });
      } else {
        const createData: CreateMacroGroupRequest = {
          description: groupTitle.trim(),
          customer_id: Number(selectedClient.value),
          ativos_ids: selectedVehicle.map((vehicle) => ({
            ativo_id: Number(vehicle.value),
          })),
          macros: macros.map((macro, index) => ({
            description: macro.name,
            macro_color_id: getColorById(macro.color),
            macro_icone_id: macro.iconType || 1,
            position: macro.position ?? index + 1,
          })),
        };

        await createMacroGroup(createData);
        showToast({
          title: t('success'),
          message: t('macro_group_created_successfully'),
          type: 'success',
        });
      }

      navigate('/settings');
    } catch (error) {
      showToast({
        title: t('error'),
        message: t('error_saving_macro_group'),
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(veiculosData);

  const handleCancel = () => {
    navigate('/settings');
  };

  if (isEditing && isLoadingGroup) {
    return (
      <Container>
        <TitleSection>
          <TitleContainer>
            <Title>{t('loading')}...</Title>
            <Subtitle>{t('fetching_macro_group_data')}</Subtitle>
          </TitleContainer>
        </TitleSection>
      </Container>
    );
  }

  return (
    <Container>
      <TitleSection>
        <TitleContainer>
          <Title>{isEditing ? t('edit_macro_group') : t('create_macro_group')}</Title>
          <Subtitle>
            {isEditing ? t('edit_macro_group_info') : t('create_macro_group_description')}
          </Subtitle>
        </TitleContainer>
      </TitleSection>

      <FormContainer>
        <Collapse
          margin="24px"
          title={t('information')}
          showCollapse={isInfoOpen}
          handleChange={() => setIsInfoOpen(!isInfoOpen)}
        >
          <InfoFieldsContainer>
            <ContainerFieldMacros>
              <FieldWrapper>
                <FieldLabel>
                  {t('macro_group_title')} <Required>*</Required>
                </FieldLabel>
                <MacroGroupTitleInput>
                  <Input
                    width="100%"
                    style={{ width: '100%' }}
                    placeholder="Fazenda 4 Estações"
                    icon={<GroupDescriptionIcon width={24} height={24} />}
                    value={groupTitle}
                    onChange={(e) => {
                      setGroupTitle(e.target.value);
                      clearError('groupTitle');
                    }}
                    error={errors.groupTitle}
                    helpText={errors.groupTitle ? t('title_required') : ''}
                  />
                </MacroGroupTitleInput>
              </FieldWrapper>
              <ContainerSelectClient>
                <Select
                  label={t('client') + ' *'}
                  placeholder={t('select')}
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
                  helpText={errors.client ? t('client_required') : ''}
                  disabled={isEditing}
                />
              </ContainerSelectClient>
              <VehicleFieldContainer>
                <VehicleLabel hasError={errors.vehicle}>{t('vehicle')} *</VehicleLabel>
                <ReactSelect
                  isMulti
                  placeholder={t('select')}
                  value={selectedVehicle}
                  options={veiculosData ?? []}
                  onChange={(selectedOptions) => {
                    setSelectedVehicle(selectedOptions as ICustomSelectOption[]);
                    clearError('vehicle');
                  }}
                  isDisabled={!selectedClient}
                  styles={{
                    control: (provided: any, state: any) => ({
                      ...provided,
                      borderColor: errors.vehicle ? '#dc3545' : provided.borderColor,
                      '&:hover': {
                        borderColor: errors.vehicle ? '#dc3545' : provided.borderColor,
                      },
                      boxShadow: state.isFocused
                        ? errors.vehicle
                          ? '0 0 0 1px #dc3545'
                          : '0 0 0 1px #3b82f6'
                        : provided.boxShadow,
                    }),
                    container: (provided: any) => ({
                      ...provided,
                      width: '100%',
                    }),
                  }}
                />
                {errors.vehicle && <ErrorMessage>{t('select_at_least_one_vehicle')}</ErrorMessage>}
              </VehicleFieldContainer>
            </ContainerFieldMacros>
          </InfoFieldsContainer>
        </Collapse>

        <Collapse
          title={t('define_group_macros')}
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
            errorMessage={errors.macros ? t('add_at_least_one_macro') : ''}
            isEditing={isEditing}
          />
        </Collapse>

        <ActionButtons>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? `${t('saving')}...` : t('save')}
          </Button>
          <Button variant="secondary" disabled={isLoading} onClick={handleCancel}>
            {t('cancel')}
          </Button>
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

const VehicleFieldContainer = styled.div`
  width: 100%;
`;

const VehicleLabel = styled.label<{ hasError?: boolean }>`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ hasError }) => (hasError ? '#dc3545' : '#374151')};
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

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

const ContainerFieldMacros = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
`;

const ContainerSelectClient = styled.div`
  width: 100%;
  display: flex;
  > div {
    width: 100%;
    justify-content: space-between;
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
  flex-direction: column;
  display: flex;
  gap: 13px;
  width: 100%;
  > div {
    width: 100%;
  }
`;

const FieldLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #26333b;
  white-space: nowrap;
  line-height: 1.2;
`;

const Required = styled.span`
  color: #c13e4a;
`;

const MacroGroupTitleInput = styled.div`
  height: 35.95px;
  > div > div {
    height: 100%;
  }
  > div {
    height: 100%;
  }
`;

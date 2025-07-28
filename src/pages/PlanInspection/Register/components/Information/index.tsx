import { Icon } from '@ftdata/f-icons';
import { Collapse, CustomSelect, Input } from '@ftdata/ui';
import { ContainerSelects } from '../../style';
import { useTranslation } from '@ftdata/core';
import { useState, type JSX } from 'react';
import * as tokens from '@ftdata/f-tokens';

const Information = (): JSX.Element => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <Collapse
      showCollapse={collapse}
      title={t('information')}
      handleChange={() => setCollapse(!collapse)}
      style={{ marginBottom: '1.5rem' }}
    >
      <ContainerSelects>
        <Input
          required
          textField="Título do Plano de Inspeção  "
          icon={<Icon name="cnt pen-edit" />}
          className="input-title"
        />

        <CustomSelect
          icon={
            <Icon
              name="arw arrange-filter-sort-alt"
              style={{
                color: tokens.COLOR_NEUTRAL_DARK,
              }}
            />
          }
          t={t}
          selected={null}
          setSelected={() => {}}
          label={t('select_inspection_type')}
          placeholder={t('select_an_option')}
          isRequired
          isError={false}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />

        <CustomSelect
          icon={
            <Icon
              name="trs car"
              style={{
                color: tokens.COLOR_NEUTRAL_DARK,
              }}
            />
          }
          t={t}
          selected={null}
          setSelected={() => {}}
          label={t('select_inspection_type') + ' '}
          placeholder={t('select_an_option')}
          isRequired
          isError={false}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />
      </ContainerSelects>
    </Collapse>
  );
};

export default Information;

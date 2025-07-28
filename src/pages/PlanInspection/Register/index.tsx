import { ContainerSpan, SubTitleSpan, TitleSpan } from 'src/components/Header/styles';
import { ContainerButtons, ContainerContent, ContainerPage } from './style';
import { useTranslation } from '@ftdata/core';
import { useState } from 'react';
import { Popover } from 'src/components/Popover';
import { ConfirmationModal } from 'src/components/ConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';
import Information from './components/Information';
import InspectionPlanFrequency from './components/InspectionPlanFrequency';
import InspectionPlanElement from './components/InspectionPlanElement';
import { Button } from '@ftdata/ui';
import { Icon } from '@ftdata/f-icons';
import { useNavigate } from 'react-router-dom';

export const notification = (
  headerTitle: string,
  title: string,
  message: string,
  type: 'success' | 'danger',
): void => {
  toast(
    (t) => (
      <Popover
        id={t.toastProps.toastId}
        title={headerTitle}
        subTitle={title}
        description={message}
        iconName={'ui checkmark-done-check'}
        type={type}
        closeToast={() => toast.dismiss(t.toastProps.toastId)}
      />
    ),
    {
      hideProgressBar: true,
      autoClose: 3000,
      closeButton: false,
      style: {
        padding: '0',
        borderRadius: '1rem',
      },
    },
  );
};

export const handleFocus = () => {
  const inputElement = document.querySelector('.input-time') as HTMLInputElement;
  inputElement?.showPicker();
};

const RegisterPlanInspection = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const IconButton = () => {
    return <Icon name="ui done-check" />;
  };

  return (
    <>
      <ToastContainer />
      <ContainerPage>
        <ConfirmationModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onConfirm={() => {}}
          title={t('do_you_really_want_to_delete_this_record')}
          message={t('really_want_delete_type_confirm')}
        />

        <ContainerSpan>
          <TitleSpan>{t('create_inspection_plan')}</TitleSpan>
          <SubTitleSpan>{t('register_a_new_inspection_for_the_vehicle')}</SubTitleSpan>
        </ContainerSpan>

        <ContainerContent>
          <Information />
          <InspectionPlanElement />
          <InspectionPlanFrequency />
        </ContainerContent>
      </ContainerPage>

      <ContainerButtons>
        <Button variant="primary" LeftIcon={IconButton}>
          {t('save')}
        </Button>

        <Button variant="secondary" onClick={() => navigate('/plan_inspection')}>
          {t('cancel')}
        </Button>
      </ContainerButtons>
    </>
  );
};
export default RegisterPlanInspection;

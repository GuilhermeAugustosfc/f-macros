import React from 'react';
import { Button } from '@ftdata/styleguide';
import { Container } from './styles';
import { useTranslation } from 'react-i18next';
import { UnreachableContentIcon } from '../svg';

interface Props {
    openModal: () => void;
}

export const UnreachableContent: React.FC<Props> = ({ openModal }: Props) => {
    const { t } = useTranslation('114');
    return (
        <Container>
            <UnreachableContentIcon />
            <strong>{t('unable_to_locate')}</strong>
            <p>{t('we_did_not_find_any_data_with_the_filtered_terms_try_redoing_the_filtering')}</p>
            <Button variant="primary" onClick={openModal}>
                {t('filter_again')}
            </Button>
        </Container>
    );
};

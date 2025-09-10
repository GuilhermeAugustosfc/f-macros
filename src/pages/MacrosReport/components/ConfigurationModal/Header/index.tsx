import React from 'react';
import { HeaderContainer } from './styles';
import { ArrowLeftIcon } from '../../svg';

interface Props {
    close: () => void;
    title: string;
}

export const Header: React.FC<Props> = ({ close, title }: Props) => {
    return (
        <HeaderContainer>
            <div>
                <button className="btn-close" onClick={close} aria-label="voltar">
                    <ArrowLeftIcon />
                </button>
                <strong>{title}</strong>
            </div>
        </HeaderContainer>
    );
};

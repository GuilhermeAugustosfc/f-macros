import React from 'react';
import styled from 'styled-components';

interface Props {
    value: number;
    max: number;
    sufix?: string;
}

export const getProgressColor = (value: number, max: number): string => {
    const percentage = (value / max) * 100;

    if (percentage > 75) return '#008764'; // verde
    if (percentage > 50) return '#2051B3'; // azul
    if (percentage > 25) return '#CE7C3A'; // amarelo
    return '#C13E4A'; // vermelho
};

const ProgressIndicator: React.FC<Props> = ({ value, max, sufix }: Props) => {
    const progressColor = getProgressColor(value, max);

    return (
        <Container data-testid="progress-container">
            <ProgressWrapper data-testid="progress-wrapper">
                <Progress value={value} max={max} $progressColor={progressColor} data-testid="progress-bar" />
                <Percentage data-testid="progress-value">
                    <span>{value}</span> <span>{sufix}</span>
                </Percentage>
            </ProgressWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 120%;
`;

const ProgressWrapper = styled.div`
    position: relative;
    width: 140px;
    height: 20px;
`;

const Progress = styled.progress<{ $progressColor: string }>`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #d5d8da;
    color: ${(props) => props.$progressColor};
    appearance: none;

    &::-webkit-progress-bar {
        background-color: #d5d8da;
        border-radius: 4px;
    }

    &::-webkit-progress-value {
        background-color: ${(props) => props.$progressColor};
        border-radius: 4px;
    }

    &::-moz-progress-bar {
        background-color: ${(props) => props.$progressColor};
        border-radius: 4px;
    }
`;

const Percentage = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    display: flex;
    gap: 6px;
`;

export default ProgressIndicator;

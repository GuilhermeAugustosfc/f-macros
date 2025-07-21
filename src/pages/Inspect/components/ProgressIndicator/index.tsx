import React from 'react';
import styled from 'styled-components';

interface Props {
    value: number;
    max: number;
}

const ProgressIndicator: React.FC<Props> = ({ value, max }: Props) => {
    return (
        <Container>
            <ProgressWrapper>
                <Progress value={value} max={max} />
                <Percentage>{value}L</Percentage>
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

const Progress = styled.progress`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #d5d8da;
    color: #316ee8;
    appearance: none;

    &::-webkit-progress-bar {
        background-color: #d5d8da;
        border-radius: 4px;
    }

    &::-webkit-progress-value {
        background-color: #316ee8;
        border-radius: 4px;
    }

    &::-moz-progress-bar {
        background-color: #316ee8;
        border-radius: 4px;
    }
`;

const Percentage = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
`;

export default ProgressIndicator;

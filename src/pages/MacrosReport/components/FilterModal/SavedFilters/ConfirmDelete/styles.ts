import styled, { keyframes } from 'styled-components';
import * as tokens from '@ftdata/tokens';

const slideUp = keyframes`
  0% {
    transform: translateY(30%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const ConfirmDeleteContainer = styled.div`
    align-items: flex-end;
    background-color: rgba(142, 150, 155, 0.32);
    display: flex;
    height: calc(100% - 4rem);
    position: absolute;
    top: 4rem;
    width: 100%;
`;

export const Wrapper = styled.div`
    animation: ${slideUp} 0.2s ease-out;
    align-items: center;
    background-color: white;
    border-radius: 0.75rem 0.75rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.75rem 1.5rem 1.25rem 1.5rem;
    width: 100%;
`;

export const IconContainer = styled.div`
    align-items: center;
    background-color: rgba(225, 145, 153, 0.1);
    border-radius: 50%;
    color: ${tokens.COLOR_DANGER_MEDIUM};
    display: flex;
    height: 6.75rem;
    justify-content: center;
    width: 6.75rem;
`;

export const InfoContent = styled.div`
    align-items: center;
    color: ${tokens.COLOR_NEUTRAL_DUSK};
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 1rem;
    width: 100%;

    h2 {
        font-size: 1.25rem;
        line-height: 1.5rem;
        letter-spacing: ${tokens.LETTER_SPACING_TIGHT};
    }

    p {
        max-width: 90%;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5rem;
    }
`;

export const ButtonsContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding-top: 1rem;
    width: 100%;

    button {
        width: 100%;
    }
`;

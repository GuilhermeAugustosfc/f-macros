import styled from 'styled-components';

export const ContainerEmpty = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    justify-content: center;
    align-items: center;

    svg {
        margin-bottom: 24px;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: center;
    }
`;

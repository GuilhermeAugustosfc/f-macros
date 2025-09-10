import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem 0 1.5rem;
    height: 65px;
    border-bottom: 1px solid #d5d8da;

    div {
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }

    strong {
        color: #26333b;
        font-weight: 600;
        line-height: 120%;
    }

    .btn-clear {
        color: #316ee8;
        font-weight: 500;
        line-height: 150%;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg,
    path {
        stroke: #6b757c;
    }
`;

import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    height: 100%;
    max-height: calc(100vh - 3.5rem);
    transform: translateZ(0);
    width: 100%;
    overflow-y: auto;
`;

interface ReportWrapperProps {
    hasPagination: boolean;
}

export const ReportWrapper = styled.div<ReportWrapperProps>`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    max-height: ${({ hasPagination }) => (hasPagination ? 'calc(100vh - 3.5rem - 5.5rem)' : 'calc(100vh - 3.5rem)')};
`;

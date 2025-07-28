import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  & > div:first-child {
    padding: 1.5rem;
  }

  & > div:last-child {
    padding: 1.813rem 1.5rem 0 1.5rem;
  }
`;

export const ContainerContent = styled.div`
  input[type='time']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

export const ContainerSelects = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  & > div {
    flex: 1;
    min-width: 23.125rem;

    & > label {
      gap: 0.2rem;
    }
    & > div {
      width: 100%;
    }
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1.5rem;

  padding: 2rem 1.5rem;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  & > button:last-child {
    background: ${tokens.COLOR_DANGER_MEDIUM};
    color: ${tokens.COLOR_NEUTRAL_DAY};
  }
`;

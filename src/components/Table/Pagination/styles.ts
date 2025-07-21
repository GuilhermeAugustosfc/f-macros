import styled from 'styled-components';
import * as tokens from '@ftdata/f-tokens';

export const ContainerPagination = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: ${tokens.FONT_SIZE_SM};
  font-weight: 500;
  color: ${tokens.COLOR_NEUTRAL_DUSK};
  width: 100%;
  bottom: 0;
  right: 0;
  padding: 24px 32px;
  box-shadow: 0px 8px 16px 0px rgba(107, 117, 124, 0.32);
  background: #fff;
  position: absolute;
  bottom: 0;
  z-index: 10;
`;

export const DivRight = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;

  .pageCurrent,
  .pageAfter,
  .pageNext {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #ffffff;
    cursor: pointer;
  }

  .pageAfter,
  .pageNext {
    color: #6b757c;
  }

  .pageCurrent {
    background: ${tokens.COLOR_BRAND_MEDIUM};
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
  }
`;

export const DivLeft = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  select {
    border-radius: 0.25rem;
    border: 1px solid ${tokens.COLOR_NEUTRAL_MEDIUM};
    background-color: transparent;
    width: 4rem;
    height: 2.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
`;

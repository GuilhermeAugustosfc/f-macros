import styled, { keyframes } from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';

const skeleton = keyframes`

  0% {
    background-position: -80px;
  }
  40%, 100% {
    background-position: 100%;
  }

`;

export const SkeletonChannelLoading = styled.div`
  border-radius: 4px;
  height: 1.25rem;
  width: 5rem;
  margin-bottom: 0.938rem;
  background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
  background-image: linear-gradient(90deg, #ececec 0px, #ddd 40px, #ececec 80px);
  animation: ${skeleton} 1s infinite ease-out;
`;

export const FormContainer = styled.div`
  width: 100%;
`;
export const FormContent = styled.div`
  height: 77%; //44rem
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 24px;
  width: 100%;

  ::-webkit-scrollbar {
    width: 6px;
    background: rgb(244, 244, 244);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(213, 216, 218);
  }
`;
export const FormSection = styled.fieldset`
  strong {
    color: #26333b;
    font-weight: 600;
    line-height: 120%;
    margin-bottom: 24px;
    margin-top: 12px;
    display: block;
  }
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  label {
    color: #26333b;
    font-size: 14px;
    font-weight: 600;
    line-height: 120%;
  }

  select,
  .btn-calendar {
    border-radius: 4px;
    border: 1px solid #b1b7bb;
    height: 40px;
    padding: 8px 10px 8px 16px;
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-weight: 500;
    line-height: 150%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 20px;
    width: 100%;

    &.selected {
      color: ${styleguide.COLOR_NEUTRAL_DUSK};
    }

    svg {
      margin-right: 0.4rem;
    }
  }

  button {
    cursor: pointer;
    color: #316ee8;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .date-range-custom {
    position: absolute;
    top: 5rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0px 0px 4px 0px rgba(107, 117, 124, 0.32);
    border-radius: 4px;
    overflow: hidden;

    .rdrDefinedRangesWrapper {
      width: 100%;
    }

    .rdrInputRanges {
      display: none;
    }

    .rdrStaticRangeLabel {
      width: 100%;
    }

    .rdrStaticRange:hover,
    .rdrStaticRange:focus {
      background: ${styleguide.COLOR_NEUTRAL_LIGHTER};
    }

    .rdrMonth {
      width: 100%;
    }
  }

  .textField {
    display: flex;
    align-items: center;
    gap: 4px;

    .required {
      color: ${styleguide.COLOR_DANGER_MEDIUM};
    }
  }
`;

export const Action = styled.div`
  background: white;
  padding: 40px 16px;
  position: absolute;
  bottom: 0;
  width: 100%;
  gap: 1.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: stretch;

  button {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    display: flex;
    justify-content: center;
    border-radius: 4px;
  }

  .btn-cancel {
    color: #6b757c;
    cursor: pointer;
  }

  .btn-apply {
    padding: 0.5rem 1rem;
    background: #3b485b;
    color: #fff;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  margin-bottom: 4px;
  padding: 0px 8px;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > span {
    color: ${styleguide.COLOR_BRAND_MEDIUM};
    font-family: ${styleguide.FONT_FAMILY_01};
    font-size: ${styleguide.FONT_SIZE_MD};
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    line-height: ${styleguide.LINE_HEIGHT_TIGHT};
    text-align: center;
  }
`;

export const EmptyStateContainer = styled.div<{ colorErr: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) =>
    props.colorErr == 'success' ? styleguide.COLOR_SUCCESS_MEDIUM : styleguide.COLOR_DANGER_MEDIUM};

  & > span {
    font-family: ${styleguide.FONT_FAMILY_01};
    font-size: ${styleguide.FONT_SIZE_MD};
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    line-height: ${styleguide.LINE_HEIGHT_TIGHT};
    text-align: center;
  }
`;

export const ContainerIcon = styled.div`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.75rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

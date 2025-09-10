import styled from 'styled-components';
import * as styleguide from '@ftdata/f-tokens';
import { ArrowDownCalender } from '../../svg';

export const FormContainer = styled.div`
  width: 100%;
`;
export const FormContent = styled.div<{ height: string }>`
  max-height: ${({ height }) => height};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: ${styleguide.SPACING_INLINE_04};
  gap: ${styleguide.SPACING_STACK_04};

  // Esconde a barra de rolagem no Firefox
  scrollbar-width: none;

  // Esconde a barra de rolagem no Chrome, Safari e outros navegadores baseados em WebKit
  &::-webkit-scrollbar {
    display: none;
  }

  // Esconde a barra de rolagem no IE e Edge
  -ms-overflow-style: none;
`;
export const FormSection = styled.fieldset`
  strong {
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    line-height: ${styleguide.LINE_HEIGHT_TIGHT};
    margin-bottom: ${styleguide.SPACING_STACK_04};
    margin-top: ${styleguide.SPACING_STACK_02};
    display: block;
  }
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  label {
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-size: ${styleguide.FONT_SIZE_SM};
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    line-height: ${styleguide.LINE_HEIGHT_TIGHT};
  }

  select,
  .btn-calendar {
    border-radius: ${styleguide.BORDER_RADIUS_SM};
    border: ${styleguide.BORDER_WIDTH_HAIRLINE} solid ${styleguide.COLOR_NEUTRAL_MEDIUM};
    height: ${styleguide.SPACING_INSET_LG};
    padding: 8px 10px 8px 16px;
    color: ${styleguide.COLOR_NEUTRAL_DUSK};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    line-height: ${styleguide.LINE_HEIGHT_MEDIUM};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: ${styleguide.SPACING_INLINE_03};
    background: url(${ArrowDownCalender}) no-repeat 96% center;
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
    color: ${styleguide.COLOR_ACCENT_MEDIUM};
    font-size: ${styleguide.FONT_SIZE_SM};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    line-height: 150%;
    display: flex;
    align-items: center;
    gap: ${styleguide.SPACING_INLINE_01};
  }

  .date-range-custom {
    position: absolute;
    top: 5rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0px 0px 4px 0px rgba(107, 117, 124, ${styleguide.OPACITY_LEVEL_MEDIUM});
    border-radius: ${styleguide.BORDER_RADIUS_SM};
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

export const SaveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #222b38;
  line-height: 150%;
  justify-content: space-between;
`;

export const SwitchReference = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #222b38;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;

  > *:nth-child(3) {
    flex-basis: 100%;
  }
`;

export const Action = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  padding: 20px 13px;
  margin-top: auto;
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

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

export const TimeRowContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const TimeLabel = styled.label`
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  font-size: ${styleguide.FONT_SIZE_SM};
  font-weight: ${styleguide.FONT_WEIGHT_BOLD};
  line-height: ${styleguide.LINE_HEIGHT_TIGHT};
`;

export const TimeInput = styled.input`
  border-radius: ${styleguide.BORDER_RADIUS_SM};
  border: ${styleguide.BORDER_WIDTH_HAIRLINE} solid ${styleguide.COLOR_NEUTRAL_MEDIUM};
  height: ${styleguide.SPACING_INSET_LG};
  padding: 8px 16px;
  color: ${styleguide.COLOR_NEUTRAL_DUSK};
  font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
  line-height: ${styleguide.LINE_HEIGHT_MEDIUM};
  font-size: ${styleguide.FONT_SIZE_SM};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${styleguide.COLOR_ACCENT_MEDIUM};
  }

  &[type='time'] {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
  }

  &[type='time']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

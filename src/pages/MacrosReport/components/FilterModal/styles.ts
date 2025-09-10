import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';

export const TabsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    color: ${styleguide.COLOR_NEUTRAL_DUSK};

    .tab-list {
        display: flex;

        .tab {
            flex: 1;
            padding: 1rem;
            cursor: pointer;
            outline: none;
            border-top: 3px solid transparent;
            border-bottom: 4px solid transparent;
            font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};

            &:first-child {
                border-right: 1px solid #d5d8da;
            }

            &.selected {
                color: ${styleguide.COLOR_ACCENT_MEDIUM};
                border-bottom-color: ${styleguide.COLOR_ACCENT_MEDIUM};
            }
        }
    }

    .tab-panels {
        border-top: 1px solid #d5d8da;
        display: flex;
        flex-direction: column;
        flex: 1;

        .tab-panel {
            flex: 1;
            display: flex;
            max-height: calc(100vh - 129px);
            overflow-y: auto;
        }
    }
`;

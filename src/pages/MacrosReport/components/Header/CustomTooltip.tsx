import React, { useState, ReactNode } from 'react';
import styled from 'styled-components';
import * as styleguide from '@ftdata/tokens';

interface CustomTooltipProps {
    children: ReactNode;
    content: ReactNode | string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <TooltipContainer onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {children}
            <TooltipContent position={position} isVisible={isVisible}>
                {content}
            </TooltipContent>
        </TooltipContainer>
    );
};

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TooltipContent = styled.div<{ position: string; isVisible: boolean }>`
    position: absolute;
    z-index: 100;
    background-color: #fff;
    color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;

    ${({ position, isVisible }) => {
        switch (position) {
            case 'top':
                return `
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(${isVisible ? '-8px' : '0px'});
                    &:after {
                        content: '';
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: ${styleguide.COLOR_NEUTRAL_DARKER} transparent transparent transparent;
                    }
                `;
            case 'bottom':
                return `
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(${isVisible ? '8px' : '0px'});
                    &:after {
                        content: '';
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent ${styleguide.COLOR_NEUTRAL_DARKER} transparent;
                    }
                `;
            case 'left':
                return `
                    right: 100%;
                    top: 50%;
                    transform: translateY(-50%) translateX(${isVisible ? '-8px' : '0px'});
                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 100%;
                        margin-top: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent transparent ${styleguide.COLOR_NEUTRAL_DARKER};
                    }
                `;
            case 'right':
                return `
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%) translateX(${isVisible ? '8px' : '0px'});
                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: 100%;
                        margin-top: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent ${styleguide.COLOR_NEUTRAL_DARKER} transparent transparent;
                    }
                `;
            default:
                return '';
        }
    }}
`;

export const TooltipVehicleList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    min-width: 150px;
    white-space: normal;
`;

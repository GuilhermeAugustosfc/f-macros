import React from 'react';
import { render } from '@testing-library/react';
import OrderIndicator from '../index';

// Mock dos tokens
jest.mock('@ftdata/tokens', () => ({
    COLOR_NEUTRAL_MEDIUM: '#8E969B',
    COLOR_NEUTRAL_LIGHT: '#D5D8DA',
}));

describe('OrderIndicator', () => {
    it('deve renderizar ambas as setas com cor inativa quando nenhuma prop é passada', () => {
        const { container } = render(<OrderIndicator />);

        const paths = container.querySelectorAll('path');
        expect(paths[0]).toHaveAttribute('fill', '#D5D8DA'); // seta para cima
        expect(paths[1]).toHaveAttribute('fill', '#D5D8DA'); // seta para baixo
    });

    it('deve renderizar a seta para cima ativa quando asc=true', () => {
        const { container } = render(<OrderIndicator asc={true} />);

        const paths = container.querySelectorAll('path');
        expect(paths[0]).toHaveAttribute('fill', '#8E969B'); // seta para cima ativa
        expect(paths[1]).toHaveAttribute('fill', '#D5D8DA'); // seta para baixo inativa
    });

    it('deve renderizar a seta para baixo ativa quando desc=true', () => {
        const { container } = render(<OrderIndicator desc={true} />);

        const paths = container.querySelectorAll('path');
        expect(paths[0]).toHaveAttribute('fill', '#D5D8DA'); // seta para cima inativa
        expect(paths[1]).toHaveAttribute('fill', '#8E969B'); // seta para baixo ativa
    });

    it('deve renderizar ambas as setas com cores corretas quando ambas as props são true', () => {
        const { container } = render(<OrderIndicator asc={true} desc={true} />);

        const paths = container.querySelectorAll('path');
        expect(paths[0]).toHaveAttribute('fill', '#8E969B'); // seta para cima ativa
        expect(paths[1]).toHaveAttribute('fill', '#8E969B'); // seta para baixo ativa
    });

    it('deve manter a estrutura do SVG correta', () => {
        const { container } = render(<OrderIndicator />);

        const svgs = container.querySelectorAll('svg');
        expect(svgs).toHaveLength(2);
        expect(svgs[0]).toHaveAttribute('width', '8');
        expect(svgs[0]).toHaveAttribute('height', '6');
        expect(svgs[1]).toHaveAttribute('width', '8');
        expect(svgs[1]).toHaveAttribute('height', '7');
    });
});

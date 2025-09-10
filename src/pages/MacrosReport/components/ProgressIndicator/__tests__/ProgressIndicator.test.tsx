import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressIndicator, { getProgressColor } from '../index';
import 'jest-styled-components';

describe('ProgressIndicator', () => {
    const renderProgressIndicator = (value: number, max: number) => {
        return render(<ProgressIndicator value={value} max={max} />);
    };

    it('deve renderizar o componente com o valor correto', () => {
        renderProgressIndicator(50, 100);
        expect(screen.getByTestId('progress-value')).toHaveTextContent('50L');
    });

    it('deve ter a cor vermelha quando o progresso é menor que 25%', () => {
        const { getByTestId } = renderProgressIndicator(20, 100);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toHaveAttribute('value', '20');
        expect(progressBar).toHaveStyleRule('background-color', '#C13E4A', {
            modifier: '&::-webkit-progress-value',
        });
    });

    it('deve ter a cor amarela quando o progresso está entre 26% e 50%', () => {
        const { getByTestId } = renderProgressIndicator(40, 100);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toHaveAttribute('value', '40');
        expect(progressBar).toHaveStyleRule('background-color', '#CE7C3A', {
            modifier: '&::-webkit-progress-value',
        });
    });

    it('deve ter a cor azul quando o progresso está entre 51% e 75%', () => {
        const { getByTestId } = renderProgressIndicator(60, 100);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toHaveAttribute('value', '60');
        expect(progressBar).toHaveStyleRule('background-color', '#2051B3', {
            modifier: '&::-webkit-progress-value',
        });
    });

    it('deve ter a cor verde quando o progresso é maior que 75%', () => {
        const { getByTestId } = renderProgressIndicator(80, 100);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toHaveAttribute('value', '80');
        expect(progressBar).toHaveStyleRule('background-color', '#008764', {
            modifier: '&::-webkit-progress-value',
        });
    });

    it('deve ter os atributos value e max corretos', () => {
        const { getByTestId } = renderProgressIndicator(30, 100);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toHaveAttribute('value', '30');
        expect(progressBar).toHaveAttribute('max', '100');
    });

    it('deve manter a estrutura visual correta', () => {
        const { getByTestId } = renderProgressIndicator(50, 100);

        const container = getByTestId('progress-container');
        expect(container).toHaveStyleRule('display', 'flex');
        expect(container).toHaveStyleRule('align-items', 'center');

        const progressWrapper = container.querySelector('[data-testid="progress-wrapper"]');
        expect(progressWrapper).toHaveStyleRule('width', '140px');
        expect(progressWrapper).toHaveStyleRule('height', '20px');
    });

    describe('getProgressColor', () => {
        it('deve retornar as cores corretas para diferentes porcentagens', () => {
            const cases = [
                { value: 10, max: 100, expectedColor: '#C13E4A' }, // 10% - vermelho
                { value: 30, max: 100, expectedColor: '#CE7C3A' }, // 30% - amarelo
                { value: 60, max: 100, expectedColor: '#2051B3' }, // 60% - azul
                { value: 80, max: 100, expectedColor: '#008764' }, // 80% - verde
            ];

            cases.forEach(({ value, max, expectedColor }) => {
                const color = getProgressColor(value, max);
                expect(color).toBe(expectedColor);
            });
        });
    });
});

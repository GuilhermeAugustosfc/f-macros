import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../index';
import { ReportsContext } from '../../../../../contexts/reports';

// Mock dos componentes do styleguide
jest.mock('@ftdata/styleguide', () => ({
    Button: ({ children, onClick, disabled }) => (
        <button onClick={onClick} disabled={disabled}>
            {children}
        </button>
    ),
    Input: ({ value, onChange, placeholder }) => (
        <input value={value} onChange={onChange} placeholder={placeholder} data-testid="search-input" />
    ),
    Tooltips: ({ children, text }) => <div data-tooltip={text}>{children}</div>,
}));

// Mock do i18n
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations = {
                download: 'Download',
                viewing: 'Visualizando',
                know_more: 'Saiba mais',
                research: 'Pesquisar',
                custumer: 'Cliente',
                dt_gps: 'Data GPS',
                group_of_vehicles: 'Grupo de veículos',
                vehicle: 'Veículo',
                fence: 'Cerca',
                price: 'Preço',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Header', () => {
    const mockOpenDownload = jest.fn();
    const mockOpenFilter = jest.fn();
    const mockSetFilterValue = jest.fn();

    const defaultContextValue = {
        vehicleGroup: { id: '', value: '' },
        client: { id: '', value: '' },
        period: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-01'),
        },
        vehicle: { id: '', value: '' },
        hasFilter: false,
        fence: false,
        referencePoint: { isChecked: false, value: 0 },
        price: {
            isChecked: false,
            value: 0,
            value_formatado: '',
        },
        filterValue: '',
        setFilterValue: mockSetFilterValue,
        setClient: jest.fn(),
        setPeriod: jest.fn(),
        setVehicle: jest.fn(),
        setVehicleGroup: jest.fn(),
        setHasFilter: jest.fn(),
        setFence: jest.fn(),
        setReferencePoint: jest.fn(),
        setPrice: jest.fn(),
        clearFilters: jest.fn(),
        applyFilters: jest.fn(),
        saveFilter: jest.fn(),
        deleteFilter: jest.fn(),
        clearFilter: jest.fn(),
        motorista: { id: '', value: '' },
        setMotorista: jest.fn(),
        columns: {
            drenagens: { visible: true, isSelected: true, order: 0 },
            abastecimentos: { visible: true, isSelected: true, order: 1 },
            hodometro: { visible: true, isSelected: true, order: 2 },
            horimetro: { visible: true, isSelected: true, order: 3 },
            volumeTotalConsumido: { visible: true, isSelected: true, order: 4 },
            consumoOcioso: { visible: true, isSelected: true, order: 5 },
            consumoEmMovimento: { visible: true, isSelected: true, order: 6 },
            consumoEmLH: { visible: true, isSelected: true, order: 7 },
            consumoEmKML: { visible: true, isSelected: true, order: 8 },
            consumoTotal: { visible: true, isSelected: true, order: 9 },
            consumoEmKMH: { visible: true, isSelected: true, order: 10 },
            consumoDesligado: { visible: true, isSelected: true, order: 11 },
        },
        setColumns: jest.fn(),
    };

    const renderHeader = (contextValue = defaultContextValue) => {
        return render(
            <ReportsContext.Provider value={contextValue}>
                <Header title="Título de Teste" openDownload={mockOpenDownload} openFilter={mockOpenFilter} />
            </ReportsContext.Provider>,
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar o título corretamente', () => {
        renderHeader();
        expect(screen.getByText('Título de Teste')).toBeInTheDocument();
    });

    it('deve desabilitar o botão de download quando não há filtros', () => {
        renderHeader();
        const downloadButton = screen.getByText('Download');
        expect(downloadButton).toBeDisabled();
    });

    it('deve habilitar o botão de download quando há filtros', () => {
        renderHeader({
            ...defaultContextValue,
            hasFilter: true,
        });
        const downloadButton = screen.getByText('Download');
        expect(downloadButton).not.toBeDisabled();
    });

    it('deve chamar openFilter quando o botão de filtro é clicado', () => {
        renderHeader();
        const filterButton = screen.getByTestId('filter-button');
        fireEvent.click(filterButton);
        expect(mockOpenFilter).toHaveBeenCalledTimes(1);
    });

    it('deve atualizar o valor do filtro quando o input é alterado', () => {
        renderHeader();
        const input = screen.getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'teste' } });
        expect(mockSetFilterValue).toHaveBeenCalledWith('teste');
    });

    it('deve mostrar os badges quando há filtros aplicados', () => {
        const contextWithFilters = {
            ...defaultContextValue,
            hasFilter: true,
            client: { id: '1', value: 'Cliente Teste' },
            vehicleGroup: { id: '1', value: 'Grupo Teste' },
            period: {
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-01-31'),
            },
        };

        renderHeader(contextWithFilters);

        expect(screen.getByText('Cliente Teste')).toBeInTheDocument();
        expect(screen.getByText('Grupo Teste')).toBeInTheDocument();
        expect(screen.getByText('Visualizando')).toBeInTheDocument();
    });

    it('não deve renderizar quando showHeader é false', () => {
        render(
            <ReportsContext.Provider value={defaultContextValue}>
                <Header
                    title="Título de Teste"
                    openDownload={mockOpenDownload}
                    openFilter={mockOpenFilter}
                    showHeader={false}
                />
            </ReportsContext.Provider>,
        );

        expect(screen.queryByText('Título de Teste')).not.toBeInTheDocument();
    });
});

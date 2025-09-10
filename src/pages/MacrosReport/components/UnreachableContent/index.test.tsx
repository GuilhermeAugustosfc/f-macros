import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnreachableContent } from './index';

// Mock the translation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: { [key: string]: string } = {
                unable_to_locate: 'Unable to locate',
                we_did_not_find_any_data_with_the_filtered_terms_try_redoing_the_filtering:
                    'We did not find any data with the filtered terms. Try redoing the filtering.',
                filter_again: 'Filter again',
            };
            return translations[key];
        },
    }),
}));

describe('UnreachableContent', () => {
    const mockOpenModal = jest.fn();

    beforeEach(() => {
        mockOpenModal.mockClear();
    });

    it('renders correctly with all elements', () => {
        render(<UnreachableContent openModal={mockOpenModal} />);

        // Check if main texts are rendered
        expect(screen.getByText('Unable to locate')).toBeInTheDocument();
        expect(
            screen.getByText('We did not find any data with the filtered terms. Try redoing the filtering.'),
        ).toBeInTheDocument();

        // Check if button is rendered
        expect(screen.getByText('Filter again')).toBeInTheDocument();
    });

    it('calls openModal when button is clicked', () => {
        render(<UnreachableContent openModal={mockOpenModal} />);

        const button = screen.getByText('Filter again');
        fireEvent.click(button);

        expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hello } from './Hello';

describe('Hello component', () => {
  it('renders the correct message', () => {
    render(<Hello name="Lucas" />);
    expect(screen.getByText('Hello, Lucas!')).toBeInTheDocument();
  });
});

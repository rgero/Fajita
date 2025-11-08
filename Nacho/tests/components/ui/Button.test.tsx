import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Box } from '@mui/material';
import Button from '@components/ui/Button';
import React from 'react';

describe('Button component', () => {
  const theme = createTheme();

  const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it('renders icon and title', () => {
    renderWithTheme(
      <Button icon={<Box data-testid="icon" />} title="Click me" onClick={vi.fn()} />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button icon={<Box />} title="Click me" onClick={handleClick} />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies color string if direct color provided', () => {
    renderWithTheme(
      <Button icon={<Box />} title="Colored" onClick={vi.fn()} color="red" />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    const text = screen.getByText('Colored');
    expect(text).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('applies theme palette color if provided', () => {
    renderWithTheme(
      <Button icon={<Box />} title="Primary" onClick={vi.fn()} color="primary" />
    );

    const button = screen.getByRole('button');
    const expectedColor = theme.palette.primary.main;
    expect(button).toHaveStyle({ color: expectedColor });
    const text = screen.getByText('Primary');
    expect(text).toHaveStyle({ color: expectedColor });
  });

  it('defaults to inherit color if no color provided', () => {
    renderWithTheme(<Button icon={<Box />} title="Default" onClick={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ color: 'inherit' });
    const text = screen.getByText('Default');
    expect(text).toHaveStyle({ color: 'inherit' });
  });
});

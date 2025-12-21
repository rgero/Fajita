import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DarkModeContext } from '@context/darkmode/DarkModeContext';
import { DarkModeProvider } from '@context/darkmode/DarkModeProvider';
import { useContext } from 'react';
import { useTheme } from '@mui/material';

const TestConsumer = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)!;
  const theme = useTheme();
  return (
    <div>
      <span data-testid="mode-text">{isDarkMode ? 'dark' : 'light'}</span>
      <span data-testid="theme-palette">{theme.palette.mode}</span>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
};

describe('DarkModeProvider', () => {
  beforeEach(() => {
    // Clear localStorage and mocks before each test
    window.localStorage.clear();
    vi.clearAllMocks();

    // Mock matchMedia (defaulting to light mode)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  });

  it('initializes with light mode if matchMedia is false and no localStorage is set', () => {
    render(
      <DarkModeProvider>
        <TestConsumer />
      </DarkModeProvider>
    );

    expect(screen.getByTestId('mode-text').textContent).toBe('light');
    expect(screen.getByTestId('theme-palette').textContent).toBe('light');
  });

  it('toggles dark mode when toggleDarkMode is called', () => {
    render(
      <DarkModeProvider>
        <TestConsumer />
      </DarkModeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle/i });
    fireEvent.click(button);

    expect(screen.getByTestId('mode-text').textContent).toBe('dark');
    expect(screen.getByTestId('theme-palette').textContent).toBe('dark');
  });

  it('updates document.body styles when theme changes', () => {
    render(
      <DarkModeProvider>
        <TestConsumer />
      </DarkModeProvider>
    );

    // Initial check (light mode colors depend on your warmTheme)
    expect(document.body.style.backgroundColor).not.toBe('');
    
    const initialBg = document.body.style.backgroundColor;
    const button = screen.getByRole('button', { name: /toggle/i });
    
    fireEvent.click(button);

    expect(document.body.style.backgroundColor).not.toBe(initialBg);
  });

  it('persists choice to localStorage', () => {
    render(
      <DarkModeProvider>
        <TestConsumer />
      </DarkModeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle/i });
    fireEvent.click(button);

    // Check if useLocalStorageState did its job
    expect(window.localStorage.getItem('isDarkMode')).toBe('true');
  });
});
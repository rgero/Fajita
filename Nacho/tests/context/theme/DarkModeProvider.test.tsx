import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeContext } from '@context/theme/ThemeContext';
import { ThemeProvider } from '@context/theme/ThemeProvider';
import { useContext } from 'react';
import { useTheme } from '@mui/material';

vi.mock('@components/ui/CustomToaster', () => ({
  default: () => <div data-testid="custom-toaster" />,
}));

const TestConsumer = () => {
  const { selectedTheme, setTheme } = useContext(ThemeContext)!;
  const theme = useTheme();
  return (
    <div>
      <span data-testid="theme-text">{selectedTheme}</span>
      <span data-testid="theme-palette">{theme.palette.mode}</span>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('fleet')}>Fleet</button>
    </div>
  );
};

describe('ThemeProvider', () => {
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

  it('initializes with light theme by default', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-text').textContent).toBe('light');
    expect(screen.getByTestId('theme-palette').textContent).toBe('light');
  });

  it('switches to dark theme when dark button is clicked', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const darkButton = screen.getByRole('button', { name: /dark/i });
    fireEvent.click(darkButton);

    expect(screen.getByTestId('theme-text').textContent).toBe('dark');
    expect(screen.getByTestId('theme-palette').textContent).toBe('dark');
  });

  it('switches to fleet theme when fleet button is clicked', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const fleetButton = screen.getByRole('button', { name: /fleet/i });
    fireEvent.click(fleetButton);

    expect(screen.getByTestId('theme-text').textContent).toBe('fleet');
    expect(screen.getByTestId('theme-palette').textContent).toBe('dark');
  });

  it('updates document.body styles when theme changes', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    // Initial check (light mode colors depend on your warmTheme)
    expect(document.body.style.backgroundColor).not.toBe('');
    
    const initialBg = document.body.style.backgroundColor;
    const darkButton = screen.getByRole('button', { name: /dark/i });
    
    fireEvent.click(darkButton);

    expect(document.body.style.backgroundColor).not.toBe(initialBg);
  });

  it('persists choice to localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    const darkButton = screen.getByRole('button', { name: /dark/i });
    fireEvent.click(darkButton);

    // Check if useLocalStorageState did its job
    expect(window.localStorage.getItem('selectedTheme')).toBe('"dark"');
  });
});
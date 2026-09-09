import { ThemeProvider, createTheme } from '@mui/material/styles';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CustomToaster from '@components/ui/CustomToaster';
import { render } from '@testing-library/react';
import toast from 'react-hot-toast';

const useToasterStoreMock = vi.fn();
const toasterSpy = vi.fn();

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    dismiss: vi.fn(),
  },
  Toaster: (props: any) => {
    toasterSpy(props);
    return <div data-testid="toaster" />;
  },
  useToasterStore: () => useToasterStoreMock(),
}));

const renderWithSurface = (surface: { secondary: string; secondaryContrastText: string; tertiary: string }) => {
  const theme = createTheme({ palette: { surface } });
  return render(
    <ThemeProvider theme={theme}>
      <CustomToaster />
    </ThemeProvider>
  );
};

const lightSurface = { secondary: '#d9d9d9', secondaryContrastText: '#333333', tertiary: '#b3b3b3' };
const darkSurface = { secondary: '#454545', secondaryContrastText: '#ffffff', tertiary: '#6b6b6b' };

describe('CustomToaster', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useToasterStoreMock.mockReturnValue({ toasts: [] });
  });

  it('renders toaster with the derived light surface styles', () => {
    renderWithSurface(lightSurface);

    expect(toasterSpy).toHaveBeenCalled();
    const props = toasterSpy.mock.calls[0][0];
    expect(props.position).toBe('bottom-center');
    expect(props.toastOptions.style.backgroundColor).toBe(lightSurface.secondary);
    expect(props.toastOptions.style.color).toBe(lightSurface.secondaryContrastText);
  });

  it('renders toaster with the derived dark surface styles', () => {
    renderWithSurface(darkSurface);

    const props = toasterSpy.mock.calls[0][0];
    expect(props.toastOptions.style.backgroundColor).toBe(darkSurface.secondary);
    expect(props.toastOptions.style.color).toBe(darkSurface.secondaryContrastText);
  });

  it('dismisses only visible toasts over the limit', () => {
    useToasterStoreMock.mockReturnValue({
      toasts: [
        { id: 't1', visible: true },
        { id: 't2', visible: true },
        { id: 't3', visible: true },
        { id: 't4', visible: false },
        { id: 't5', visible: true },
      ],
    });

    renderWithSurface(lightSurface);

    expect(toast.dismiss).toHaveBeenCalledWith('t3');
    expect(toast.dismiss).toHaveBeenCalledWith('t5');
    expect(toast.dismiss).not.toHaveBeenCalledWith('t4');
  });
});

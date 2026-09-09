import { beforeEach, describe, expect, it, vi } from 'vitest';

import CustomToaster from '@components/ui/CustomToaster';
import { render } from '@testing-library/react';
import toast from 'react-hot-toast';
import { useTheme as useAppTheme } from '@context/theme/ThemeContext';

const useToasterStoreMock = vi.fn();
const toasterSpy = vi.fn();

vi.mock('@context/theme/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

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

describe('CustomToaster', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppTheme as any).mockReturnValue({ selectedTheme: 'light' });
    useToasterStoreMock.mockReturnValue({ toasts: [] });
  });

  it('renders toaster with light mode styles', () => {
    render(<CustomToaster />);

    expect(toasterSpy).toHaveBeenCalled();
    const props = toasterSpy.mock.calls[0][0];
    expect(props.position).toBe('bottom-center');
    expect(props.toastOptions.style.backgroundColor).toBe('#fff');
    expect(props.toastOptions.style.color).toBe('#333');
  });

  it('renders toaster with dark mode styles', () => {
    (useAppTheme as any).mockReturnValue({ selectedTheme: 'dark' });

    render(<CustomToaster />);

    const props = toasterSpy.mock.calls[0][0];
    expect(props.toastOptions.style.backgroundColor).toBe('#333');
    expect(props.toastOptions.style.color).toBe('#fff');
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

    render(<CustomToaster />);

    expect(toast.dismiss).toHaveBeenCalledWith('t3');
    expect(toast.dismiss).toHaveBeenCalledWith('t5');
    expect(toast.dismiss).not.toHaveBeenCalledWith('t4');
  });
});

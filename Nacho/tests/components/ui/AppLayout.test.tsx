import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import AppLayout from '@components/ui/AppLayout';

vi.mock('react-router-dom', () => ({
  Outlet: vi.fn(() => <div data-testid="outlet" />),
}));

vi.mock('@components/footer/FooterContainer', () => ({
  default: vi.fn(() => <div data-testid="footer" />),
}));

describe('AppLayout', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders CssBaseline, Outlet, and Footer', () => {
    render(<AppLayout />);

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('sets --vh CSS variable on mount', () => {
    render(<AppLayout />);

    const vh = window.innerHeight * 0.01;
    expect(document.documentElement.style.getPropertyValue('--vh')).toBe(`${vh}px`);
  });

  it('adds resize listener on mount and removes on unmount', () => {
    const { unmount } = render(<AppLayout />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('updates --vh variable when resize event is triggered', () => {
    render(<AppLayout />);

    const resizeHandler = addEventListenerSpy.mock.calls.find(
      (call: string[]) => call[0] === 'resize'
    )?.[1] as EventListener;

    // simulate window resize
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
    resizeHandler(new Event('resize'));

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe(`${800 * 0.01}px`);
  });
});

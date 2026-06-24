import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SettingsProvider } from '@context/settings/SettingsProvider';
import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { useSettings } from '@context/settings/SettingsContext';

vi.mock('@hooks/useLocalStorageState', () => ({
  useLocalStorageState: vi.fn(),
}));

const TestConsumer = () => {
  const { 
    enableExperimental,
    isFooterCompact, 
    isRightHanded,
    isStashCompact,
    toggleExperimental,
    toggleFooterCompact, 
    toggleHandedness,
    toggleCompactStash,
    shareOptions, 
    infoOptions,
    updateShareOptions,
    updateInfoOptions,
  } = useSettings();

  return (
    <div>
      <div data-testid="experimental-status">{enableExperimental ? 'enabled' : 'disabled'}</div>
      <div data-testid="footer-status">{isFooterCompact ? 'compact' : 'normal'}</div>
      <div data-testid="handedness-status">{isRightHanded ? 'right' : 'left'}</div>
      <div data-testid="stash-status">{isStashCompact ? 'compact' : 'normal'}</div>
      <div data-testid="share-youtube">{shareOptions.youtube.toString()}</div>
      <div data-testid="info-youtube">{infoOptions.youtube.toString()}</div>
      <button onClick={toggleExperimental}>Toggle Experimental</button>
      <button onClick={toggleFooterCompact}>Toggle Footer</button>
      <button onClick={toggleHandedness}>Toggle Handedness</button>
      <button onClick={toggleCompactStash}>Toggle Stash</button>
      <button onClick={() => updateShareOptions({ clipboard: true, youtube: false, stash: true })}>
        Update Share
      </button>
      <button onClick={() => updateInfoOptions({ clipboard: true, youtube: true, stash: false })}>
        Update Info
      </button>
    </div>
  );
};

describe('SettingsProvider', () => {
  const mockSetExperimental = vi.fn();
  const mockSetFooter = vi.fn();
  const mockSetRightHanded = vi.fn();
  const mockSetStashCompact = vi.fn();
  const mockSetShare = vi.fn();
  const mockSetInfo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'enableExperimental') return [initValue, mockSetExperimental];
      if (key === 'isFooterCompact') return [initValue, mockSetFooter];
      if (key === 'isRightHanded') return [initValue, mockSetRightHanded];
      if (key === 'isStashCompact') return [initValue, mockSetStashCompact];
      if (key === 'shareOptions') return [initValue, mockSetShare];
      if (key === 'infoOptions') return [initValue, mockSetInfo];
      // Fallback for others
      return [initValue, vi.fn()];
    });
  });

  it('provides default values and allows toggling boolean settings', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    expect(screen.getByTestId('footer-status').textContent).toBe('normal');

    const toggleBtn = screen.getByRole('button', { name: /toggle footer/i });
    fireEvent.click(toggleBtn);

    // Verify the setter was called with a functional update
    expect(mockSetFooter).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /toggle experimental/i }));
    fireEvent.click(screen.getByRole('button', { name: /toggle handedness/i }));
    fireEvent.click(screen.getByRole('button', { name: /toggle stash/i }));

    expect(mockSetExperimental).toHaveBeenCalled();
    expect(mockSetRightHanded).toHaveBeenCalled();
    expect(mockSetStashCompact).toHaveBeenCalled();
  });

  it('parses and validates complex object options from stringified storage', () => {
    const customShare = JSON.stringify({ clipboard: true, youtube: true, stash: false });
    
    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'shareOptions') return [customShare, mockSetShare];
      return [initValue, vi.fn()];
    });

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    // Should be parsed correctly back into a boolean
    expect(screen.getByTestId('share-youtube').textContent).toBe('true');
  });

  it('falls back to defaults when share options JSON is invalid', async () => {
    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'shareOptions') return ['{invalid-json', mockSetShare];
      return [initValue, vi.fn()];
    });

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    expect(screen.getByTestId('share-youtube').textContent).toBe('true');
    await waitFor(() => {
      expect(mockSetShare).toHaveBeenCalledWith(JSON.stringify({ clipboard: false, youtube: true, stash: true }));
    });
  });

  it('validates and fixes malformed JSON options on mount', async () => {
    const malformedShare = JSON.stringify({ clipboard: true }); // missing youtube/stash
    
    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'shareOptions') return [malformedShare, mockSetShare];
      return [initValue, vi.fn()];
    });

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    // The useEffect should trigger the validation and call setShareOptions with the merged defaults
    await waitFor(() => {
      expect(mockSetShare).toHaveBeenCalledWith(expect.stringContaining('"youtube":true'));
    });
  });

  it('validates and fixes malformed info options on mount', async () => {
    const malformedInfo = JSON.stringify({ stash: false });

    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'infoOptions') return [malformedInfo, mockSetInfo];
      return [initValue, vi.fn()];
    });

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    expect(screen.getByTestId('info-youtube').textContent).toBe('false');
    await waitFor(() => {
      expect(mockSetInfo).toHaveBeenCalledWith(JSON.stringify({ clipboard: false, youtube: false, stash: false }));
    });
  });

  it('updates share options via the provided method', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    const updateBtn = screen.getByRole('button', { name: /update share/i });
    fireEvent.click(updateBtn);

    expect(mockSetShare).toHaveBeenCalledWith(JSON.stringify({
      clipboard: true,
      youtube: false,
      stash: true
    }));
  });

  it('updates info options via the provided method', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /update info/i }));

    expect(mockSetInfo).toHaveBeenCalledWith(JSON.stringify({
      clipboard: true,
      youtube: true,
      stash: false,
    }));
  });
});
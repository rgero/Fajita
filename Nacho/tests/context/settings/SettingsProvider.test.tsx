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
    isFooterCompact, 
    toggleFooterCompact, 
    shareOptions, 
    updateShareOptions 
  } = useSettings();

  return (
    <div>
      <div data-testid="footer-status">{isFooterCompact ? 'compact' : 'normal'}</div>
      <div data-testid="share-youtube">{shareOptions.youtube.toString()}</div>
      <button onClick={toggleFooterCompact}>Toggle Footer</button>
      <button onClick={() => updateShareOptions({ clipboard: true, youtube: false, stash: true })}>
        Update Share
      </button>
    </div>
  );
};

describe('SettingsProvider', () => {
  const mockSetFooter = vi.fn();
  const mockSetShare = vi.fn();
  const mockSetInfo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocalStorageState).mockImplementation((initValue, key) => {
      if (key === 'isFooterCompact') return [initValue, mockSetFooter];
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
});
import { SettingsContext, defaultShareOptions, useSettings } from '@context/settings/SettingsContext';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { renderHook } from '@testing-library/react';

describe('useSettings', () => {
  it('should return default values when used without a provider (based on current implementation)', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.isFooterCompact).toBe(false);
    expect(result.current.shareOptions).toEqual(defaultShareOptions);
  });

  it('should return the provider value when wrapped in a SettingsProvider', () => {
    const mockValue = {
      isFooterCompact: true,
      isRightHanded: true,
      isStashCompact: true,
      enableExperimental: false,
      toggleExperimental: vi.fn(),
      toggleFooterCompact: vi.fn(),
      toggleCompactStash: vi.fn(),
      toggleHandedness: vi.fn(),
      shareOptions: defaultShareOptions,
      infoOptions: { clipboard: true, youtube: true, stash: true },
      updateShareOptions: vi.fn(),
      updateInfoOptions: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SettingsContext.Provider value={mockValue}>
        {children}
      </SettingsContext.Provider>
    );

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.isFooterCompact).toBe(true);
    expect(result.current.infoOptions.clipboard).toBe(true);
    
    // Test a method call
    result.current.toggleHandedness();
    expect(mockValue.toggleHandedness).toHaveBeenCalled();
  });
});
import { DEFAULT_SURFACE_SHIFT, deriveSurface } from '@utils/deriveSurface';
import { darken, lighten } from '@mui/material/styles';
import { describe, expect, it } from 'vitest';

describe('deriveSurface', () => {
  it('darkens the base color for light themes', () => {
    expect(deriveSurface('#FFFDF8', 'light')).toBe(darken('#FFFDF8', DEFAULT_SURFACE_SHIFT));
  });

  it('lightens the base color for dark themes', () => {
    expect(deriveSurface('#1E1E1E', 'dark')).toBe(lighten('#1E1E1E', DEFAULT_SURFACE_SHIFT));
  });

  it('uses DEFAULT_SURFACE_SHIFT when no amount is given', () => {
    expect(deriveSurface('#1E1E1E', 'dark')).toBe(deriveSurface('#1E1E1E', 'dark', DEFAULT_SURFACE_SHIFT));
  });

  it('honours a custom shift amount', () => {
    expect(deriveSurface('#1E1E1E', 'dark', 0.3)).toBe(lighten('#1E1E1E', 0.3));
    expect(deriveSurface('#1E1E1E', 'dark', 0.3)).not.toBe(deriveSurface('#1E1E1E', 'dark'));
  });

  it('produces a different color than the base', () => {
    expect(deriveSurface('#FFF7E8', 'light')).not.toBe('#FFF7E8');
  });

  it('returns the base unchanged when the color cannot be parsed', () => {
    expect(deriveSurface('not-a-color', 'dark')).toBe('not-a-color');
    expect(deriveSurface('', 'light')).toBe('');
  });
});

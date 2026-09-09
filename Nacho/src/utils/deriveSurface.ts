import { darken, lighten } from "@mui/material/styles";

export type SurfaceMode = "light" | "dark";

export const DEFAULT_SURFACE_SHIFT = 0.1;

// Light themes shift darker and dark themes shift lighter, so a derived surface always reads as raised against its base.
export const deriveSurface = (base: string, mode: SurfaceMode, amount: number = DEFAULT_SURFACE_SHIFT): string => {
  try {
    return mode === "dark" ? lighten(base, amount) : darken(base, amount);
  } catch {
    return base;
  }
};

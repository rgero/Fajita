/**
 * Function to offset a hex color by a specified amount.
 * @param {string} hex - The original hex color code.
 * @param {number} offset - The amount to offset the color by (-255 to 255).
 * @returns {string} - The new hex color code.
 */
export const offsetHexColor = (hex: string, offset: number) : string => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hex color to its RGB components
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Offset each component and clamp the value between 0 and 255
  r = Math.min(255, Math.max(0, r + offset));
  g = Math.min(255, Math.max(0, g + offset));
  b = Math.min(255, Math.max(0, b + offset));

  // Convert each component back to hex and pad with zeroes if necessary
  const newHex = (
    (1 << 24) +
    (r << 16) +
    (g << 8) +
    b
  ).toString(16).slice(1).toUpperCase();

  return `#${newHex}`;
}
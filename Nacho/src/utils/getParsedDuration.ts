export const getParsedDuration = (duration: number|string): string => {
  if (typeof duration === 'string') {
    return duration;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = String(duration % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

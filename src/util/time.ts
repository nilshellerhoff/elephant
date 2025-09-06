export const YEAR = 365.25 * 24 * 60 * 60;
export const MONTH = 30 * 24 * 60 * 60;
export const DAY = 24 * 60 * 60;
export const HOUR = 60 * 60;
export const MINUTE = 60;

export const displayTimeAgo = (timestamp: number): string => {
  const secondsAgo = Math.floor(new Date().getTime() / 1000) - timestamp;

  if (secondsAgo >= YEAR) return `${Math.floor(secondsAgo / YEAR)}y`;
  else if (secondsAgo >= DAY) return `${Math.floor(secondsAgo / DAY)}d`;
  else if (secondsAgo >= HOUR) return `${Math.floor(secondsAgo / HOUR)}h`;
  else if (secondsAgo >= MINUTE) return `${Math.floor(secondsAgo / MINUTE)}m`;
  else return `${secondsAgo}s`;
};

/**
 * Get the duration as a string formatted mm:ss from a number of seconds
 * @param durationSeconds number of seconds, e.g. 96
 * @return formatted string, e.g. 1:36
 */
export const getDurationStr = (durationSeconds: number): string => {
  const minutes = Math.floor(durationSeconds / 60);
  const zeroPaddedSeconds = String(durationSeconds % 60).padStart(2, '0');
  return `${minutes}:${zeroPaddedSeconds}`;
};

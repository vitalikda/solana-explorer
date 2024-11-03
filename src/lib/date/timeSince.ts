const ranges = [
  ["years", 60 * 60 * 24 * 365],
  ["months", 60 * 60 * 24 * 30],
  ["weeks", 60 * 60 * 24 * 7],
  ["days", 60 * 60 * 24],
  ["hours", 60 * 60],
  ["minutes", 60],
  ["seconds", 1],
] as const;

export const timeSince = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;

      return new Intl.RelativeTimeFormat("en").format(
        Math.round(delta),
        rangeType,
      );
    }
  }
};

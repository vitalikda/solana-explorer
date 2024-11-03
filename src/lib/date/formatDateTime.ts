export const formatDateTime = (
  value: Date | string,
  options?: {
    locale?: string;
  } & Intl.DateTimeFormatOptions,
) => {
  const {
    locale = "en",
    year = "numeric",
    month = "short",
    day = "numeric",
    hour = "2-digit",
    minute = "2-digit",
    second = "2-digit",
    hour12 = false,
  } = options ?? {};
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(locale, {
    year,
    month,
    day,
    hour,
    minute,
    second,
    hour12,
  }).format(date);
};

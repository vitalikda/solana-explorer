export const formatNumber = (
  value: number,
  options?: {
    locale?: string;
    decimals?: number;
    maxDigits?: number;
  },
) => {
  const { locale = "en", decimals = 1, maxDigits = 1 } = options ?? {};

  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: decimals,
    maximumSignificantDigits: maxDigits,
  }).format(value);
};

export const formatMoney = (
  value: number,
  options?: {
    locale?: string;
    currency?: string;
    decimals?: number;
    maxDigits?: number;
  },
) => {
  const { locale = "en", currency = "USD" } = options ?? {};

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

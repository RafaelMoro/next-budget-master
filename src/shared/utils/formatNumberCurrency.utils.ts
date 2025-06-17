const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatNumberToCurrency = (amount: number): string =>
  formatter.format(amount);

export const formatCurrencyToNumber = (currency: string) => Number(currency.replace(/[^0-9.-]+/g, ''));
export const formatCurrencyToString = (currency: string) => currency.replace(/[^0-9.-]+/g, '');
export const cleanCurrencyString = (currency: string): number => {
  // Remove dollar sign and commas, then parse as float
  const cleaned = currency.replace(/[$,]/g, '');
  return parseFloat(cleaned);
};
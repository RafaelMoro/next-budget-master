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
  // Remove dollar sign and commas
  const cleaned = currency.replace(/[$,]/g, '');
  // Si tiene tres decimales, recorre el punto decimal
  const match = cleaned.match(/^(\d+)\.(\d{3})$/);
  if (match) {
    // Unir los dígitos y colocar el punto antes de los dos últimos
    const allDigits = match[1] + match[2];
    const result = allDigits.slice(0, -2) + '.' + allDigits.slice(-2);
    return parseFloat(result);
  }
  return parseFloat(cleaned);
};
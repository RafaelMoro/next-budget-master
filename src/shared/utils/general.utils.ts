export function hasFourDigits(num: number): boolean {
  const str = Math.abs(num).toString();
  return str.length === 4;
}
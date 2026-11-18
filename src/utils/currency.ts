export function formatPKR(amount: number): string {
  const formattedNumber = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `PKR ${formattedNumber}`;
}

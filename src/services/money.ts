export function formatMoney(value: number) {
  return (value / 100)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .slice(0, -3);
}

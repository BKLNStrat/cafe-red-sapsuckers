/** Normalize price to whole dollars: "$15.00" → "$15", "$16.00+" → "$16+", "Market" → "Market" */
export function formatPrice(price: string): string {
  return price.replace(/(\$\d+)\.00/g, '$1');
}

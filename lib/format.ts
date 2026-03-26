/** Format a number in compact K notation: 29350 -> "29.4K", 1500 -> "1.5K", 350 -> "350" */
export function formatK(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1000) {
    const k = value / 1000
    return `${k.toFixed(1)}K`
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

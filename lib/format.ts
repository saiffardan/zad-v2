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

/** Format number with commas: 29350 -> "29,350" */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Format as currency: 29350 -> "29,350.00" */
export function formatCurrency(value: number, decimals = 2): string {
  return Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Format percentage: 0.1861 -> "18.6%" */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/** Format date from DD/MM/YYYY to readable: "01/03/2026" -> "Mar 1" */
export function formatDate(dateStr: string): string {
  const [d, m] = dateStr.split("/").map(Number)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[m - 1]} ${d}`
}

/** Format date with year: "01/03/2026" -> "Mar 1, 2026" */
export function formatDateFull(dateStr: string): string {
  const [d, m, y] = dateStr.split("/").map(Number)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[m - 1]} ${d}, ${y}`
}

// Formatting helpers — ported 1:1 from the Claude Design canvas Component class.

export function euro(n: number): string {
  return n.toLocaleString("fr-FR").replace(/ | /g, " ") + " €";
}

export function num(n: number): string {
  return n.toFixed(1).replace(".", ",");
}

export function barColor(v: number): string {
  return v >= 9 ? "#3E6B55" : v >= 8 ? "#5A3828" : "#B77945";
}

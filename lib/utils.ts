/**
 * Calculates the pace in minutes per kilometer.
 * @param distance Distance in kilometers.
 * @param time Time in minutes.
 * @returns Pace in minutes per kilometer.
 */
export function calculatePace(distance: number, time: number): string {
  if (distance <= 0) return "0:00";
  const paceTotalMinutes = time / distance;
  const minutes = Math.floor(paceTotalMinutes);
  const seconds = Math.round((paceTotalMinutes - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Merges class names using tailwind-merge (if installed) or simple join.
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

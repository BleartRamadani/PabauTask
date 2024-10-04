export function convertTo12HourFormat(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour: number = parseInt(hourStr, 10);

  const amPm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour: number = hour % 12 || 12;
  return `${adjustedHour.toString().padStart(2, '0')}:${minute} ${amPm}`;
}
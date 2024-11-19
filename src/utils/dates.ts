export function addLeadingZero(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

export function convertServicesDurationToMinutes(duration: string): number {
  const [hours, minutes] = duration.split(':');

  return Number(hours) * 60 + Number(minutes);
}

export function addLeadingZero(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

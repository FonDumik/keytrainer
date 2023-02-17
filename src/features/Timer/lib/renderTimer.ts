export function renderToTimer(currentTime: number) {
  let minutes: number = Math.floor(currentTime / 60);
  let seconds: number | string = Math.floor(currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

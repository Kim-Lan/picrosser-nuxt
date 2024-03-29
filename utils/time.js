// input time in milliseconds, output formatted string
export function formatTime(time) {
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor(time /(60 * 1000)) % 60;
  const seconds = Math.floor(time / 1000) % 60;
  const milliseconds = Math.floor(time % 1000);
  const hoursString = hours > 0 ? hours.toString().padStart(2, '0') + ':' : '';
  return hoursString
    + minutes.toString().padStart(2, '0') + ':'
    + seconds.toString().padStart(2, '0') + '.'
    + milliseconds.toString().padStart(3, '0');
}

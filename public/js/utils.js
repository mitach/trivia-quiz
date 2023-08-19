export function generateDate() {
  const newDate = new Date();
  const hours = newDate.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = newDate.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}

const daysUntilEvent = Number(prompt("How many days until the event? 🗓️"));
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date();

function getEventDay(daysUntilEvent) {
  const todayIndex = today.getDay();
  const eventIndex = (todayIndex + daysUntilEvent) % 7;
  return weekdays[eventIndex];
}

document.getElementById("eventApp").innerHTML = `
  <p>Today is: ${weekdays[today.getDay()]}</p>
  <p>The event in ${daysUntilEvent} days will be on: ${getEventDay(
  daysUntilEvent
)}</p>
`;

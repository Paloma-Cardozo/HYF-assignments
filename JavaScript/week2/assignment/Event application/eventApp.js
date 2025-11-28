const input = prompt("How many days until the event? 🗓️");
const daysUntilEvent = Number(input);

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
  if (!input || isNaN(daysUntilEvent) || daysUntilEvent < 0) {
    document.getElementById("eventApp").innerHTML = `
    <p>Please enter a valid, non-negative number.</p>
  `;
  } else {
    const todayIndex = today.getDay();
    const eventIndex = (todayIndex + daysUntilEvent) % 7;

    document.getElementById("eventApp").innerHTML = `
  <p>Today is: ${weekdays[todayIndex]}</p>
  <p>The event in ${daysUntilEvent} days will be on: ${weekdays[eventIndex]}</p>
`;
  }
}

getEventDay(daysUntilEvent);

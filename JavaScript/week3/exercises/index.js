// ⭐ Item array removal ⭐

const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];

const nameToRemove = "Ahmad";

const indexToRemove = names.indexOf(nameToRemove);

names.splice(indexToRemove, 1);

console.log(names);

// ⭐ When will we be there?? ⭐

const travelInformation = {
  speed: 50, // kilometers per hour
  destinationDistance: 432, // kilometers
};

function getTimeInformation(travelInformation) {
  const timeFormula =
    travelInformation.destinationDistance / travelInformation.speed; // hours (possible float number)

  function getMinutes() {
    const hoursFormula = Math.floor(timeFormula); // hours (integer number)

    const fractionalFormula = timeFormula - hoursFormula; // fractional part of hours

    const minutesFormula = Math.round(fractionalFormula * 60); // minutes (integer number)

    return `The travel will take ${hoursFormula} hours and ${minutesFormula} minutes.`;
  }

  return getMinutes();
}

const travelTime = getTimeInformation(travelInformation);
console.log(travelTime);

// ⭐ Series duration of my life ⭐

const seriesDurations = [
  {
    title: "Game of thrones",
    days: 4,
    hours: 6,
    minutes: 26,
  },
  {
    title: "Stranger Things",
    days: 1,
    hours: 10,
    minutes: 18,
  },
  {
    title: "Friends",
    days: 7,
    hours: 18,
    minutes: 2,
  },
];

function getTimeWatchingSeries(seriesDurations) {
  const lifeExpectancy = 80 * 365 * 24 * 60; // life expectancy in minutes
  let totalPercentage = 0;

  for (let i = 0; i < seriesDurations.length; i++) {
    const series = seriesDurations[i];
    const seriesInMinutes =
      series.days * 24 * 60 + series.hours * 60 + series.minutes; // series in minutes
    const percentageWatchingSeries = (seriesInMinutes * 100) / lifeExpectancy;

    totalPercentage += percentageWatchingSeries;

    console.log(
      `${series.title} took ${percentageWatchingSeries.toFixed(5)}% of my life.`
    );
  }

  console.log(`In total that is ${totalPercentage.toFixed(5)}% of my life.`);
}

getTimeWatchingSeries(seriesDurations);

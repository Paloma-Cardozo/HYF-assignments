const temperature = Number(
  prompt("What's the temperature outside in Celsius? 🌡️")
);
const plans = prompt(
  "Do you have any outdoor plans today? (yes/no) 🌳"
).toLowerCase();

function temperatureAdvice(plans, temperature) {
  if (plans === "no") {
    return "🏠 Since you don't have outdoor plans, dress comfortably for staying indoors! 🏠";
  }

  if (temperature < 0) {
    return "❄️ It's freezing outside! 🧤 Wear a heavy coat, scarf, gloves, and boots. ❄️";
  }

  if (temperature < 10) {
    return "🌥️ It's quite cold! 🧣 Wear a warm jacket, sweater, and closed shoes. 🌥️";
  }

  if (temperature < 20) {
    return "🌤️ It's a bit chilly! 🧥 Wear a light jacket or sweater and long pants. 🌤️";
  }

  if (temperature < 30) {
    return "☀️ The weather is warm! 👚 A t-shirt and shorts should be fine. ☀️";
  }

  return "🔥 It's hot outside! 🩳 Wear light clothing, a hat, and stay hydrated. 🔥";
}

const advice = temperatureAdvice(plans, temperature);

document.getElementById("weatherWearApp").innerHTML = `<p>${advice}</p>`;

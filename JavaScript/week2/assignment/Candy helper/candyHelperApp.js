const boughtCandyPrices = [];

function addCandy(candyType, weight) {
  const pricePerGram = {
    sweet: 0.5,
    chocolate: 0.7,
    toffee: 1.1,
    chewing_gum: 0.03,
  };

  if (!pricePerGram[candyType]) {
    return `Unknown candy type: ${candyType}`;
  }

  const price = weight * pricePerGram[candyType];
  boughtCandyPrices.push(price);

  return `Added ${weight}g of ${candyType} for ${price}$.`;
}

const amountToSpend = Math.random() * 100;

function canBuyMoreCandy() {
  const totalSpent = boughtCandyPrices;

  if (totalSpent < amountToSpend) {
    return "You can buy more, so please do! 🍬🍭🍫";
  } else {
    return "Enough candy for you! 💸";
  }
}

document.getElementById("addCandyButton").addEventListener("click", () => {
  const candyType = document.getElementById("candyType").value.trim();
  const weight = Number(document.getElementById("candyQuantity").value);

  const message = addCandy(candyType, weight);
  const moreCandyMessage = canBuyMoreCandy();

  document.getElementById(
    "candyHelperApp"
  ).innerHTML = `<p>${message}</p><p>${moreCandyMessage}</p>`;
});

function identifyCard(cardNumberString) {
  const firstDigit = cardNumberString[0];
  const firstTwo = cardNumberString.slice(0, 2);
  const firstFour = cardNumberString.slice(0, 4);

  if (firstDigit === "4") {
    return "Visa";
  } else if (
    (firstTwo >= "51" && firstTwo <= "55") ||
    (firstFour >= "2221" && firstFour <= "2720")
  ) {
    return "MasterCard";
  } else if (firstTwo === "34" || firstTwo === "37") {
    return "American Express";
  } else {
    return "Unknown";
  }
}

function formatCreditCardNumber(cardNumberString) {
  let formatted = "";

  for (let i = 0; i < cardNumberString.length; i++) {
    formatted += cardNumberString[i];

    if ((i + 1) % 4 === 0 && i !== cardNumberString.length - 1) {
      formatted += " ";
    }
  }

  return {
    original: cardNumberString,
    formatted: formatted,
  };
}

const cardInput = document.getElementById("card-number");

cardInput.addEventListener("input", function () {
  const value = cardInput.value;
  let number = "";

  for (let i = 0; i < value.length; i++) {
    if (value[i] >= "0" && value[i] <= "9") {
      number += value[i];
    }
  }

  if (number === "") {
    console.log("Input must be a valid number");
    return;
  }

  const formattedCreditCardObject = formatCreditCardNumber(number);
  cardInput.value = formattedCreditCardObject.formatted;

  const cardType = identifyCard(number);
  console.log("Card type:", cardType);

  console.log(formattedCreditCardObject);
});

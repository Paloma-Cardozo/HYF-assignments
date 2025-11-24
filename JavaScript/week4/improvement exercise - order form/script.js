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
  console.log(formattedCreditCardObject);
});

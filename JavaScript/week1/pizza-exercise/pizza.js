console.log("I love pizza 🍕");

const pizzaMenu = {
  Hawaiian: 100,
  Four_Cheese: 120,
  Margherita: 150,
  Pepperoni: 89,
  Diavola: 105,
  Mushroom: 115,
  Marinara: 95,
};
console.log(pizzaMenu);

// My favourite pizza and its price

const myFavouritePizza = Object.keys(pizzaMenu)[1];
console.log(myFavouritePizza);

const priceFavouritePizza = Object.values(pizzaMenu)[1];
console.log(priceFavouritePizza);

// Now I know how to ask the client! 🤭

const clientFavouritePizza = prompt(
  "👩🏻‍🍳 Choose your pizza: Hawaiian, Four_Cheese, Margherita, Pepperoni, Diavola, Mushroom, Marinara 🍕"
);

const priceSelectedPizza = pizzaMenu[clientFavouritePizza];

// Validate pizza exists and its price

if (!priceSelectedPizza) {
  console.log("Sorry! That pizza is not on the menu 🥲");
} else {
  console.log(
    `👩🏻‍🍳 New pizza order: ${clientFavouritePizza}. The price of the pizza is: ${priceSelectedPizza} DKK 🍕`
  );

  // Amount of pizzas to order

  const amountPizzas = Number(prompt("👩🏻‍🍳 How many pizzas do you want? 🍕"));

  // Eat here or takeaway

  const placeToEat = prompt("👩🏻‍🍳 Do you want takeaway? (yes/no) 🍽️");

  const takeawayAnswer = placeToEat.toLowerCase() === "yes" ? true : false;

  // Calculating total price of the order

  const totalPrice = priceSelectedPizza * amountPizzas;

  // Final message for the chef

  console.log(
    `👩🏻‍🍳 New pizza order (takeaway: ${takeawayAnswer}): ${amountPizzas} ${clientFavouritePizza}. The cost for the order is: ${totalPrice} DKK 🍕`
  );
}

console.log("I love pizza");

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

const myFavouritePizza = Object.keys(pizzaMenu)[2];
console.log(myFavouritePizza);

const priceFavouritePizza = Object.values(pizzaMenu)[2];
console.log(priceFavouritePizza);

const amountPizza = 1;
console.log(amountPizza);

const familySize = true;

console.log(
  `New pizza order: ${myFavouritePizza}. The price of the pizza is: ${priceFavouritePizza}`
);

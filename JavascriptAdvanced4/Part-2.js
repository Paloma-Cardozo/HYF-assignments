import { teas } from "./teas.js";

// Add a priceFor(grams) method to your Tea class that returns the price for a given weight. (Exercise 5)
// Add a describe() method that returns a formatted string. (Exercise 6)

const teaTypes = ["green", "black", "herbal", "oolong", "white"];

export class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    }
    if (!teaTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    return `${this.name} (${this.type}) from ${this.origin} - ${(this.pricePerGram * 100).toFixed(2)} DKK/100g`;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const earlGrey = new Tea("Earl Grey", "black", "India", 0.08, false);

console.log(sencha.priceFor(100));
console.log(sencha.priceFor(50));
console.log(sencha.describe());
console.log(earlGrey.describe());

// Create an OrderItem class that takes a Tea instance and a number of grams. Add a lineTotal() method. (Exercise 7)
// Add a describe() method to OrderItem that returns a formatted line. (Exercise 8)

export class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${(this.lineTotal().toFixed(2))} DKK`;
  }
}

const item = new OrderItem(sencha, 200);

console.log(item.tea.name);
console.log(item.grams);
console.log(item.lineTotal());
console.log(item.describe());

const teaInstances = teas.map((tea) => new Tea(tea.name, tea.type, tea.origin, tea.pricePerGram, tea.organic));
  
const items = [
  new OrderItem(teaInstances[0], 100),
  new OrderItem(teaInstances[1], 200),
  new OrderItem(teaInstances[7], 50),
];

items.map((item) => item.describe()).forEach((line) => console.log(line));


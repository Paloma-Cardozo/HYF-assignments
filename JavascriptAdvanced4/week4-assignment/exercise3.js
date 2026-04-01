import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";

// Build an Inventory class that tracks stock for multiple teas.

class Inventory {
  constructor() {
    this.stock = {};
  }

  add(tea, stockCount) {
    this.stock[tea.name] = {
      tea,
      stockCount,
    };
  }

  sell(teaName, grams) {
    if (this.stock[teaName].stockCount < grams) {
      throw new Error(
        `Not enough stock for ${this.stock[teaName].tea.name} (have ${this.stock[teaName].stockCount}, need ${grams})`,
      );
    } else {
      return (this.stock[teaName].stockCount -= grams);
    }
  }

  restock(teaName, grams) {
    return (this.stock[teaName].stockCount += grams);
  }

  getStock(teaName) {
    return this.stock[teaName].stockCount;
  }

  getLowStock(threshold) {
    return Object.values(this.stock).filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    return Object.values(this.stock).reduce(
      (total, item) => total + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha"));

inventory.sell("Sencha", 50);

console.log("After selling 50g:", inventory.getStock("Sencha"));
console.log("Low stock (< 50):");

inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);

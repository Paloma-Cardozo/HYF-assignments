import { teas } from "./teas.js";

// Add a static fromObject(obj) factory method to your Tea class that creates a Tea from a plain object. (Exercise 15)
// Add these static utility methods to your Tea class. (Exercise 16)

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

  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }

  static findCheapest(teas) {
    return teas.reduce((cheapest, tea) => {
      if (tea.pricePerGram < cheapest.pricePerGram) {
        return tea;
      }
      return cheapest;
    });
  }

  static findMostExpensive(teas) {
    return teas.reduce((expensive, tea) => {
      if (tea.pricePerGram > expensive.pricePerGram) {
        return tea;
      }
      return expensive;
    });
  }

  static averagePrice(teas) {
    const total = teas.reduce((sum, tea) => sum + tea.pricePerGram, 0);
    return total / teas.length;
  }
}

const teaInstances = teas.map(Tea.fromObject);

console.log(teaInstances[0].describe());
console.log(teaInstances[0].priceFor(100));
console.log(Tea.findCheapest(teaInstances).name);
console.log(Tea.findMostExpensive(teaInstances).name);
console.log(Tea.averagePrice(teaInstances).toFixed(2));

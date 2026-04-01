import { teas } from "../teas.js";

// Build a complete Tea class with validation and a static factory method.

const teaTypes = ["green", "black", "herbal", "oolong", "white"];

export class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (pricePerGram <= 0) {
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
    if (this.organic) {
      return `${this.name} (${this.type}) from ${this.origin} - ${(this.pricePerGram * 100).toFixed(2)} DKK/100g [organic]`;
    }
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
}

try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (error) {
  console.log(error.message);
}

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (error) {
  console.log(error.message);
}

const teaInstances = teas.map(Tea.fromObject);

console.log(teaInstances.length);
console.log(teaInstances[0].describe());
console.log(teaInstances[1].describe());

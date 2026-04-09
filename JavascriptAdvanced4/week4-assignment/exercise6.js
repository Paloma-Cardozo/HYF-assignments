import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";
import { OrderItem, Order } from "./exercise2.js";

// Build specialized classes using inheritance.

class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    if (!["A", "B", "C"].includes(grade)) {
      throw new Error(`Invalid grade: ${grade}`);
    }

    super(name, type, origin, pricePerGram, organic);
    this.grade = grade;
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);

    if (this.grade === "A") {
      return basePrice * 1.5;
    } else if (this.grade === "B") {
      return basePrice * 1.25;
    } else if (this.grade === "C") {
      return basePrice * 1.1;
    }
  }

  describe() {
    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${this.priceFor(100).toFixed(2)} DKK/100g`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}

class ExpressOrder extends Order {
  constructor(expressFee) {
    super();
    this.expressFee = expressFee || 25;
  }

  getTotal() {
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    const header = `Order (${this.status}) - ${this.items.length} items`;
    const lines = this.items.map((item) => `  ${item.describe()}`).join("\n");
    const fee = `Express fee: ${this.expressFee.toFixed(2)} DKK`;
    const total = `Total: ${this.getTotal().toFixed(2)} DKK`;

    return `${header}\n${lines}\n${fee}\n${total}`;
  }
}

const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
console.log(gyokuro.priceFor(100));

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");
console.log(upgraded.describe());

const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));
console.log(express.getSummary());

console.log(express.getTotal());

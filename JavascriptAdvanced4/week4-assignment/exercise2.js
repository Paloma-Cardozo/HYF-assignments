import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";

export class OrderItem {
  constructor(tea, grams) {
    if (typeof grams !== "number" || grams <= 0) {
      throw new Error("Grams must be a positive number");
    }

    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

export class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (this.status !== "pending") {
      throw new Error(`Cannot add items to a ${this.status} order`);
    } else {
      this.items.push(orderItem);
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.lineTotal(), 0);
  }

  getSummary() {
    const header = `Order (${this.status}) - ${this.items.length} items`;
    const lines = this.items.map((item) => `  ${item.describe()}`).join("\n");
    const total = `Total: ${this.getTotal().toFixed(2)} DKK`;

    return `${header}\n${lines}\n${total}`;
  }
}

const teaInstances = teas.map(Tea.fromObject);
const order = new Order();

order.addItem(new OrderItem(teaInstances[0], 200));
order.addItem(new OrderItem(teaInstances[7], 50));

console.log(order.getSummary());
console.log("Total:", order.getTotal().toFixed(2), "DKK");

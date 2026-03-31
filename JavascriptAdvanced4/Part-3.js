import { teas } from "./teas.js";
import { Tea } from "./Part-2.js";
import { OrderItem } from "./Part-2.js";

// Create an Inventory class that tracks stock for a tea. It should have sell(grams) and restock(grams) methods. (Exercise 9)

class Inventory {
  constructor(tea, stockCount) {
    this.tea = tea;
    this.stockCount = stockCount;
  }

  sell(grams) {
    if (this.stockCount < grams) {
      throw new Error(
        `Not enough stock for ${this.tea.name} (have ${this.stockCount}, need ${grams})`,
      );
    } else {
      return (this.stockCount -= grams);
    }
  }

  restock(grams) {
    this.stockCount += grams;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const stock = new Inventory(sencha, 150);

console.log(stock.stockCount);
stock.sell(50);

console.log(stock.stockCount);
stock.restock(200);

console.log(stock.stockCount);

try {
  stock.sell(500);
} catch (error) {
  console.log(error.message);
}

// Create an Order class with status transitions. An order starts as "pending" and can move through: pending → confirmed → shipped → delivered. (Exercise 10).
// Add a getTotal() method to your Order class that uses .reduce() to sum all item totals. (Exercise 11)

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

  confirm() {
    if (this.status === "pending") {
      this.status = "confirmed";
    }
  }

  ship() {
    if (this.status === "confirmed") {
      this.status = "shipped";
    }
  }

  deliver() {
    if (this.status === "shipped") {
      this.status = "delivered";
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.lineTotal(), 0);
  }

  getSummary() {
    const header = `Order (${this.status}) - ${this.items.length} items`;
    const lines = this.items.map((item) => `- ${item.describe()}`).join("\n");
    const total = `Total: ${this.getTotal().toFixed(2)} DKK`;

    return `${header}\n${lines}\n${total}`;
  }
}

const order = new Order();

order.addItem(new OrderItem(sencha, 100));
console.log(order.status);

order.confirm();
console.log(order.status);

try {
  order.addItem(new OrderItem(sencha, 50));
} catch (error) {
  console.log(error.message);
}

order.ship();
order.deliver();
console.log(order.status);

const newOrder = new Order();

newOrder.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
newOrder.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);

console.log(newOrder.getTotal());
console.log(newOrder.getSummary());

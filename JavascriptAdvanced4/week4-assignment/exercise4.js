import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";
import { OrderItem, Order } from "./exercise2.js";

// Build a Customer class that tracks order history and spending.

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    if (order.status === "pending") {
      order.status = "confirmed";
    }

    this.orders.push(order);
    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }

  getOrderHistory() {
    const header = `${this.name} (${this.email}) - ${this.orders.length} orders`;
    const lines = this.orders
      .map(
        (order, index) =>
          `Order ${index + 1} (${order.status}) - ${order.items.length} item\n${order.items.map((item) => `  ${item.describe()}`).join("\n")}\nTotal: ${order.getTotal().toFixed(2)} DKK`,
      )
      .join("\n\n");
    const lifetime = `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;

    return `${header}\n\n${lines}\n\n${lifetime}`;
  }
}

const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");

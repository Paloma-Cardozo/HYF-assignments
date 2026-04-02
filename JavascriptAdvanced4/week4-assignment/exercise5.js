import { teas } from "../teas.js";
import { Customer } from "./exercise4.js";
import { Inventory } from "./exercise3.js";
import { OrderItem, Order } from "./exercise2.js";
import { Tea } from "./exercise1.js";

// Build a TeaShop class that orchestrates all the other classes together.

class TeaCatalog {
  constructor(teas) {
    this.teas = teas;
  }

  search(query) {
    return this.teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  filterByType(type) {
    return this.teas.filter((tea) => tea.type === type);
  }
}

class TeaShop {
  constructor(teaData) {
    const teaInstances = teaData.map(Tea.fromObject);

    this.teaCatalog = new TeaCatalog(teaInstances);
    this.inventory = new Inventory();

    teaInstances.forEach((tea) => {
      const data = teaData.find((teaItem) => teaItem.name === tea.name);
      this.inventory.add(tea, data.stockCount);
    });

    this.customers = [];
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    const order = new Order();

    items.forEach(({ teaName, grams }) => {
      const tea = this.teaCatalog.search(teaName)[0];
      this.inventory.sell(teaName, grams);
      order.addItem(new OrderItem(tea, grams));
    });

    customer.placeOrder(order);
    return order;
  }

  getReport() {
    const totalOrders = this.customers.reduce(
      (total, customer) => total + customer.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (total, customer) => total + customer.totalSpent(),
      0,
    );
    const lowStock = this.inventory.getLowStock(50);

    return [
      `Total customers: ${this.customers.length}`,
      `Total orders: ${totalOrders}`,
      `Total revenue: ${totalRevenue.toFixed(2)} DKK`,
      `Low stock items: ${lowStock.length}`,
    ].join("\n");
  }
}

const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

try {
  const order1 = shop.createOrder(alex, [
    { teaName: "Sencha", grams: 100 },
    { teaName: "Matcha", grams: 50 },
  ]);
  console.log(order1.getSummary());
} catch (error) {
  console.log(error.message);
}

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());

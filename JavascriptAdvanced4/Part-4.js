import { teas } from "./teas.js";
import { OrderItem, Tea } from "./Part-2.js";
import { Order } from "./Part-3.js";

// Create a TeaCatalog class that holds Tea instances and provides search/filter methods. (Exercise 12)

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

const catalog = new TeaCatalog(
  teas.map(
    (tea) =>
      new Tea(tea.name, tea.type, tea.origin, tea.pricePerGram, tea.organic),
  ),
);

console.log(catalog.search("earl"));
console.log(catalog.filterByType("green").map((tea) => tea.name));

// Create a Customer class that can place orders. (Exercise 13)

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    this.orders.push(order);
    order.confirm();
    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }
}

const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);
customer.placeOrder(order2);

console.log(customer.orders.length);
console.log(customer.totalSpent());

//Bring it together: create a catalog, find teas, create an order, and assign it to a customer. (Exercise 14)

const japaneseTeas = catalog.search("").filter((tea) => tea.origin === "Japan");

const order = new Order();
japaneseTeas.forEach((tea) => {
  order.addItem(new OrderItem(tea, 100));
});

const customer1 = new Customer("Tea Lover", "lover@tea.com");
customer1.placeOrder(order);

console.log(`${customer1.name} ordered ${order.items.length} Japanese teas`);
console.log(`Total: ${customer1.totalSpent().toFixed(2)} DKK`);

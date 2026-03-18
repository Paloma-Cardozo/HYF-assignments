import { teas } from "../teas.js";
import fs from "fs";

// Create an order processing system with simulated delays.

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(function () {
    const errors = [];

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const teaChecked = teas.find(function (tea) {
        return tea.id === item.teaId;
      });

      if (!teaChecked) {
        errors.push("Tea with id " + item.teaId + " not found");
      }
    }

    callback({ valid: errors.length === 0, errors: errors });
  }, 200);
}

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

function calculateTotal(order, callback) {
  setTimeout(function () {
    let totalValue = 0;

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const teaChecked = teas.find(function (tea) {
        return tea.id === item.teaId;
      });

      const itemValue = teaChecked.pricePerGram * item.grams;
      totalValue = totalValue + itemValue;
    }

    callback({ orderId: order.id, total: totalValue });
  }, 300);
}

calculateTotal(order, (result) => {
  console.log("Validation result:", result);
});

function checkStock(order, callback) {
  setTimeout(function () {
    const shortages = [];

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const teaChecked = teas.find(function (tea) {
        return tea.id === item.teaId;
      });

      if (teaChecked.stockCount < item.grams) {
        shortages.push(
          teaChecked.name +
            ": needs" +
            item.grams +
            "grams, only " +
            teaChecked.stockCount +
            "grams in stock",
        );
      }
    }

    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
}

checkStock(order, (result) => {
  console.log("Validation result:", result);
});

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stock) => {
        console.log(
          "Stock check - in stock:",
          stock.inStock,
          "| shortages:",
          stock.shortages,
        );
      });
    });
  });
}

processOrder(order);

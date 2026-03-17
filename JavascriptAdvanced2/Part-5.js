import { teas } from "./teas.js";
import fs from "fs";

// Write code that reads the file and logs how many orders there are:

fs.readFile("./orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }

  const orders = JSON.parse(data);
  console.log("Number of orders:", orders.length);
});

// For each order, look up the tea prices from the teas array

fs.readFile("./orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }

  const orders = JSON.parse(data);

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    let totalValue = 0;

    for (let index = 0; index < order.items.length; index++) {
      const item = order.items[index];
      const tea = teas.find(function (tea) {
        return tea.id === item.teaId;
      });

      const itemValue = tea.pricePerGram * item.grams;
      totalValue = totalValue + itemValue;
    }

    const itemCount = order.items.length;
    console.log(
      "Order " +
        order.id +
        ": " +
        totalValue.toFixed(2) +
        " DKK (" +
        itemCount +
        " item(s))",
    );
  }
});

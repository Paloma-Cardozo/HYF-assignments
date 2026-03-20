import { teas } from "../teas.js";
import fs from "fs";

// Inventory Aggregation from File

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    let inventoryUpdates;
    try {
      inventoryUpdates = JSON.parse(data);
    } catch (error) {
      callback(error, null);
      return;
    }

    const changes = inventoryUpdates.reduce(function (acc, update) {
      if (!acc[update.teaId]) acc[update.teaId] = 0;
      acc[update.teaId] = acc[update.teaId] + update.change;
      return acc;
    }, {});

    const report = [];
    const teaIds = Object.keys(changes);

    for (let i = 0; i < teaIds.length; i++) {
      const teaId = Number(teaIds[i]);
      const teaChecked = teas.find(function (tea) {
        return tea.id === teaId;
      });

      const change = changes[teaId];
      const newStock = teaChecked.stockCount + change;

      let diffString;
      if (change >= 0) {
        diffString = "+" + change;
      } else {
        diffString = "" + change;
      }

      let string =
        "- " +
        teaChecked.name +
        ": was " +
        teaChecked.stockCount +
        ", change " +
        diffString +
        ", now " +
        newStock;

      if (newStock < 0) string = string + " (NEGATIVE!)";

      report.push(string);
    }

    callback(null, report);
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }

  console.log(report);
});

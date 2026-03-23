const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a wait(ms) function that returns a Promise which resolves after ms milliseconds.

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

console.log("Starting...");
wait(2000).then(() => console.log("2 seconds passed!"));

// Create a fetchTeaWithTimeout(id, timeoutMs) function.

function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    const time = setTimeout(() => {
      reject(new Error("Time hits"));
    }, timeoutMs);

    fetch(`${API_BASE}/teas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        clearTimeout(time);
      });
  });
}

fetchTeaWithTimeout(1, 5000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));

fetchTeaWithTimeout(1, 1)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));

// Convert this callback-based function to return a Promise

import fs from "fs";

function readJsonFile(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      callback(null, parsed);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

function readJsonFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

readJsonFilePromise("./test.json")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

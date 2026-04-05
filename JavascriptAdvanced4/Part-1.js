import { teas } from "./teas.js";

// Create a Tea class with a constructor that accepts name, type, and origin. Create two instances and log them. (Exercise 1)

class Tea {
  constructor(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
  }
}

const sencha = new Tea("Sencha", "green", "Japan");
const earlGrey = new Tea("Earl Grey", "black", "India");

console.log(sencha.name);
console.log(sencha.type);
console.log(earlGrey.origin);

// Extend your Tea class to also accept pricePerGram and organic. Create an instance from the first tea in the data array. (Exercise 2)

class TeaExtended extends Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    super(name, type, origin);
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}

const firstTea = teas[0];

const tea = new TeaExtended(
  firstTea.name,
  firstTea.type,
  firstTea.origin,
  firstTea.pricePerGram,
  firstTea.organic,
);

console.log(tea);

// Create the Tea instances using .map() and your class. (Exercise 3)

const teaInstances = teas.map(
  (tea) =>
    new TeaExtended(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
    ),
);

console.log(teaInstances.length);
console.log(teaInstances[0].name);

// Add validation to your constructor. (Exercise 4)

const teaTypes = ["green", "black", "herbal", "oolong", "white"];

class TeaValidated extends TeaExtended {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    }
    if (!teaTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    super(name, type, origin, pricePerGram, organic);
  }
}

try {
  const valid = new TeaValidated("Sencha", "green", "Japan", 0.12, true);
} catch (error) {
  console.log(error.message);
}

try {
  const noName = new TeaValidated("", "green", "Japan", 0.12, true);
} catch (error) {
  console.log(error.message);
}

try {
  const badPrice = new TeaValidated("Sencha", "green", "Japan", -1, true);
} catch (error) {
  console.log(error.message);
}

try {
  const badType = new TeaValidated("Sencha", "purple", "Japan", 0.12, true);
} catch (error) {
  console.log(error.message);
}

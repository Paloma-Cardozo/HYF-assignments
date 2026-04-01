import { teas } from "./teas.js";
import { Tea } from "./Part-5.js";

// Create a PremiumTea class that extends Tea. (Exercise 17)

const teaTypes = ["green", "black", "herbal", "oolong", "white"];

class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);
    this.grade = grade;
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);

    if (this.grade === "A") {
      return basePrice * 1.5;
    } else if (this.grade === "B") {
      return basePrice * 1.25;
    } else if (this.grade === "C") {
      return basePrice * 1.1;
    }
  }

  describe() {
    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${this.priceFor(100).toFixed(2)} DKK/100g`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}

const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");

console.log(gyokuro.describe());
console.log(gyokuro.priceFor(100));
console.log(gyokuro instanceof Tea);
console.log(gyokuro instanceof PremiumTea);

const gradeB = new PremiumTea(
  "Silver Needle",
  "white",
  "China",
  0.5,
  true,
  "B",
);

console.log(gradeB.priceFor(100));

const gradeC = new PremiumTea("Darjeeling", "black", "India", 0.18, false, "C");

console.log(gradeC.priceFor(100));

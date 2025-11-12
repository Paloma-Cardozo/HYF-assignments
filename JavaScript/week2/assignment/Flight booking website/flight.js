const firstName = prompt("What is your first name? ✈️").trim();
const surName = prompt("What is your surname? ✈️").trim();
const useFormalName = confirm("Would you like to be addressed formally? ✈️");
const gender = prompt("What is your gender? (male/female) ✈️")
  .toLowerCase()
  .trim();

function getFullName(firstName, surName, useFormalName, gender) {
  if (!firstName || !surName) {
    return "Error: Please provide both your first name and surname.";
  }

  let fullName = `${firstName} ${surName}`;

  if (useFormalName) {
    if (gender === "male") {
      fullName = `Lord ${firstName} ${surName}`;
    } else if (gender === "female") {
      fullName = `Lady ${firstName} ${surName}`;
    } else {
      fullName = `Lord / Lady ${firstName} ${surName}`;
    }
  }

  return fullName;
}

const fullName1 = getFullName("Paloma", "Cardozo", true, "female");
const fullName2 = getFullName("Carlos", "Segrera", false, "male");
const fullName = getFullName(firstName, surName, useFormalName, gender);

console.log(fullName1);
console.log(fullName2);

document.getElementById("flight").innerHTML = `
  <p class="result">${fullName}</p>
`;

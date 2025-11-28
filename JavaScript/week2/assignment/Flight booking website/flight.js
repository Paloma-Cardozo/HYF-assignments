const firstName = prompt("What is your first name? ✈️").trim();
const surName = prompt("What is your surname? ✈️").trim();
const useFormalName = confirm("Would you like to be addressed formally? ✈️");
const gender = prompt("What is your gender? (male/female) ✈️")
  .toLowerCase()
  .trim();

function getFullName(firstName, surName, useFormalName, gender) {
  if (!firstName || !surName) {
    throw new Error("Please provide both your first name and surname.");
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

let fullNameResult;
try {
  fullNameResult = getFullName(firstName, surName, useFormalName, gender);
} catch (error) {
  fullNameResult = error.message;
}

document.getElementById("flight").innerHTML = `
  <p class="result">${fullNameResult}</p>
`;

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const houseData = {
  Gryffindor: {
    color: "linear-gradient(90deg, #AE0001 0%, #EEBA30 100%)",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGdidXI4Z2EwdjU1a2FreG15amh1MXdyZmd0cWczMG11Zzd5c21pcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/wM0Qv88ZDzGqnp9QL1/giphy.gif",
  },
  Hufflepuff: {
    color: "linear-gradient(90deg, #ECB939 0%, #6a5645ff 100%)",
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzc2b29odzlkZWNoeDAwYjk0cjh6M3k3dmN3NTcxZ3BoMDNwNDZxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/7CKM0WH271y5wGyuZn/giphy.gif",
  },
  Ravenclaw: {
    color: "linear-gradient(90deg, #ac7726ff 0%, #0f1d4cff 100%)",
    gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWh2YXU5cGZhYmt1OXk3emdicGl6Yms1emp4eWl3eWNsOWo0YzdydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PQWkeKVrmdOWopLhhY/giphy.gif",
  },
  Slytherin: {
    color: "linear-gradient(90deg, #1A472A 0%, #AAAAAA 100%)",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2p5MDFnejRpM3d0bzhuNnYzNzU4Nm04eHVvbjJkcXQ3cDBlcjg2NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MYJV0wCG72bQOSyR8B/giphy.gif",
  },
};

const button = document.getElementById("generator-button");
const paragraph = document.getElementById("result");
const gifContainer = document.getElementById("house-gif-container");
const character = document.getElementById("character-container");

document.body.style.fontFamily = "Arial";
document.body.style.textAlign = "center";
button.style.padding = "12px";
button.style.fontSize = "20px";
button.style.borderRadius = "8px";
button.style.cursor = "pointer";

function chooseHouse() {
  const nameInput = document.getElementById("name-input").value.trim();

  if (!nameInput) {
    paragraph.textContent = "Please enter your name to be sorted!";
    return;
  }

  const gif = document.createElement("img");
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];

  paragraph.textContent = `${nameInput} belongs in ${randomHouse}.`;
  paragraph.style.fontSize = "20px";

  button.style.background = houseData[randomHouse].color;
  button.style.color = "white";

  gif.src = houseData[randomHouse].gif;
  gif.width = 150;
  gif.style.margin = "20px";

  gifContainer.innerHTML = "";
  gifContainer.appendChild(gif);
}

function getMagicCharacter() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      const text = document.createElement("p");
      const randomCharacter = data[Math.floor(Math.random() * data.length)];

      text.textContent = `${randomCharacter.name} is a ${randomCharacter.species} and its gender is ${randomCharacter.gender}.`;
      text.style.fontSize = "20px";

      character.style.borderRadius = "15px";
      character.style.border = "2px solid #000";

      character.innerHTML = "";
      character.appendChild(text);
    })
    .catch(() => {
      character.textContent = "Magic is not working right now";
    });
}

button.addEventListener("click", chooseHouse);
getMagicCharacter();

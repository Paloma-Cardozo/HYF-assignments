// Exercise 1: Favourite dishes

const dishes = [
  "Lasagna",
  "Burger",
  "Sushi",
  "Pizza",
  "Tacos",
  "Paella",
  "Salad",
];

const list = document.getElementById("list");
const firstButton = document.getElementById("buttonDishes");

let firstIndex = 0;

function createItem() {
  if (firstIndex < dishes.length) {
    const item = document.createElement("li");
    item.textContent = dishes[firstIndex];

    list.appendChild(item);
    firstIndex++;
  }
}

firstButton.addEventListener("click", createItem);

/* ⭐ If I wanted to create a loop to display all the dishes at once, I would code it (lines 14-27):

dishes.forEach((dish) => {
  const item = document.createElement("li");
  item.textContent = dish;
  list.appendChild(item);
});
*/

// Exercise 2: Podcast

const podcasts = [
  {
    name: "The mystery om of Johan Klausen Varbourg",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Tips about dogs with small legs",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "You, me, we and us",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Breakfast news - Dinner edition",
  },
];

const podcastList = document.createElement("ul");
const div = document.getElementById("podcastsSection");
const secondButton = document.getElementById("buttonPodcasts");

let secondIndex = 0;

function podcast() {
  if (secondIndex < podcasts.length) {
    const item = document.createElement("li");
    const title = document.createElement("h1");
    title.innerHTML = podcasts[secondIndex].name;

    podcastList.appendChild(item);
    item.appendChild(title);

    if (podcasts[secondIndex].imageUrl) {
      const image = document.createElement("img");
      image.src = podcasts[secondIndex].imageUrl;
      image.style.margin = "10px";
      image.style.borderRadius = "15px";
      image.style.boxShadow = "4px 4px 8px rgba(4, 4, 4, 0.4)";
      image.style.width = "200px";
      image.style.height = "150px";

      item.appendChild(image);
    }

    secondIndex++;
  }
}

div.appendChild(podcastList);
secondButton.addEventListener("click", podcast);

/* ⭐ If I wanted to create a loop to display all the podcasts at once, I would code it (lines 61-83):

podcasts.forEach((podcast) => {
  const item = document.createElement("li");
  const title = document.createElement("h1");
  title.innerHTML = podcast.name;
  item.appendChild(title);

  if (podcast.imageUrl) {
    const image = document.createElement("img");
    image.src = podcast.imageUrl;
    item.appendChild(image);
  }

  podcastList.appendChild(item);
});
*/

// Exercise 3: Image inserter

function insertImage(imageUrl, elementToAppendImageTo) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.style.margin = "10px";
  image.style.borderRadius = "15px";
  image.style.boxShadow = "4px 4px 8px rgba(4, 4, 4, 0.4)";
  image.style.width = "400px";
  image.style.height = "350px";

  elementToAppendImageTo.appendChild(image);
}

insertImage(
  "https://picsum.photos/536/354",
  document.getElementById("elementToAppendImageTo")
);

// Exercise 4: Simple event listener

const thirdButton = document.getElementById("interactiveButton");

function interactiveButton() {
  thirdButton.textContent = "Button clicked!";
}

thirdButton.addEventListener("click", interactiveButton);

// Exercise 5: Light mode dark mode

const fourthButton = document.getElementById("styleButton");

let darkMode = false;

function changeStyle() {
  if (!darkMode) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    fourthButton.textContent = "Light mode";
    fourthButton.style.fontFamily = "Arial Black";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    fourthButton.textContent = "Dark mode";
    fourthButton.style.fontFamily = "Arial";
  }

  darkMode = !darkMode;
}

fourthButton.style.marginTop = "15px";
fourthButton.addEventListener("click", changeStyle);

// Exercise 6: Astronauts in space

fetch("http://api.open-notify.org/astros.json")
  .then((response) => response.json())
  .then((astronauts) => {
    const astronautsInSpace = document.getElementById("astronauts");
    const paragraph = document.createElement("p");
    const namesList = document.createElement("ul");

    paragraph.textContent = `There are ${astronauts.number} astronauts in space. They are:`;

    astronauts.people.forEach((astronaut) => {
      const listItem = document.createElement("li");
      listItem.textContent = astronaut.name;

      namesList.appendChild(listItem);
    });

    astronautsInSpace.appendChild(paragraph);
    astronautsInSpace.appendChild(namesList);
  });

// Exercise 7: Dog fan website

function getImages() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((dataImages) => {
      const divImages = document.getElementById("dogImage");
      const dogsImages = document.createElement("img");

      dogsImages.src = dataImages.message;
      dogsImages.style.margin = "10px";
      dogsImages.style.borderRadius = "15px";
      dogsImages.style.boxShadow = "4px 4px 8px rgba(4, 4, 4, 0.4)";
      dogsImages.style.width = "400px";
      dogsImages.style.height = "350px";

      divImages.innerHTML = "";
      divImages.appendChild(dogsImages);
    });
}

const timerImages = setInterval(getImages, 2000);

function getBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((dataBreeds) => {
      const breeds = Object.keys(dataBreeds.message);
      const breedName = breeds[Math.floor(Math.random() * breeds.length)];

      fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
        .then((response) => response.json())
        .then((dataNewImage) => {
          const divBreeds = document.getElementById("dogBreed");
          const dogsBreeds = document.createElement("img");
          const textImage = document.createElement("p");

          dogsBreeds.src = dataNewImage.message;
          dogsBreeds.style.margin = "10px";
          dogsBreeds.style.borderRadius = "15px";
          dogsBreeds.style.boxShadow = "4px 4px 8px rgba(4, 4, 4, 0.4)";
          dogsBreeds.style.width = "400px";
          dogsBreeds.style.height = "350px";

          textImage.textContent = `The name of this dog breed is ${breedName}`;

          divBreeds.innerHTML = "";
          divBreeds.appendChild(dogsBreeds);
          divBreeds.appendChild(textImage);
        });
    });
}

getBreeds();

const menuDatabase = [
    { 
      name: "Pakora",
      price: 50,
      type: "meat",
      image: "https://static01.nyt.com/images/2024/07/25/multimedia/ND-Pakorarex-clfq/ND-Pakorarex-clfq-threeByTwoMediumAt2X.jpg?quality=75&auto=webp",
    },
    {
      name: "Tandoori Chicken",
      price: 60,
      type: "meat",
      image: "https://sinfullyspicy.com/wp-content/uploads/2014/07/3-3.jpg",
    },
    {
      name: "Butter Chicken",
      price: 80,
      type: "meat",
      image: "https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken.jpg",
    },
    {
      name: "Papadum",
      price: 20,
      type: "vegetarian",
      image: "https://i0.wp.com/live.staticflickr.com/65535/52189660130_b1726820b1_o_d.jpg?w=740&ssl=1",
    },{
      name: "Samosa",
      price: 50,
      type: "vegetarian",
      image: "https://www.teaforturmeric.com/wp-content/uploads/2025/02/Keema-Samosa-10.jpg",   
    },
    {
      name: "Paneer Tikka",
      price: 70,
      type: "vegetarian",
      image: "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka.jpg",
    },
    {
      name: "Chana Masala",
      price: 40,
      type: "vegetarian",
      image: "https://shahzadidevje.com/wp-content/uploads/2024/09/Chole-Chana-Masala-5-1200x1200.jpg",
    },
    {
      name: "Raita",
      price: 30,
      type: "vegetarian",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/coriander-mint-raita-38256cd.jpg?quality=90&webp=true&resize=440,400",
    },
    {
      name: "Chana Salad",
      price: 45,
      type: "vegetarian",
      image: "https://shwetainthekitchen.com/wp-content/uploads/2023/04/Chana-Salad.jpg",
    },
    {
      name: "Lemon Cookies", 
      price: 30, 
      type: "dessert", 
      image: "https://www.cookingclassy.com/wp-content/uploads/2024/12/lemon-cookies-2-1460x2191.jpg",
    },
    {
      name: "Rice Flour Yogurt Cake", 
      price: 35, 
      type: "dessert", 
      image: "https://www.kitchenfrau.com/wp-content/uploads/2022/03/Yogurt-Cake-with-Sugared-Fruit.jpg",
    },
    {
    name: "Almond Crust Lemon Tart",
    price: 45, 
    type: "dessert", 
    image: "https://italianfoodforever.com/wp-content/uploads/2008/07/lemontart2-copy.jpg",
    },
    {
      name: "Gulab Jamun",
      price: 30,
      type: "dessert",
      image: "https://falasteenifoodie.com/wp-content/uploads/2024/11/DSC02391.jpg",
    }, 
    {  
      name: "Flourless Chocolate Almond Cake", 
      price: 45, 
      type: "dessert", 
      image: "https://www.closetcooking.com/wp-content/uploads/2020/02/Flourless-Chocolate-Almond-Cake-1200-2789.jpg",
    },
    {
      name: "Carrot Walnut Muffins", 
      price: 40, 
      type: "dessert", 
      image: "https://foodhub.scene7.com/is/image/woolworthsltdprod/fi-0424-carrot-and-walnut-muffins:Desktop-1300x658",
    },
    {
      name: "Vegan Fudge Brownie", 
      price: 50, 
      type: "dessert", 
      image: "https://heatherchristo.com/wp-content/uploads/2017/12/Peppermint-Mocha-White-Chocolate-Chip-Fudge-Brownies-Vegan-and-Gluten-Free-from-Heatherchristo.com_.jpg",
    },
  ];

const ul = document.getElementById("menu-list");

function renderMenu(menuArray) {
    ul.innerHTML =  "";

    menuArray.forEach (({name, price, type, image}) => {        
        const li = document.createElement("li");
        li.classList.add(type);
        
        const img = document.createElement("img");
        img.src = image;
        img.alt = `${name} dish – ${type}`;

        const pName = document.createElement("p");
        pName.textContent = `Name: ${name}`;
        
        const pPrice = document.createElement("p");
        pPrice.textContent = `Price: ${price} kr`;
        
        const pType = document.createElement("p");
        pType.textContent = `Type: ${type}`;

        li.append(img, pName, pPrice, pType);
        ul.appendChild(li);
});
}

renderMenu(menuDatabase);

["Meat", "Vegetarian", "Dessert", "All"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    if (id === "All") {
      renderMenu(menuDatabase);
    } else {
      const filtered = menuDatabase.filter(item => item.type === id.toLowerCase());
      renderMenu(filtered);
    }
  });
});


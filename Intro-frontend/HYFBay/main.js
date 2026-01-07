console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

const main = document.querySelector("main");
const ul = document.createElement("ul");
main.appendChild(ul);

function renderProducts(products) {
  ul.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name}: $${product.price.toFixed(2)} (${
      product.rating
    }/10)`;

    ul.appendChild(li);
  });
}

renderProducts(products);

function searchProducts() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search products";

  input.style.padding = "14px 18px";
  input.style.fontSize = "16px";
  input.style.borderRadius = "10px";
  input.style.border = "1px solid #717070ff";
  input.style.margin = "30px";
  input.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.44)";

  main.prepend(input);

  input.addEventListener("input", function () {
    const searchTerm = input.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
  });

  return input;
}

searchProducts();

function sortProducts() {
  const sortContainer = document.createElement("div");
  sortContainer.style.margin = "20px";

  const priceCheckbox = document.createElement("input");
  priceCheckbox.type = "checkbox";
  priceCheckbox.id = "sortPrice";
  priceCheckbox.checked = true;

  const priceLabel = document.createElement("label");
  priceLabel.htmlFor = "sortPrice";
  priceLabel.textContent = "Sort by Price";
  priceLabel.style.margin = "20px";

  const ratingCheckbox = document.createElement("input");
  ratingCheckbox.type = "checkbox";
  ratingCheckbox.id = "sortRating";

  const ratingLabel = document.createElement("label");
  ratingLabel.htmlFor = "sortRating";
  ratingLabel.textContent = "Sort by Rating";
  ratingLabel.style.margin = "20px";

  sortContainer.appendChild(priceCheckbox);
  sortContainer.appendChild(priceLabel);
  sortContainer.appendChild(ratingCheckbox);
  sortContainer.appendChild(ratingLabel);

  main.prepend(sortContainer);

  let ascending = true;

  const handleSort = () => {
    let sortedProducts = products.slice();

    if (priceCheckbox.checked) {
      sortedProducts.sort((a, b) =>
        ascending ? a.price - b.price : b.price - a.price
      );
    } else if (ratingCheckbox.checked) {
      sortedProducts.sort((a, b) =>
        ascending ? a.rating - b.rating : b.rating - a.rating
      );
    }

    renderProducts(sortedProducts);
    ascending = !ascending;
  };

  priceCheckbox.addEventListener("change", () => {
    if (priceCheckbox.checked) {
      ratingCheckbox.checked = false;
    }

    handleSort();
  });

  ratingCheckbox.addEventListener("change", () => {
    if (ratingCheckbox.checked) {
      priceCheckbox.checked = false;
    }
    handleSort();
  });
}

sortProducts();

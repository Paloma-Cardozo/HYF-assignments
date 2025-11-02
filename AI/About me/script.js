(function () {
  "use strict";

  const button = document.getElementById("colorBtn");
  if (button) {
    const palette = [
      "#f7f4ff", // lavender mist
      "#ede7f6", // light lilac
      "#e3def9", // soft violet
      "#f2e9ff", // pastel purple
      "#f9f6ff", // very light
      "#e9ebff", // bluish white
      "#f0eafc", // warm lavender
    ];
    document.body.style.transition = "background-color 400ms ease";
    button.addEventListener("click", () => {
      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      document.body.style.backgroundColor = randomColor;
    });
  }
})();

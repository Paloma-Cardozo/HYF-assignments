const button = document.getElementById("colorBtn");
if (button) {
  document.body.style.transition = "background-color 400ms ease";
  button.addEventListener("click", () => {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.floor(Math.random() * 20);
    const l = 70 + Math.floor(Math.random() * 10);
    document.body.style.backgroundColor = `hsl(${h} ${s}% ${l}%)`;
  });
}

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// The /orders endpoint requires authentication. First sign up, then log in

async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.token;
}

async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.token;
}

async function main() {
  await signup("palomac@xxx.com", "123456");
  const token = await login("palomac@xxx.com", "123456");
  console.log("Got token:", token);
}

main().catch(console.error);

// Use the token from Exercise 16 to fetch orders

async function getOrders() {
  const token = await login("palomac@xxx.com", "123456");

  const response = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const orders = await response.json();
  return orders;
}

getOrders()
  .then((orders) => console.log("Orders:", orders))
  .catch((err) => console.error(err.message));

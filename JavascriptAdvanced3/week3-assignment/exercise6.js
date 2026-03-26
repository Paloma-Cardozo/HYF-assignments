const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create functions to work with the authenticated orders endpoint.

async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}

async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "palomac@xxx.com",
      password: "123456",
    }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
}

async function createOrder(items) {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) throw new Error(`Create order failed: ${response.status}`);
  return response.json();
}

async function getMyOrders() {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error(`Get orders failed: ${response.status}`);

  const orders = await response.json();
  return orders;
}

signup("palomac@xxx.com", "123456")
  .catch(() => {})
  .then(() => createOrder([{ teaId: 1, grams: 100 }]))
  .then((order) => console.log("Created order:", order.id))
  .then(() => getMyOrders())
  .then((orders) => console.log("All orders:", orders.length));

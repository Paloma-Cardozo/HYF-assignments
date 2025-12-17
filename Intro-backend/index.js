const express = require("express");
const knexLibrary = require("knex");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dbFile = path.join(__dirname, "public", "tasks.sqlite3");
const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
});

const secondDbFile = path.join(__dirname, "public", "database.sqlite3");
const knex2 = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: secondDbFile,
  },
});

// 📌 Home route: Assignment! 📌

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

// ⭐ GET requests ⭐

app.get("/add", (request, response) => {
  response.send("New path");
});

app.get("/currentYear", (request, response) => {
  const date = new Date().getFullYear();
  response.send(date);
});

app.get("/users", async (request, response) => {
  const results = await knex.raw("SELECT * FROM user ORDER BY name ASC");
  response.send(results);
});

app.get("/task", async (request, response) => {
  const tasks = await knex.raw("SELECT * FROM task ORDER BY title ASC");
  response.send(tasks);
});

app.get("/all-users", async (request, response) => {
  const allUsers = await knex2.raw("SELECT * FROM users ORDER BY id ASC");
  response.send(allUsers);
});

app.get("/unconfirmed-users", async (request, response) => {
  const unconfirmedUsers = await knex2.raw(
    "SELECT * FROM users WHERE confirmed_at IS NULL"
  );
  response.send(unconfirmedUsers);
});

app.get("/gmail-users", async (request, response) => {
  const gmailUsers = await knex2.raw(
    "SELECT * FROM users WHERE email LIKE '%gmail%'"
  );
  response.send(gmailUsers);
});

app.get("/2022-users", async (request, response) => {
  const created2022Users = await knex2.raw(
    "SELECT * FROM users WHERE created_at LIKE '2022%'"
  );
  response.send(created2022Users);
});

app.get("/users-count", async (request, response) => {
  try {
    const usersCount = await knex2.raw("SELECT COUNT(*) AS [count] FROM users");
    response.send(usersCount[0]);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/last-name-count", async (request, response) => {
  const lastNameCount = await knex2.raw(
    "SELECT *, COUNT(*) FROM users GROUP BY last_name ORDER BY last_name ASC"
  );
  response.send(lastNameCount);
});

app.get("/first-user", async (request, response) => {
  const firstUser = await knex2.raw(
    "SELECT * FROM users ORDER BY id ASC LIMIT 1"
  );

  if (firstUser.length === 0) {
    response.status(404).send({ error: "No users found" });
    return;
  }

  response.send(firstUser);
});

// 📌 New routes: Assignment! 📌

app.get("/task-status", async (request, response) => {
  const tasksStatus = await knex.raw(
    "SELECT s.name, COUNT(t.id), GROUP_CONCAT(t.title) FROM task AS t JOIN status AS s ON s.id = t.status_id GROUP BY s.name ORDER BY t.id ASC"
  );
  response.send(tasksStatus);
});

app.get("/task-not-completed", async (request, response) => {
  const tasksNotCompleted = await knex.raw(
    "SELECT title FROM task WHERE status_id != 3"
  );
  response.send(tasksNotCompleted);
});

app.get("/user-with-tasks", async (request, response) => {
  const UserWithTasks = await knex.raw(
    "SELECT u.name, COUNT(t.id), GROUP_CONCAT(t.title) FROM task AS t JOIN user AS u ON u.id = t.user_id GROUP BY u.name ORDER BY t.id ASC"
  );
  response.send(UserWithTasks);
});

// ⭐ POST requests ⭐

app.post("/status", async (request, response) => {
  const { id, name } = request.body;

  if (!id || !name || name.length === 0) {
    response.status(400).send({ error: "Invalid input data" });
    return;
  }

  await knex.raw(`INSERT INTO status(id, name) values(?, ?)`, [id, name]);

  response.status(201).send({
    message: "Status created successfully",
    data: { id, name },
  });
});

app.post("/new-user", async (request, response) => {
  const { id, first_name, last_name, email } = request.body;

  if (
    !id ||
    !first_name ||
    !last_name ||
    !email ||
    first_name.length === 0 ||
    last_name.length === 0 ||
    email.length === 0
  ) {
    response.status(400).send({ error: "Invalid input data" });
    return;
  }

  const created_at = new Date().toISOString();

  await knex2.raw(
    `INSERT INTO users(id, created_at, first_name, last_name, email) values(?, ?, ?, ?, ?)`,
    [id, created_at, first_name, last_name, email]
  );

  response.status(201).send({
    message: "User created successfully",
    data: { id, created_at, first_name, last_name, email },
  });
});

app.listen(3000, function () {
  console.log(`Ready on http://localhost:3000`);
});

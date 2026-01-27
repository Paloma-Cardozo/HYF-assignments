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
  try {
    const results = await knex.raw("SELECT * FROM user ORDER BY name ASC");

    if (!results || results.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(results);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/task", async (request, response) => {
  try {
    const tasks = await knex.raw("SELECT * FROM task ORDER BY title ASC");

    if (!tasks || tasks.length === 0) {
      return response.status(404).send({ error: "No tasks found" });
    }

    response.send(tasks);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/all-users", async (request, response) => {
  try {
    const allUsers = await knex2.raw("SELECT * FROM users ORDER BY id ASC");

    if (!allUsers || allUsers.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(allUsers);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/unconfirmed-users", async (request, response) => {
  try {
    const unconfirmedUsers = await knex2.raw(
      "SELECT * FROM users WHERE confirmed_at IS NULL",
    );

    if (!unconfirmedUsers || unconfirmedUsers.length === 0) {
      return response.status(404).send({ error: "No unconfirmed users found" });
    }

    response.send(unconfirmedUsers);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/gmail-users", async (request, response) => {
  try {
    const gmailUsers = await knex2.raw("SELECT * FROM users WHERE email LIKE '%gmail%'");

    if (!gmailUsers || gmailUsers.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(gmailUsers);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});


app.get("/2022-users", async (request, response) => {
  try {
    const created2022Users = await knex2.raw("SELECT * FROM users WHERE created_at LIKE '2022%'");

    if (!created2022Users || created2022Users.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(created2022Users);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/users-count", async (request, response) => {
  try {
    const usersCount = await knex2.raw("SELECT COUNT(*) AS count FROM users");

    if (!usersCount || usersCount.length === 0) {
      return response.status(404).send({ error: "No data found" });
    }

    response.send(usersCount[0]);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/last-name-count", async (request, response) => {
  try {
    const lastNameCount = await knex2.raw("SELECT *, COUNT(*) FROM users GROUP BY last_name ORDER BY last_name ASC");

    if (!lastNameCount || lastNameCount.length === 0) {
      return response.status(404).send({ error: "No data found" });
    }

    response.send(lastNameCount);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/first-user", async (request, response) => {
  try {
    const firstUser = await knex2.raw(
      "SELECT * FROM users ORDER BY id ASC LIMIT 1",
    );

    if (!firstUser || firstUser.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(firstUser);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

// 📌 New routes: Assignment! 📌

app.get("/task-status", async (request, response) => {
  try {
    const tasksStatus = await knex.raw(
    "SELECT s.name, COUNT(t.id), GROUP_CONCAT(t.title) FROM task AS t JOIN status AS s ON s.id = t.status_id GROUP BY s.name ORDER BY t.id ASC",
    );

    if (!tasksStatus || tasksStatus.length === 0) {
      return response.status(404).send({ error: "No data found" });
    }

    response.send(tasksStatus);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/task-not-completed", async (request, response) => {
  try {
    const tasksNotCompleted = await knex.raw(
    "SELECT title FROM task WHERE status_id != 3",
    );

    if (!tasksNotCompleted || tasksNotCompleted.length === 0) {
      return response.status(404).send({ error: "No tasks found" });
    }

    response.send(tasksNotCompleted);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
});

app.get("/user-with-tasks", async (request, response) => {
  try {
    const UserWithTasks = await knex.raw(
    "SELECT u.name, COUNT(t.id), GROUP_CONCAT(t.title) FROM task AS t JOIN user AS u ON u.id = t.user_id GROUP BY u.name ORDER BY t.id ASC",
    );

    if (!UserWithTasks || UserWithTasks.length === 0) {
      return response.status(404).send({ error: "No users found" });
    }

    response.send(UserWithTasks);
  } catch (error) {
    response.status(500).send({ error: "Database error" });
  }
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
    [id, created_at, first_name, last_name, email],
  );

  response.status(201).send({
    message: "User created successfully",
    data: { id, created_at, first_name, last_name, email },
  });
});

app.listen(3000, function () {
  console.log(`Ready on http://localhost:3000`);
});

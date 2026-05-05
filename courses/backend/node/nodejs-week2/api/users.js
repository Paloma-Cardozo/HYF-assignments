import express from "express";
import knexInstance from "../database.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await knexInstance("users")
      .select("users.*", "users.first_name")
      .join("users", "snippets.user_id", "users.id");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const users = await knexInstance("users")
      .select("users.*", "users.first_name")
      .join("users", "snippets.user_id", "users.id");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

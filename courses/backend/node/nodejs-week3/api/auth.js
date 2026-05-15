import express from "express";
import bcrypt from "bcrypt";
import knexInstance from "../database.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await knexInstance("users").where("email", email).first();

    if (!user) {
      return response.status(401).json({
        error: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your-secret-key",
      { expiresIn: "24h" },
    );

    response.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

export default router;

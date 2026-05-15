import bcrypt from "bcrypt";
import knexInstance from "./database.js";

async function seedUser() {
  try {
    const plainPassword = "password123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await knexInstance("users").insert({
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: hashedPassword,
    });

    console.log("User created successfully");
    console.log("Email: test@example.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

seedUser();
